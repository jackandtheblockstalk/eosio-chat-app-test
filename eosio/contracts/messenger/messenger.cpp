#include <eosiolib/eosio.hpp>
#include <eosiolib/transaction.hpp>
#include <eosiolib/crypto.h>
#include <string>
#include <vector>

using eosio::indexed_by;
using eosio::const_mem_fun;
using std::string;
using eosio::print;
using std::vector;

class start : public eosio::contract {
public:
   explicit start( action_name self )
         : contract( self ) {
   }

   //@abi action
   void sendsha( account_name from, string to, uint64_t msg_id, const checksum256& msg_sha, uint64_t timestamp ) {
      // if not authorized then this action is aborted and transaction is rolled back
      // any modifications by other actions in same transaction are undone
      require_auth( from ); // make sure authorized by account

      // message_index is typedef of our multi_index over table address
      // message table is auto "created" if needed
      message_index messages( _self, _self ); // code, scope

      // verify does not already exist
      // multi_index find on primary index which in our case is account
      auto itr = messages.find( msg_id );
      if( itr != messages.end() ) {
         std::string err = "Message id already exists: " + std::to_string(msg_id);
         eosio_assert( false, err.c_str() );
      }

      // add to table, first argument is account to bill for storage
      // each entry will be billed to the associated account
      // we could have instead chosen to bill _self for all the storage
      messages.emplace( from /*payer*/, [&]( auto& msg ) {
         msg.msg_id = msg_id;
         msg.from = from;
         msg.to = to;
         msg.msg_sha = msg_sha;
         msg.timestamp = timestamp;
      } );

   }

   //@abi action
   void printmsg( account_name other ) {
      message_index messages( other, other ); // code, scope

      for (auto& msg : messages) {
         print("from: ", eosio::name{msg.from}, ", to: ", msg.to, "\n");
      }
   }

   //@abi action
   void getChatroom(account_name other, string room) {

        message_index timestampOrdered( other, other ); // code, scope

        auto ordered = timestampOrdered.get_index<N(byTimestamp)>();

        for (auto& item : ordered) {

            if (item.to == room) {

               print(item.by_sha().to_string());

            }

      }

   }

private:

   //@abi table message i64
   struct message {

      uint64_t msg_id;      // unique identifier for message
      account_name from;    // account message sent from
      string to;      // account message sent to
      checksum256 msg_sha;  // sha256 of message string
      uint64_t timestamp; //timestamp of message

      uint64_t primary_key() const { return msg_id; }

      uint64_t by_timestamp() const { return timestamp; } // getter for timestamp

      string by_room() const { return to; } // getter for room

      eosio::key256 by_sha() const { return to_key( msg_sha ); }

      static eosio::key256 to_key( const checksum256& msg_sha ) {

         const uint64_t* ui64 = reinterpret_cast<const uint64_t*>(&msg_sha);
         return eosio::key256::make_from_word_sequence<uint64_t>( ui64[0], ui64[1], ui64[2], ui64[3] );

      }

      EOSLIB_SERIALIZE( message, ( msg_id )( from )( to )( msg_sha )( timestamp ) )

   };

   typedef eosio::multi_index<N( message ), message,
         indexed_by<N( byTimestamp ), const_mem_fun<message, uint64_t, &message::by_timestamp> >
   > message_index;

};

EOSIO_ABI( start, ( sendsha )( printmsg )( getChatroom ))
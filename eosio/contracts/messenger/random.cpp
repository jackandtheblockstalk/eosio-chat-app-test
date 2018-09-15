#include <eosiolib/eosio.hpp>
#include <eosiolib/dispatcher.hpp>
#include <eosiolib/multi_index.hpp>

using namespace eosio;

namespace limit_order_table {

    struct limit_order {
        uint64_t     id;
        uint128_t    price;
        uint64_t     expiration;
        account_name owner;

        auto primary_key() const { return id; }
        uint64_t get_expiration() const { return expiration; }
        uint128_t get_price() const { return price; }

        EOSLIB_SERIALIZE( limit_order, ( id )( price )( expiration )( owner ) )
    };

    class limit_order_table {
        public:

        ACTION( N( limitorders ), issue_limit_order ) {
            EOSLIB_SERIALIZE( issue_limit_order )
        };

        static void on( const issue_limit_order& ilm ) {
            auto payer = ilm.get_account();

            print("Creating multi index table 'orders'.\n");
            eosio::multi_index< N( orders ), limit_order, 
                indexed_by< N( byexp ),   const_mem_fun< limit_order, uint64_t, &limit_order::get_expiration> >,
                indexed_by< N( byprice ), const_mem_fun< limit_order, uint128_t, &limit_order::get_price> >
                > orders( N( limitorders ), N( limitorders ) );

            orders.emplace( payer, [&]( auto& o ) {
                o.id = 1;
                o.expiration = 300;
                o.owner = N(dan);
            });

            auto order2 = orders.emplace( payer, [&]( auto& o ) {
                o.id = 2;
                o.expiration = 200;
                o.owner = N(thomas);
            });

            print("Items sorted by primary key:\n");
            for( const auto& item : orders ) {
                print(" ID=", item.id, ", expiration=", item.expiration, ", owner=", name{item.owner}, "\n");
            }

            auto expidx = orders.get_index<N(byexp)>();

            print("Items sorted by expiration:\n");
            for( const auto& item : expidx ) {
                print(" ID=", item.id, ", expiration=", item.expiration, ", owner=", name{item.owner}, "\n");
            }

            auto pridx = orders.get_index<N(byprice)>();

            print("Items sorted by price:\n");
            for( const auto& item : pridx ) {
                print(" ID=", item.id, ", expiration=", item.expiration, ", owner=", name{item.owner}, "\n");
            }

            print("Modifying expiration of order with ID=2 to 400.\n");
            orders.modify( order2, payer, [&]( auto& o ) {
                o.expiration = 400;
            });

            auto lower = expidx.lower_bound(100);

            print("First order with an expiration of at least 100 has ID=", lower->id, " and expiration=", lower->get_expiration(), "\n");
   };

} /// limit_order_table

namespace limit_order_table {
   extern "C" {
      /// The apply method implements the dispatch of events to this contract
      void apply( uint64_t code, uint64_t action ) {
         require_auth( code );
         eosio_assert( eosio::dispatch< limit_order_table, limit_order_table::issue_limit_order >( code, action ), "Could not dispatch" );
      }
   }
}
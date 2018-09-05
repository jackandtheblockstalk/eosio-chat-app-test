import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCJuwfHS5ANsm3A1f3J-mtFf_Q7inp_l2o",
  authDomain: "eos-chat-app-test",
  databaseURL: "https://eos-chat-app-test.firebaseio.com/"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;

import Rebase from 're-base';
// create a connection to firebase databse 
const base = Rebase.createClass({
  apiKey: "AIzaSyDHEHVmhSakPL4qx_gyoAmHQfZvZACbfBs",
  authDomain: "cotd-58045.firebaseapp.com",
  databaseURL: "https://cotd-58045.firebaseio.com"
});

export default base;
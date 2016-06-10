import firebase from 'firebase';
import config from './config/config.json';

firebase.initializeApp(config.firebase);

let isAuth = false;
let user = null;

firebase.auth().onAuthStateChanged(function(data) {
  if (data) {
    isAuth = true;
    user = data;
  } else {
    isAuth = false;
    user = null;
  }
});

export {isAuth, user};

export default firebase;

import firebase from '../node_modules/firebase/firebase.js';
import config from './config/config.json';

firebase.initializeApp(config.firebase);

export default firebase;

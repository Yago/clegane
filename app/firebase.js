import firebase from 'firebase';
import config from './config/config.json';

firebase.initializeApp(config.firebase);

export default firebase;

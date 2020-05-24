import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCTnheIzGKvADDnEnwA6EOB-O4US15VK-o",
  authDomain: "stock-exchange-client.firebaseapp.com",
  databaseURL: "https://stock-exchange-client.firebaseio.com",
  projectId: "stock-exchange-client",
  storageBucket: "stock-exchange-client.appspot.com",
  messagingSenderId: "243133732397",
  appId: "1:243133732397:web:f9867f43abc6e015d1caa4",
  measurementId: "G-EPND9QBCGN"
};
  // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
  
  export default firebase;
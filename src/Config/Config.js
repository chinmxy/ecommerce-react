import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyByr7OGihwKnzJzNfLEcRINWYB64FU0s7Q",
	authDomain: "ecommerce-react-e5721.firebaseapp.com",
	projectId: "ecommerce-react-e5721",
	storageBucket: "ecommerce-react-e5721.appspot.com",
	messagingSenderId: "447657646091",
	appId: "1:447657646091:web:3958566b05a5d42b998f0e",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };

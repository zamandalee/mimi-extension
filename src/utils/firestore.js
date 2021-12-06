import { getFirestore, collection, doc, setDoc } from "firebase/firestore" 
import { initializeApp } from "@firebase/app";
// Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBrdxO2cgm9IHJw8bRIn-8SfK_jIK4KRSY",
	authDomain: "mimi-2b281.firebaseapp.com",
	projectId: "mimi-2b281",
	storageBucket: "mimi-2b281.appspot.com",
	messagingSenderId: "772480921178",
	appId: "1:772480921178:web:ef3f46e1446c6e5424b263",
	measurementId: "G-98705SB5MM",
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore()

async function test(userID) {
	try {
        console.log(userID)
		const docRef = await setDoc(doc(db, "users", userID), {
			first: "Ada",
			last: "Lovelace",
			born: 1815,
		});
		console.log("Document written with ID: ", userID);
	} catch (e) {
		console.error("Error adding document: ", e);
	}
}
export {test}
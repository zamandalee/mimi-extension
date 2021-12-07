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
// const firebaseApp = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
const db = getFirestore()

// Add user when they first use MiMi
async function createUser(userId) {
	try {
		const docRef = await setDoc(
			doc(db, "users", userId), {}
		)
		console.log(`Creating document ${docRef} for user ${userId}`)
	} catch (e) {
		console.error("Error creating document: ", e);
	}
}
// Add domain and counter to user's document
async function addDomain(userId, domain, counter) {
	try {
		const docRef = await setDoc(
			doc(db, "users", userId), {domain: counter}
		)
		console.log(`Added domain ${domain} and counter ${counter} for user ${userId}`)
	} catch (e) {
		console.error("Error adding domain: ", e)
	}
}


export { createUser, addDomain }
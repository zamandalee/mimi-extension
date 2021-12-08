import {getFirestore, collection, doc, setDoc, getDoc, deleteDoc} from "firebase/firestore";
import {initializeApp} from "@firebase/app";

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

initializeApp(firebaseConfig);
const db = getFirestore();

// Add user when they first use MiMi
async function createUser(userId) {
	try {
		await setDoc(doc(db, "users", userId), {}, {merge: true});
		console.log(`Creating a profile for user ${userId}`);
	} catch (e) {
		console.error("Error creating document: ", e);
	}
}

// Delete user
async function deleteUser(userId) {
	try {
		await deleteDoc(doc(db, "users", userId));
		console.log(`Deleting all data for user ${userId}`);
	} catch (e) {
		console.error("Error deleting document: ", e);
	}
}

// Add domain and counter to user's document
async function addOrEditDomain(userId, domain, counter) {
	try {
		const docRef = await setDoc(doc(db, "users", userId), {domain: counter}, {merge: true});
		console.log(`Added domain ${domain} and counter ${counter} for user ${userId}`);
	} catch (e) {
		console.error("Error adding domain: ", e);
	}
}

// Retrieve counters for a user domain
async function fetchCounter(userId, domain) {
    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists() && docSnap.get(domain)) {
        return docSnap.get(domain)
    } else {
        console.log("No such document or domain");
				return undefined
    }
}

export { createUser, deleteUser, addOrEditDomain, fetchCounter};

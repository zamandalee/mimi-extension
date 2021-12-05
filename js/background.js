chrome.runtime.onInstalled.addListener(() => {
	let color = "blue";
	chrome.storage.sync.set({color});
	console.log("Default background color set to %cgreen", `color: ${color}`);
});
// all event listener registrations must be at top level

// Check for the first install (to generate unique client-auth code)
chrome.runtime.onInstalled.addListener(function (details) {
	if (details.reason == "install") {
		console.log("This is a first install!");
	} else if (details.reason == "update") {
		var thisVersion = chrome.runtime.getManifest().version;
		console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
	}
});

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBrdxO2cgm9IHJw8bRIn-8SfK_jIK4KRSY",
	authDomain: "mimi-2b281.firebaseapp.com",
	projectId: "mimi-2b281",
	storageBucket: "mimi-2b281.appspot.com",
	messagingSenderId: "772480921178",
	appId: "1:772480921178:web:ef3f46e1446c6e5424b263",
	measurementId: "G-98705SB5MM",
};
// import * as functions from "./functions"
// functions.generateMimi("as", "bs", 0)

// Initialize Cloud Firestore through Firebase
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import {getFirestore, collection, addDoc} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();

async function test() {
	try {
		const docRef = await addDoc(collection(db, "users"), {
			first: "Ada",
			last: "Lovelace",
			born: 1815,
		});
		console.log("Document written with ID: ", docRef.id);
	} catch (e) {
		console.error("Error adding document: ", e);
	}
}
test();

chrome.commands.onCommand.addListener(function (command) {
	console.log(command)
    if (command === "reload") {
		chrome.runtime.reload();
    } else if (command === "random") {
    }
});
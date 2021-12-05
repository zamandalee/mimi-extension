// Check for the first install (to generate unique client-auth code)
chrome.runtime.onInstalled.addListener(function (details) {
	if (details.reason == "install") {
		console.log("This is a first install!");
	} else if (details.reason == "update") {
		var thisVersion = chrome.runtime.getManifest().version;
		console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
	}
});



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

// Keyboard shortcuts listener
chrome.commands.onCommand.addListener((command) => {
	console.log(`Command detected: ${command}`);

	// Master password hashing
	if (command === "hash_masterpass") {
		chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				files: ['js/hashing-script.js']
			})
		})
	}
	// Hot reload hack
	else if (command === "reload") {
		chrome.runtime.reload();
	}
});
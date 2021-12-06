/*global chrome*/

//To upgrade to MV3, comment out line 143 of webpack.config.js
import * as functions from "./utils/functions";
import * as db1 from "./utils/firestore"
// Check for the first install (to generate unique client-auth code)
chrome.runtime.onInstalled.addListener(function (details) {
	db1.test("masonzhang")
	functions.generateMimi("abc", "a.com", 100)
	if (details.reason === "install") {
		//First install! Generate & store clientAuth token
	} else if (details.reason === "update") {
		var thisVersion = chrome.runtime.getManifest().version;
		console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
	}
});

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
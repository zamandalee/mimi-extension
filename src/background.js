/*global chrome*/

//To upgrade to MV3, comment out line 143 of webpack.config.js
import * as functions from "./utils/functions";
import {getData} from "./utils/storage";
// Check for the first install (to generate unique client-auth code)
chrome.runtime.onInstalled.addListener(function (details) {
	if (details.reason === "install") {
		//First install! Generate & store clientAuth token
		if (getData("client_auth") === undefined) {
			functions.createAndStoreClientAuthToken();
		}
	}
});

// Keyboard shortcuts listener
chrome.commands.onCommand.addListener(command => {
	console.log(`Command detected: ${command}`);

	// Master password hashing
	if (command === "hash_masterpass") {
		chrome.tabs.query({active: true, currentWindow: true}).then(([tab]) => {
			chrome.scripting.executeScript({
				target: {tabId: tab.id},
				files: ["js/hashing-script.js"],
			});
		});
	}
	// Hot reload hack
	else if (command === "reload") {
		chrome.runtime.reload();
	}
});

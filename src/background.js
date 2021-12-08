/*global chrome*/

//To upgrade to MV3, comment out line 143 of webpack.config.js
import * as functions from "./utils/functions";
import {getData} from "./utils/storage";

// Check for the first install (to generate unique client-auth code)
chrome.runtime.onInstalled.addListener(function (details) {
	if (details.reason === "install") {
		//First install! Generate & store clientAuth token
		if (getData("clientAuth") === undefined) {
			functions.createAndStoreIdAndToken();
		}
	}
});

// Keyboard shortcuts listener
chrome.commands.onCommand.addListener(async command => {
	console.log(`Command detected: ${command}`);
	// Master password hashing
	if (command === "hash_masterpass") {
		let queryOptions = {active: true, currentWindow: true};
		chrome.tabs.query(queryOptions, tabs => {
			chrome.tabs.executeScript(tabs[0].id, {
				file: "content-script.js",
			  });
			// Manifest v3
			// chrome.scripting.executeScript({
			// 	target: {tabId: tabs[0].id},
			// 	files: ["content-script.js"],
			// });
			// let [tab] = await chrome.tabs.query(queryOptions);
			// chrome.scripting.executeScript({
			// 	target: {tabId: tab.id},
			// 	files: ["content-script.js"],
			// });
		});
	}
});

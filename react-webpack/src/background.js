/*global chrome*/

//To upgrade to MV3, comment out line 143 of webpack.config.js
import * as functions from "./Utils/functions";

//import * as functions from "./functions"
chrome.runtime.onInstalled.addListener(() => {
	let color = "green";
	chrome.storage.sync.set({color});
	console.log("Default background color set to %cgreen", `color: ${color}`);
});
// all event listener registrations must be at top level

// Check for the first install (to generate unique client-auth code)
chrome.runtime.onInstalled.addListener(function (details) {
	console.log("HELLO")
	functions.test()
	if (details.reason == "install") {
		//First install! Generate & store clientAuth token 
		//functions.writeFirestore("masonzhang")
	} else if (details.reason == "update") {
		var thisVersion = chrome.runtime.getManifest().version;
		console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
	}
});

console.log("helasdaf")

chrome.commands.onCommand.addListener(function (command) {
	console.log(command)
    if (command === "reload") {
		chrome.runtime.reload();
    } else if (command === "random") {
    }
});


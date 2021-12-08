// Content script, programmatically injected with keyboard shortcut

/*global chrome*/
import {getCounter, generateMimi} from "./utils/functions";
import * as storage from "./utils/storage";

function doStuff() {
	// 1. Get user's inputted plaintext password
	let passField = document.querySelector(":focus");
	const masterPass = passField.value;

	// 2. Get website domain name
	const domain = window.location.hostname;

	// 3. Get/create counter from local storage & decrypt with master password
	// Counter = sum(each of 3 shares and masterpass turned into int)
	const counter = getCounter(masterPass, domain);

	// 4. Get client-auth token SKIP
	// 5. Use generateMimi to get encrypted password
	const mimi = generateMimi(masterPass, domain, counter);
	console.log("Inputs: ", masterPass, domain, counter);
	console.log("Output: ", mimi);

	// 6. Input encrypted password to form field
	passField.value = mimi;
}

doStuff();

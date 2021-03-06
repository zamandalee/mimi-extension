/*global chrome*/
// Content script, programmatically injected with keyboard shortcut
/**
 * To-Do:
 * Fix domain
 * Add QR codes
 * Make mimi passwords correct characters
 * Make enter work
 */
import {getCounter, generateMimi} from "./utils/functions";
import * as psl from "psl"


(async function doStuff() {
	// 1. Get user's inputted plaintext password
	let passField = document.querySelector(":focus");
	if (passField === null) {
		return
	}
	const masterPass = passField.value;

	// 2. Get website domain name
	const domain = psl.get(window.location.hostname)
	// 3. Get/create counter from local storage & decrypt with master password
	// Counter = sum(each of 3 shares and masterpass turned into int)
	const counter = await getCounter(domain);
	// 4. Get client-auth token SKIP
	// 5. Use generateMimi to get encrypted password
	const mimi = await generateMimi(masterPass, domain, counter);

	console.log("Inputs: ", masterPass, domain, counter);
	console.log("Output: ", mimi);

	// 6. Input encrypted password to form field
	passField.value = mimi;
	// const ke = new KeyboardEvent("keydown", {
	// 	bubbles: true,
	// 	cancelable: true,
	// 	keyCode: 13,
	// });
	// document.dispatchEvent(ke)
})();

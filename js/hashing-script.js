// Content script, programmatically injected with keyboard shortcut

// import generateMimi from "./functions.js";
// functions = require('./functions.js')

// 1. Get user's inputted plaintext password
let passField = document.querySelector(":focus");
const masterPass = passField.value;
// 2. Get website domain name
const domain = window.location.hostname
// 3. Get/create counter from local storage & decrypt with master password TODO
const counter = 0
// 4. Get client-auth token SKIP
// 5. Use functions.generateMimi to get encrypted password
console.log("Inputs: ", masterPass, domain, counter)
const mimi = Functions.generateMimi(masterPass, domain, counter)
console.log("Output: ", mimi)
// 6. Input encrypted password to form field
passField.value = mimi

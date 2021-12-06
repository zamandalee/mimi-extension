// Content script, programmatically injected with keyboard shortcut

/*global chrome*/
import * as functions from "./utils/functions";
import * as storage from "./utils/storage";


// import generateMimi from "./functions.js";
// functions = require('./functions.js')

// 1. Get user's inputted plaintext password
let passField = document.querySelector(":focus");
const masterPass = passField.value;

// 2. Get website domain name
const domain = window.location.hostname

// 3. Get/create counter from local storage & decrypt with master password TODO
// Counter = sum(each of 3 shares and masterpass turned into int)
const isNewCounter = !(domain in db1 && domain in db2)
const counter = getCounter(masterPass, domain, isNewCounter)

// 4. Get client-auth token SKIP
// 5. Use functions.generateMimi to get encrypted password
const mimi = functions.generateMimi(masterPass, domain, counter)
console.log("Inputs: ", masterPass, domain, counter)
console.log("Output: ", mimi)

// 6. Input encrypted password to form field
passField.value = mimi



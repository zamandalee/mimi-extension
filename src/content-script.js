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
// let counter = passToInt(masterPass)
// if (domain in db1 && domain in db2 && domain in db3) { // TODO
//   counter += db1[domain] + db2[domain] + db3[domain]
// } else {
//   const dbNumber = sum(Functions.secretShareCounter(domain))
//   counter += dbNumber
// }
// 4. Get client-auth token SKIP
// 5. Use functions.generateMimi to get encrypted password
let counter = 0
console.log("Inputs: ", masterPass, domain, counter)
const mimi = functions.generateMimi(masterPass, domain, counter)
console.log("Output: ", mimi)
// 6. Input encrypted password to form field
passField.value = mimi



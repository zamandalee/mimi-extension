import * as functions from "./functions"
/**
 * TO-DO: 
 * 1) get the inputted plaintext password
 * 2) get the website domain name
 * 3) get the counter from local storage & decrypt with master password. if counter doesn't exist, create a new counter and proceed as normal
 * 4) get the client-auth token 
 * 5) use functions.generateMimi to get the encrypted password 
 * 6) input the encrypted password into the form field 
 */
function handlePasswordTransmogrification() {
    functions.generateMimi("a", "a.com", 100)

    
}
function setup() {
    /**
     * 1) Add listener for the replacement shortcut (e.g. CMD-G)
     * 
     */
    handlePasswordTransmogrification()
}

setup(); 
console.log("HELLO")
/*global chrome*/

import * as storage from "./storage";
import { fetchCounter, addOrEditDomain } from "./firestore";
const sodium = require('libsodium-wrappers');

 // TODO: not using anywhere?
// User auth, access to counters
export function createAndStoreIdAndToken() {
    const uidToken = sodium.crypto_generichash(32);
    const authToken = sodium.crypto_generichash(32);
    storage.save("userId", uidToken)
    storage.save("clientAuth", authToken)
}

// Hash the masterpass, domain name, and counter together to product the MiMi password
export const generateMimi = async function (seed, domain, counter) {
    await sodium.ready
    const clientAuthToken = await storage.getData("clientAuth")
    const concatSeed = seed + domain + counter + clientAuthToken
    let mimi = sodium.crypto_generichash(16, concatSeed);
    console.log(mimi, sodium.to_hex(mimi), mimi.length);
    return sodium.to_hex(mimi)
}

// Get counter (1/3 of hashing inputs), called when cmd+shift+8
export const getCounter = function (pw, domain) {
    let counter = passwordToInt(pw)
    const uid = storage.getData("userId")

    const secret1 = fetchCounter(uid, domain)
    // const secret2 = fetchCounter2(uid, domain)
    const isNewCounter = secret1 === undefined

    if (isNewCounter) { // Create counter
        counter += createOrEditCounter(uid, domain) // Currently regenerating, otherwise generate random num and + it to old counter
    } else {  // Get existing counter
        counter += secret1
    }
    return counter
}

// Modify existing counter, called when "Change Password" clicked
export const resetCounter = function (domain) {
    const uid = storage.getData("userId")
    createOrEditCounter(uid, domain)
}

// ------------------ PRIVATE HELPERS: ------------------

// Password from string to int
const passwordToInt = function (pw) {
    return sodium.to_string(pw) // TODO: currently an int array, not just an int
}

// Generate and save server-side portion of counter
const MAX_SUM = 10000
const createOrEditCounter = function (userId, domain) { // TODO
    // Generate secrets
    const secret1 = generateRandomInt(MAX_SUM)
    // Secret sharing: write to 2 db's
    addOrEditDomain(userId, domain, secret1)
    // Return total db portion of counter
    return secret1
}

// Generate secret
const generateRandomInt = function (max) { // TODO
    // sodium.randombytes_random()
    // sodium.rand
    const secret1 = sodium.randombytes_uniform(max)
    const secret2 = sodium.randombytes_uniform(max)

    return 1

    // const secret = Math.floor(Math.random() * max)
    // return secret
}

const sum = function (arr) {
    return arr.reduce((acc, el) => acc + el, 0)
}


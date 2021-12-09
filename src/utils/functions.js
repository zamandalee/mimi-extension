/*global chrome*/

import * as storage from "./storage";
import * as firestore from "./firestore";
const sodium = require('libsodium-wrappers');

 // TODO: not using anywhere?
// User auth, access to counters
export const createAndStoreIdAndToken = async function() {
    await sodium.ready
    const uidToken = sodium.to_hex(sodium.randombytes_buf(32));
    const authToken = sodium.to_hex(sodium.randombytes_buf(32));
    storage.save("userId", uidToken)
    storage.save("clientAuth", authToken)
}

// Hash the masterpass, domain name, and counter together to product the MiMi password
export const generateMimi = async function (seed, domain, counter) {
    await sodium.ready
    const clientAuthToken = await storage.getData("clientAuth")

    const concatSeed = seed + domain + counter + clientAuthToken
    let mimi = sodium.crypto_generichash(16, concatSeed);
    mimi = sodium.to_hex(mimi)
    return mimi
}

// Get counter (1/3 of hashing inputs), possibly by combining multiple counter shares stored in separate DBs
export const getCounter = async function (domain) {
    const uid = await storage.getData("userId")
    // Counter doesn't exist for this domain. Generate a new one. 
    const isNewCounter = await firestore.fetchCounter(uid, domain) === undefined
    if (isNewCounter) {
        await createOrEditCounter(uid, domain)
    }
    const shares = [
        await firestore.fetchCounter(uid, domain),
    ]
    return sum(shares)
}

// Modify existing counter, called when "Change Password" clicked
export const resetCounter = function (domain) {
    const uid = storage.getData("userId")
    createOrEditCounter(uid, domain)
}

export const generateQRString = async function () {
    const userId = await storage.getData("userId")
    const clientAuth = await storage.getData("clientAuth")
    return userId + " " + clientAuth
}
// ------------------ PRIVATE HELPERS: ------------------

// Password from string to int
const passwordToInt = function (pw) {
    return sodium.to_string(pw) // TODO: currently an int array, not just an int
}

// Generate and save server-side portion of counter
const createOrEditCounter = async function (userId, domain) { // TODO
    const MAX_COUNTER_SHARE_VALUE = 10000
    // Generate secrets
    const secret1 = sodium.randombytes_random()
    // Secret sharing: write to 2 db's
    await firestore.setDomain(userId, domain, secret1)
    // another DB here
}

const sum = function (arr) {
    return arr.reduce((acc, el) => acc + el, 0)
}


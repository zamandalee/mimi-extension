/*global chrome*/

import * as storage from "./storage";
import { defaultWeek } from "./constants";
const sodium = require('libsodium-wrappers');
// we may need to await sodium.ready

// Hash the masterpass, domain name, and counter together to product the MiMi password
export const generateMimi = async function (seed, domain, counter) {
    await sodium.ready
    const concatSeed = seed + domain + counter
    let h = sodium.crypto_generichash(16, concatSeed);
    console.log(h, sodium.to_hex(h), h.length);
    return h
}

// Get counter (1/3 of hashing inputs)
export const getCounter = function (pw, domain, isNewCounter=false) {
    let counter = passwordToInt(pw)
    if (isNewCounter) { // TODO
        // Write secrets to db's
        counter += generateDbSecrets(domain) // Currently regenerating, otherwise generate random num and + it to old counter
    } else {
        // Fetch secrets from db's
        // counter += db1[domain] + db2[domain]
        counter += 2 // TODO: temp
    }
    return counter
}

// Private helpers

// Password from string to int
const passwordToInt = function (pw) {
    return sodium.to_string(pw) // TODO: currently an int array, not just an int
}

// Generate and save server-side portion of counter
const MAX_SUM = 10000
const generateDbSecrets = function (domain) { // TODO
    // Generate secrets
    const shares = generateRandomInts(MAX_SUM)
    // Secret sharing: write to 2 db's
    // db1[domain] = shares[0]
    // db2[domain] = shares[1]
    // Return sum of db portion of counter
    return sum(shares)
}

const generateRandomInts = function (max) {
    // sodium.randombytes_random()
    // sodium.rand
    const secret1 = sodium.randombytes_uniform(max)
    const secret2 = sodium.randombytes_uniform(max)

    return [1,2]

    // const randomSum = Math.floor(Math.random() * max)
    // const secret1 = Math.floor(Math.random() * max)
    // const secret2 = randomSum - secret1
    // return [secret1, secret2]
}

const sum = function (arr) {
    return arr.reduce((acc, el) => acc + el, 0)
}
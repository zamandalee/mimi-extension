/*global chrome*/

import * as storage from "./storage";
import { defaultWeek } from "./constants";

export const generateMimi = function (seed, domain, counter) {
    const concatSeed = seed + domain + counter
    let h = sodium.crypto_generichash(16, concatSeed);
    console.log(h, sodium.to_hex(h), h.length);
    return h
}
export const generateRandomInt = function (max) {
    return Math.floor(Math.random() * max);
}
export const secretShareCounter = function (domain) { // TODO
    const MAX = 10000
    const shares = generateRandomInt(MAX)
    db1[domain] = shares[0]
    db2[domain] = shares[1]
    db3[domain] = shares[2]
    return sum(shares)
}
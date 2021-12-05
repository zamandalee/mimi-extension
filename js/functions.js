// Hashing functions


// function generateMimi(seed, domain, counter) {
//     const concatSeed = seed + domain + counter
//     let h = sodium.crypto_generichash(16, concatSeed);
//     console.log(h, sodium.to_hex(h), h.length);
// }

const Functions = (function() {
    const generateMimi = function(seed, domain, counter) {
        const concatSeed = seed + domain + counter
        let h = sodium.crypto_generichash(16, concatSeed);
        console.log(h, sodium.to_hex(h), h.length);
        return h
    }
    return {
        generateMimi
    }
})()


// export {generateMimi, loadMimi}

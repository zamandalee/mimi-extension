
function generateMimi(seed, domain, counter) {
    const concatSeed = seed + domain + counter
    let h = sodium.crypto_generichash(16, concatSeed);
    console.log(sodium.to_hex(h), h.length);
}


function loadMimi() {
    generateMimi("abc123", "nytimes.com", 100)
}

window.sodium = {
    onload: loadMimi
};




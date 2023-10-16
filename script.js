let aesKey ="adrvzz";
let rsaKeyPair;

// Función para cifrar un mensaje con AES
function encryptAES() {
    const message = document.getElementById("message").value;
    //aesKey = CryptoJS.lib.WordArray.random(16); // Genera una clave AES de 128 bits (16 bytes)
    console.log(aesKey)
    const ciphertext = CryptoJS.AES.encrypt(message, aesKey);
    document.getElementById("result").textContent = `Mensaje cifrado con AES: ${ciphertext.toString()}`;
}

// Función para cifrar la clave AES con RSA
function encryptRSA() {
    if (!aesKey) {
        document.getElementById("result").textContent = "Primero cifra el mensaje con AES.";
        return;
    }
    rsaKeyPair = generateRSAKeyPair();
    const rsaEncryptedKey = encryptRSA(aesKey, rsaKeyPair.pubKeyObj());
    document.getElementById("result").textContent = `Clave AES cifrada con RSA: ${rsaEncryptedKey}`;
}

// Función para descifrar la clave AES con RSA
function decryptRSA() {
    if (!rsaKeyPair) {
        document.getElementById("result").textContent = "Primero cifra la clave AES con RSA.";
        return;
    }
    const rsaDecryptedKey = decryptRSA(rsaKeyPair, document.getElementById("result").textContent);
    aesKey = CryptoJS.enc.Hex.parse(rsaDecryptedKey);
    document.getElementById("result").textContent = "Clave AES descifrada con RSA.";
}

// Función para descifrar un mensaje con AES
function decryptAES() {
    if (!aesKey) {
        document.getElementById("result").textContent = "Primero cifra el mensaje con AES.";
        return;
    }
    const ciphertext = document.getElementById("result").textContent;
    const plaintext = CryptoJS.AES.decrypt(ciphertext, aesKey).toString(CryptoJS.enc.Utf8);
    document.getElementById("result").textContent = `Mensaje descifrado con AES: ${plaintext}`;
}

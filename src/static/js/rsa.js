// rsa.js - 浏览器版

/**
 * 生成RSA密钥对
 * @param {number} keySize 密钥长度，默认2048
 * @returns {Promise<{privateKey: CryptoKey, publicKey: CryptoKey}>}
 */
async function generateRSAKeyPair(keySize = 2048) {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: keySize,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: { name: "SHA-256" }
        },
        true,
        ["encrypt", "decrypt"]
    );
    return keyPair;
}

/**
 * RSA加密
 * @param {CryptoKey} publicKey 公钥
 * @param {string} inputText 明文
 * @returns {Promise<ArrayBuffer>} 密文
 */
async function encryptRSA(publicKey, inputText) {
    const enc = new TextEncoder();
    return await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP"
        },
        publicKey,
        enc.encode(inputText)
    );
}

/**
 * RSA解密
 * @param {CryptoKey} privateKey 私钥
 * @param {ArrayBuffer} encryptedBuffer 密文
 * @returns {Promise<string>} 明文
 */
async function decryptRSA(privateKey, encryptedBuffer) {
    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP"
        },
        privateKey,
        encryptedBuffer
    );
    const dec = new TextDecoder();
    return dec.decode(decrypted);
}

/**
 * RSA加密
 * @param {CryptoKey} privateKey 私钥
 * @param {string} inputText 明文
 * @returns {Promise<ArrayBuffer>} 密文
 */
async function encryptRSAwithPrivateKey(privateKey, inputText) {
    const enc = new TextEncoder();
    return await window.crypto.subtle.sign(
        {
            name: "RSA-PSS",
            saltLength: 32
        },
        privateKey,
        enc.encode(inputText)
    );
}

/**
 * RSA解密
 * @param {CryptoKey} publicKey 公钥
 * @param {ArrayBuffer} encryptedBuffer 密文
 * @returns {Promise<boolean>} 明文
 */
async function decryptRSAwithPublicKey(publicKey, encryptedBuffer) {
    const isVerified = await window.crypto.subtle.verify(
        {
            name: "RSA-PSS",
            saltLength: 32
        },
        publicKey,
        encryptedBuffer,
        new TextEncoder().encode("验证字符串")
    );
    return isVerified;
}

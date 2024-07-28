/*
Chat - A simple chat application.
Copyright (C) 2024 oimaster

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

Contact Information:
Email: oimasterfake@icloud.com

Project URL: https://github.com/oimasterkafuu/chat
*/

// rsa.js - 浏览器版

/**
 * 生成RSA密钥对
 * @param {number} keySize 密钥长度，默认2048
 * @returns {Promise<{privateKey: CryptoKey, publicKey: CryptoKey}>}
 */
async function generateRSAKeyPair(keySize = 2048) {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: 'RSA-OAEP',
            modulusLength: keySize,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: { name: 'SHA-256' }
        },
        true,
        ['encrypt', 'decrypt']
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
            name: 'RSA-OAEP'
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
            name: 'RSA-OAEP'
        },
        privateKey,
        encryptedBuffer
    );
    const dec = new TextDecoder();
    return dec.decode(decrypted);
}

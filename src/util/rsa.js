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

const crypto = require('crypto');

/**
 * 生成RSA密钥对
 * @param {number} keySize 密钥长度，默认2048
 * @returns {{privateKey: import('crypto').KeyObject, publicKey: import('crypto').KeyObject}}
 */
function generateRSAKeyPair(keySize = 2048) {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: keySize,
    });
    return {
        privateKey,
        publicKey,
    };
}

/**
 * RSA加密
 * @param {import('crypto').KeyObject} publicKey 公钥
 * @param {string} inputText 明文
 * @returns {Buffer} 密文
 */
function encryptRSA(publicKey, inputText) {
    return crypto.publicEncrypt(publicKey, Buffer.from(inputText));
}

/**
 * RSA解密
 * @param {import('crypto').KeyObject} privateKey 私钥
 * @param {Buffer} encryptedBuffer 密文
 * @returns {string} 明文
 */
function decryptRSA(privateKey, encryptedBuffer) {
    return crypto.privateDecrypt(privateKey, encryptedBuffer).toString();
}

/**
 * RSA解密
 * @param {import('crypto').KeyObject} publicKey 公钥
 * @param {Buffer} encryptedBuffer 密文
 * @returns {string} 明文
 */
function decryptRSAwithPublicKey(publicKey, encryptedBuffer) {
    return crypto.publicDecrypt(publicKey, encryptedBuffer).toString();
}

/**
 * RSA加密
 * @param {import('crypto').KeyObject} privateKey 私钥
 * @param {string} inputText 明文
 * @returns {Buffer} 密文
 */
function encryptRSAwithPrivateKey(privateKey, inputText) {
    return crypto.privateEncrypt(privateKey, Buffer.from(inputText));
}

module.exports = {
    generateRSAKeyPair,
    encryptRSA,
    decryptRSA,
    decryptRSAwithPublicKey,
    encryptRSAwithPrivateKey
};


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

// 浏览器兼容的 aes.js 加密和解密工具

const header = 'OIMENC8DB3F1';

/**
 * 生成 AES 密钥。
 * @param {string} password - 密码。
 * @returns {Promise<CryptoKey>} - 密钥。
 */
async function generateKey(password) {
    const keyHex = await generateSHA256Hash(password);
    const keyArray = hexToUint8Array(keyHex).slice(0, 32);

    return await window.crypto.subtle.importKey('raw', keyArray, { name: 'AES-CBC' }, false, ['encrypt', 'decrypt']);
}

/**
 * 将十六进制字符串转换为 Uint8Array
 * @param {string} hexString 十六进制字符串
 * @returns {Uint8Array} 转换后的 Uint8Array
 */
function hexToUint8Array(hexString) {
    const byteArray = new Uint8Array(hexString.length / 2);
    for (let i = 0; i < byteArray.length; i++) {
        byteArray[i] = parseInt(hexString.substr(i * 2, 2), 16);
    }
    return byteArray;
}

/**
 * 生成随机的初始化向量。
 * @returns {Uint8Array} - 初始化向量。
 */
function generateIV() {
    return window.crypto.getRandomValues(new Uint8Array(16));
}

/**
 * 加密文本。
 * @param {string} password - 密码。
 * @param {string} inputText - 输入文本。
 * @returns {Promise<Uint8Array>} - 加密后的文本。
 */
async function encryptText(password, inputText) {
    const key = await generateKey(password);
    const iv = generateIV();
    const enc = new TextEncoder();
    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: 'AES-CBC',
            iv: iv
        },
        key,
        enc.encode(inputText)
    );

    const headerBytes = new TextEncoder().encode(header);
    const combined = new Uint8Array(headerBytes.length + iv.length + encrypted.byteLength);
    combined.set(headerBytes);
    combined.set(iv, headerBytes.length);
    combined.set(new Uint8Array(encrypted), headerBytes.length + iv.length);

    return combined;
}

/**
 * 解密文本。
 * @param {string} password - 密码。
 * @param {Uint8Array} encryptedBuffer - 加密文本。
 * @throws {Error} - 非法的消息头或密码错误。
 * @returns {Promise<string>} - 解密后的文本。
 */
async function decryptText(password, encryptedBuffer) {
    const key = await generateKey(password);
    const headerBytes = new TextEncoder().encode(header);

    const headerArrayBuffer = encryptedBuffer.slice(0, headerBytes.length);
    const headerBuffer = new Uint8Array(headerArrayBuffer);

    if (!compareUint8Arrays(headerBytes, headerBuffer)) {
        throw new Error('非法的消息头');
    }

    const iv = encryptedBuffer.slice(headerBytes.length, headerBytes.length + 16);
    const data = encryptedBuffer.slice(headerBytes.length + 16);

    let decrypted;
    try {
        decrypted = await window.crypto.subtle.decrypt(
            {
                name: 'AES-CBC',
                iv: iv
            },
            key,
            data
        );
    } catch (e) {
        throw new Error('密码错误');
    }

    const dec = new TextDecoder();
    return dec.decode(decrypted);
}

/**
 * 比较两个 Uint8Array 是否相等。
 * @param {Uint8Array} a - 第一个 Uint8Array。
 * @param {Uint8Array} b - 第二个 Uint8Array。
 * @returns {boolean} - 是否相等。
 */
function compareUint8Arrays(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

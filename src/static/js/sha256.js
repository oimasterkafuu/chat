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

// sha256.js - 浏览器版

/**
 * 生成 SHA-256 哈希值
 * @param {string} inputText 输入文本
 * @returns {Promise<string>} 哈希值（十六进制）
 */
async function generateSHA256Hash(inputText) {
    const enc = new TextEncoder();
    const inputBuffer = enc.encode(inputText);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', inputBuffer);
    return bufferToHex(hashBuffer);
}

/**
 * 将 ArrayBuffer 转换为十六进制字符串
 * @param {ArrayBuffer} buffer 输入缓冲区
 * @returns {string} 十六进制字符串
 */
function bufferToHex(buffer) {
    const byteArray = new Uint8Array(buffer);
    const hexCodes = Array.from(byteArray).map((byte) => byte.toString(16).padStart(2, '0'));
    return hexCodes.join('');
}

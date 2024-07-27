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

// 定义文件头
const header = 'OIMENC8DB3F1';

// 生成 AES 密钥
function generateKey(password) {
    return crypto.createHash('sha256').update(password).digest().slice(0, 16);
}

// 生成随机的初始化向量
function generateIV() {
    return crypto.randomBytes(16); // 16 bytes for AES-128
}

// 加密文本
function encryptText(password, inputText) {
    const key = generateKey(password);
    const iv = generateIV(); // Generate a random IV

    // 创建加密流
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);

    // 加密文本
    const encrypted = Buffer.concat([Buffer.from(header), iv, cipher.update(inputText, 'utf8'), cipher.final()]);
    return encrypted;
}

// 解密文本
function decryptText(password, encryptedText) {
    const key = generateKey(password);

    if (!encryptedText.toString().startsWith(header)) {
        throw new Error('非法的消息头');
    }

    const iv = encryptedText.slice(header.length, header.length + 16);
    const encryptedData = encryptedText.slice(header.length + 16); // 从 IV 后面开始

    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv); // 使用 PKCS#7 填充
    const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
    return decrypted.toString('utf8');
}

module.exports = {
    encryptText,
    decryptText
};

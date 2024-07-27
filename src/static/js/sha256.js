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
    const hexCodes = Array.from(byteArray).map(byte => byte.toString(16).padStart(2, '0'));
    return hexCodes.join('');
}

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

const {
    generateRSAKeyPair,
    encryptRSA,
    decryptRSA,
    encryptRSAwithPrivateKey,
    decryptRSAwithPublicKey
} = require('./rsa');

// 测试RSA加密和解密
describe('RSA 加密和解密', () => {
    it('应该能够用私钥成功解密公钥加密的文本', () => {
        // 生成一个密钥对
        const { privateKey, publicKey } = generateRSAKeyPair();

        // 定义输入文本
        const inputText = '你好，世界！';

        // 加密输入文本
        const encryptedText = encryptRSA(publicKey, inputText);

        // 解密加密后的文本
        const decryptedText = decryptRSA(privateKey, encryptedText);

        // 检查解密后的文本是否与输入文本相匹配
        expect(decryptedText).toEqual(inputText);
    });

    it('应该能够用公钥成功解密私钥加密的文本', () => {
        // 生成一个密钥对
        const { privateKey, publicKey } = generateRSAKeyPair();

        // 定义输入文本
        const inputText = '你好，世界！';

        // 加密输入文本
        const encryptedText = encryptRSAwithPrivateKey(privateKey, inputText);

        // 解密加密后的文本
        const decryptedText = decryptRSAwithPublicKey(publicKey, encryptedText);

        // 检查解密后的文本是否与输入文本相匹配
        expect(decryptedText).toEqual(inputText);
    });

    it('应该在不同的公钥下输出不同的密文', () => {
        // 生成两个密钥对
        const { publicKey: publicKey1 } = generateRSAKeyPair();
        const { publicKey: publicKey2 } = generateRSAKeyPair();

        // 定义输入文本
        const inputText = '你好，世界！';

        // 加密输入文本
        const encryptedText1 = encryptRSA(publicKey1, inputText);
        const encryptedText2 = encryptRSA(publicKey2, inputText);

        // 检查两个密文是否不同
        expect(encryptedText1).not.toEqual(encryptedText2);
    });

    it('应该在使用错误的私钥时抛出错误', () => {
        // 生成一个密钥对
        const { publicKey } = generateRSAKeyPair();

        // 定义输入文本
        const inputText = '你好，世界！';

        // 加密输入文本
        const encryptedText = encryptRSA(publicKey, inputText);

        // 定义一个错误的私钥
        const wrongPrivateKey = 'wrongPrivateKey';

        // 检查使用错误的私钥解密时是否抛出错误
        expect(() => decryptRSA(wrongPrivateKey, encryptedText)).toThrow();
    });
});

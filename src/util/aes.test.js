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

const { encryptText, decryptText } = require('./aes');

describe('AES 加密和解密', () => {
    // 测试正常加密和解密
    it('应该正确地加密和解密', () => {
        const password = 'myPassword';
        const inputText = 'Hello, world!';

        const encrypted = encryptText(password, inputText);
        const decrypted = decryptText(password, encrypted);

        expect(decrypted).toEqual(inputText);
    });

    // 测试中文字符加密和解密
    it('应该正确地加密和解密中文字符', () => {
        const password = 'myPassword';
        const inputText = '你好，世界！';

        const encrypted = encryptText(password, inputText);
        const decrypted = decryptText(password, encrypted);

        expect(decrypted).toEqual(inputText);
    });

    // 测试密码错误时的解密
    it('应该在使用错误的密码时抛出错误', () => {
        const password = 'myPassword';
        const inputText = 'Hello, world!';
        const encrypted = encryptText(password, inputText);

        const wrongPassword = 'wrongPassword';

        expect(() => decryptText(wrongPassword, encrypted)).toThrow('密码错误');
    });

    // 测试初始化向量的变化
    it('应该在每次加密时更改初始化向量', () => {
        const password = 'myPassword';
        const inputText = 'Hello, world!';

        const encrypted1 = encryptText(password, inputText);
        const encrypted2 = encryptText(password, inputText);

        expect(encrypted1).not.toEqual(encrypted2);
    });

    // 测试非法消息头的解密
    it('应该在解密时抛出非法消息头的错误', () => {
        const password = 'myPassword';
        const inputText = 'Hello, world!';
        const encrypted = encryptText(password, inputText);

        // 修改加密内容的第一个字节
        const modifiedEncrypted = Buffer.from(encrypted);
        modifiedEncrypted[0] = 0;

        expect(() => decryptText(password, modifiedEncrypted)).toThrow('非法的消息头');
    });
});


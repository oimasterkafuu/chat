/*
Chat - A simple chat application.
Copyright (C) 2024 oimaster

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

Contact Information:
Email: oimasterfake@icloud.com

Project URL: https://github.com/oimasterkafuu/chat
*/

const config = require("./config");
const { encryptText, decryptText } = require("./util/aes");


const clientNumbers = {};

module.exports = (io) => {
    // 监听客户端连接
    io.on('connection', (socket) => {
        console.log(`Client ${socket.id} connected`);

        // 赋予随机六位数编号
        socket.on('number', (numberEncrypted) => {
            // 客户端传过来的数字
            if(numberEncrypted) {
                console.log(`Client ${socket.id} numberpass: ${numberEncrypted}`);

                try{
                    const number = parseInt(decryptText(config.numberSecret, numberEncrypted));
                    if(!number) {
                        throw new Error('数字解密失败');
                    }

                    // 登记客户端编号
                    clientNumbers[socket.id] = number;
                    console.log(`Client ${socket.id} number: ${number}`);
                    
                    // 返回给客户端
                    socket.emit('number', number);
                    // socket.emit('numberpass', encryptText(config.numberSecret, number.toString()));
                    return;
                } catch(e) {
                    socket.emit('error', '数字解密失败');
                }
            }

            // 客户端密码无效，生成随机六位数
            console.log(`Client ${socket.id} numberpass error`);
            const number = Math.floor(Math.random() * (999999 - 100000) + 100000);
            const numberPass = encryptText(config.numberSecret, number.toString());

            // 登记客户端编号
            clientNumbers[socket.id] = number;
            console.log(`Client ${socket.id} number: ${number}, numberpass: ${numberPass}`);

            // 返回给客户端
            socket.emit('number', number);
            socket.emit('numberpass', numberPass);
        });

        // 监听客户端发送的消息
        socket.on('message', (data) => {
            const text = data.text, receiver = parseInt(data.receiver);
            console.log(`Client ${clientNumbers[socket.id]} -> ${receiver}: ${text}`);

            // 找到接收方
            var receiverSocket = null;

            for (const clientId of Object.keys(clientNumbers)) {
                if (clientNumbers[clientId] === receiver) {
                    receiverSocket = clientId;
                    break;
                }
            }

            if (receiverSocket) {
                console.log(`Client ${clientNumbers[socket.id]} -> ${clientNumbers[receiverSocket.id]}: ${text}`);

                io.to(receiverSocket).emit('message', text);

                // 发送成功
                socket.emit('ok');
            } else {
                // 发送失败
                socket.emit('fail', '对方不在线');
            }
        });

        // 监听客户端断开连接
        socket.on('disconnect', () => {
            console.log(`Client ${socket.id} disconnected`);
            delete clientNumbers[socket.id];
        });
    });
};

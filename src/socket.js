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

const config = require('./config');
const { decryptText } = require('./util/aes');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('一个新的客户端已连接');

        socket.on('msg', (data) => {
            console.log(decryptText('oimasterkafuu', data));
            io.sockets.sockets.forEach((s) => {
                if (s.id !== socket.id) {
                    s.emit('msg', data);
                }
            });
        });

        socket.on('disconnect', () => {
            console.log('一个客户端已断开');
        });
    });
};

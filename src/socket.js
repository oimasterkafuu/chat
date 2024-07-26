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


module.exports = (io) => {
    // 监听客户端连接
    io.on('connection', (socket) => {
        console.log(`Client ${socket.id} connected`);
    
        // 监听客户端发送的消息
        socket.on('message', (message) => {
            console.log(`Client ${socket.id} sent a message: ${message}`);
    
            // 将消息发送给所有客户端
            io.emit('message', message);
        });
    
        // 监听客户端断开连接
        socket.on('disconnect', () => {
            console.log(`Client ${socket.id} disconnected`);
        });
    });
};

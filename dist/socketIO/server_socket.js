'use strict';

var _require = require('../db/models'),
    ChatModel = _require.ChatModel;

module.exports = function (server) {
  var io = require('socket.io')(server);
  // 监视连接(当有一个客户连接上时回调)
  io.on('connection', function (socket) {
    //  console.log('soketio connected')
    // 绑定sendMsg监听, 接收客户端发送的消息
    socket.on('sendMsg', function (_ref) {
      var content = _ref.content,
          from = _ref.from,
          to = _ref.to;

      console.log('服务器接收到浏览器的消息', { content: content, from: from, to: to });
      var chat_id = [from, to].sort().join('_');
      var create_time = Date.now();

      new ChatModel({ content: content, from: from, to: to, chat_id: chat_id, create_time: create_time }).save(function (error, chatMsg) {
        io.emit('receiveMsg', chatMsg);
      });
    });
  });
};
//# sourceMappingURL=server_socket.js.map
'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gzhipin1', { useNewUrlParser: true });
var conn = mongoose.connection;
conn.on('connected', function () {
  console.log('数据库连接成功~');
});
var userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  header: { type: String },
  post: { type: String },
  info: { type: String },
  company: { type: String },
  salary: { type: String }
});
var UserModel = mongoose.model('user', userSchema);
exports.UserModel = UserModel;
//# sourceMappingURL=models.js.map
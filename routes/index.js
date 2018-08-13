
var express = require('express');
var router = express.Router();
const md5=require('blueimp-md5');
const {UserModel}=require('../db/models');
const filter={password:0,__v:0}



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*router.post('/register',function (req,res) {
  const {username,password,type}=req.body;


})*/
router.post('/register',function (req,res) {
  const {username,password,type}=req.body;
  UserModel.findOne({username},function (err,user) {
    if(user){
      res.send({code:1,msg:"用户已存在"})
    }else {
      console.log(1111)
      UserModel.create({username,type,password:md5(password)},function (err,user) {
        // res.cookie('userid',user._id,{maxAge:1000*60*60*24*7})
        const data={username,type,_id:user._id}
        console.log(user)
        res.send({code:0,data})
      })
        /*res.cookie('userid',user._id,{maxAge:1000*60*60*24*7})*/
    }
  })
})


router.post('/login',function (req,res) {
  const {username,password}=req.body;
  UserModel.findOne({username,password:md5(password)},filter,function (error,user) {
    if(user){
      res.cookie('userid',user._id,{maxAge:1000*60*60*24*7})
      res.send({code:0,data:user})
    }else {
      res.send({code:1,msg:'用户名或密码不正确'})
    }
  })
})
/*router.post('/register', function (req, res) {
  // 读取请求参数数据
  const {username, password, type} = req.body
  // 处理: 判断用户是否已经存在, 如果存在, 返回提示错误的信息, 如果不存在, 保存
  // 查询(根据username)
  UserModel.findOne({username}, function (err, user) {
    // 如果user有值(已存在)
    if(user) {
      // 返回提示错误的信息
      res.send({code: 1, msg: '此用户已存在'})
    } else { // 没值(不存在)
      // 保存
      new UserModel({username, type, password:md5(password)}).save(function (error, user) {

        // 生成一个cookie(userid: user._id), 并交给浏览器保存
        res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
        // 返回包含user的json数据
        const data = {username, type, _id: user._id} // 响应数据中不要携带password
        res.send({code: 0, data})
      })
    }
  })
  // 返回响应数据
})

// 登陆的路由
router.post('/login', function (req, res) {
  const {username, password} = req.body
  // 根据username和password查询数据库users, 如果没有, 返回提示错误的信息, 如果有, 返回登陆成功信息(包含user)
  UserModel.findOne({username, password:md5(password)}, filter, function (err, user) {
    if(user) { // 登陆成功
      // 生成一个cookie(userid: user._id), 并交给浏览器保存
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
      // 返回登陆成功信息(包含user)
      res.send({code: 0, data: user})
    } else {// 登陆失败
      res.send({code: 1, msg: '用户名或密码不正确!'})
    }
  })
})*/

module.exports = router;

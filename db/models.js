

const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/gzhipin1', {useNewUrlParser: true} );
const conn=mongoose.connection;
conn.on('connected',()=>{
  console.log('数据库连接成功~')
});
const userSchema=mongoose.Schema({
  username:{type:String,required:true},
  password:{type:String,required:true},
  type:{type:String,required:true},
  header: {type: String},
  post: {type: String},
  info: {type: String},
  company: {type: String},
  salary: {type: String}
})
const UserModel=mongoose.model('user',userSchema);
exports.UserModel=UserModel;


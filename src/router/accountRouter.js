// 详解account跟目录下的操作
var express = require('express');
const path = require('path')

var accountRouter = express.Router();

const accountCTRL = require(path.join(__dirname,'../controllers/accountRouter'))
accountRouter.get('/login',accountCTRL.getLoginPage)

accountRouter.get('/vcode',accountCTRL.getVcode)

accountRouter.get('/register',accountCTRL.getregister)

// 处理注册请求
accountRouter.post('/register',accountCTRL.register)
// 处理登录请求
accountRouter.post('/login',accountCTRL.login)
module.exports = accountRouter
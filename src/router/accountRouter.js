// 详解account跟目录下的操作
var express = require('express');
const path = require('path')

var accountRouter = express.Router();

const accountCTRL = require(path.join(__dirname,'../controllers/accountRouter'))
accountRouter.get('/index',accountCTRL.getLoginPage)


module.exports = accountRouter
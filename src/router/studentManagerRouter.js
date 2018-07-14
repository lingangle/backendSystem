// 详解account跟目录下的操作
var express = require('express');
const path = require('path')

var studentManagerRouter = express.Router();

const studentCTRL = require(path.join(__dirname,'../controllers/studentManagerController'))
studentManagerRouter.get('/studentPage',studentCTRL.getStudentPage)
// 新增
studentManagerRouter.get('/add',studentCTRL.getaddStudentPage)
//新增学生信息
studentManagerRouter.post('/add',studentCTRL.addStudent)
//修改学生信息get
studentManagerRouter.get('/edit/:studentId',studentCTRL.editStudentPage) 
//新增学生信息post
studentManagerRouter.post('/edit/:studentId',studentCTRL.editStudent)

studentManagerRouter.get('/delete/:studentId',studentCTRL.deleteStudent) 
studentManagerRouter.get('/logout',studentCTRL.logout) 

module.exports = studentManagerRouter
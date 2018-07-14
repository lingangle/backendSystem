const path = require('path')
var captchapng = require('captchapng');
var session = require('express-session'); 
const dbtool = require(path.join(__dirname,'../tools/db'))

// 导出方法
exports.getLoginPage = (req,res)=>{
    //  res.sendFile是请求静态文件
    res.sendFile(path.join(__dirname,'../views/login.html'));
}
exports.getregister = (req,res)=>{
    //  res.sendFile是请求静态文件
    res.sendFile(path.join(__dirname,'../views/register.html'));
}
// 处理注册的post请求逻辑
exports.register = (req,res)=>{
    //这里用一个假设法，1用户名存在 0代表成功 
    const result={status:0,message:'连接成功'}
    // 1.获取传递过来的username和password
    // ES6解构赋值
    const {username,password} = req.body
    // 2.判断用户名在数据库中是否存在，存在发送已存在，不存在，存入数据库，响应注册成功
    dbtool.findOne('accountinfo',{username},(err,doc)=>{
        console.log(doc)
        if(doc!=null){
            result.status = 1
            result.message='用户名已经存在'
            res.json(result)
        }else{
            dbtool.insertOne('accountinfo',req.body,(err,result1)=>{                
                if(result1 == null){
                    result.status = 2
                    result.message='注册失败'
                    res.json(result)
                }
                res.json(result)                    
                
            }); 
        }
    });
}
// 处理登录的post请求逻辑
exports.login = (req,res)=>{
    //这里用一个假设法，1用户名存在 0代表成功 
    const result={status:0,message:'登录成功'}
    // 1.获取传递过来的username和password
    // ES6解构赋值
    const {username,password,vcode} = req.body
    if(vcode != req.session.checkcode){
        result.status = 1
        result.message='验证码错误'        
        res.json(result)
        return
    }    
    // 2.判断用户名在数据库中是否存在，存在发送已存在，不存在，存入数据库，响应注册成功
    dbtool.findOne('accountinfo',{username},(err,doc)=>{
        if(!doc){                                 //查询不到用户名匹配信息，则用户名不存在
            result.status = 2
            result.message='用户不存在'        
        }else if(password != doc.password){     //查询到匹配用户名的信息，但相应的password属性不匹配
            result.status = 3
            result.message='密码错误'
        }else{
            req.session.loginname = username
        }
        res.json(result) 
    });
}
// 获取图片验证码的方法
exports.getVcode = (req,res)=>{
    //  res.sendFile是请求静态文件
    // 1、利用第三方包创建一个用canvas绘制的数字图片
    var code = parseInt(Math.random() * 9000 + 1000);
    // 2.存起来
    req.session.checkcode = code;

    var p = new captchapng(100, 30, code);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

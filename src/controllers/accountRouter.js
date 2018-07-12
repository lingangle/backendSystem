const path = require('path')
var captchapng = require('captchapng');
// 导出方法
exports.getLoginPage = (req,res)=>{
    //  res.sendFile是请求静态文件
    res.sendFile(path.join(__dirname,'../views/login.html'));
}
// 获取图片验证码的方法
exports.getVcode = (req,res)=>{
    //  res.sendFile是请求静态文件
    // 1、利用第三方包创建一个用canvas绘制的数字图片
    var code = parseInt(Math.random() * 9000 + 1000);
    var p = new captchapng(100, 30, code);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
    // 2.存起来
    // req.session.checkcode = code;
    // 3.返回
    
}

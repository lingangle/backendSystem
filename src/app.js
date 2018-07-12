var express = require('express');
var app = express();
const path = require('path')


//node中处理静态资源
app.use(express.static(path.join(__dirname,"statics")))


// 连接这个路由js文件
const accountRouter = require(path.join(__dirname,'./router/accountRouter.js'))
app.use('/account',accountRouter)



app.listen(3000,err=>{
    if(err){
        console.log(err)
    }else{
        console.log('连接成功')
    }
})











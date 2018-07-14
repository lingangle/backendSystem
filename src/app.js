var express = require('express');
var app = express();
const path = require('path')
const bodyParser = require('body-parser')
var session = require('express-session')

//node中处理静态资源
app.use(express.static(path.join(__dirname,"statics")))

 
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 160000 }
  }))


  app.use('*',(req,res,next)=>{

   
    if(req.originalUrl.includes('/account')){
        next()        
    }else{
        if(!req.session.loginname){
            res.send('<script>alert("你还没有登录哟");location.href="/account/login"</script>')
            return
        }
        next()
    }
  })

// 连接这个路由js文件
const accountRouter = require(path.join(__dirname,'./router/accountRouter.js'))
app.use('/account',accountRouter)

const studentManagerRouter = require(path.join(__dirname,'./router/studentManagerRouter.js'))
app.use('/studentManager',studentManagerRouter)


app.listen(3000,err=>{
    if(err){
        console.log(err)
    }else{
        console.log('连接成功')
    }
})











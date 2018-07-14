const path = require('path')
var session = require('express-session');
const xtpl = require('xtpl')
const dbtool = require(path.join(__dirname,'../tools/db'))

// 导出方法
exports.getStudentPage = (req,res)=>{
    const keyword = req.query.keyword || ''   
    dbtool.find('studentInfo',{name:{$regex:keyword}},(err,docs)=>{
        xtpl.renderFile(path.join(__dirname,'../views/list.html'),{studentList:docs,keyword,loginname:req.session.loginname},(err,content)=>{
            res.send(content)
        })       
    });  
}
exports.getaddStudentPage = (req,res)=>{
    xtpl.renderFile(path.join(__dirname,'../views/add.html'),{loginname:req.session.loginname},(err,content)=>{
        res.send(content)
    }) 
}

/**
 * 暴露出去，获取新增学生方法
 */
exports.addStudent = (req,res) => {

    dbtool.insertOne('studentInfo',req.body,(err,result)=>{
        if(result == null) {//失败
            res.send('<script>alert("插入失败")</script>')
        }else {
            res.send('<script>location.href = "/studentmanager/studentPage"</script>')
        }
    })
}

    
exports.editStudentPage = (req,res)=>{
    const _id =dbtool.ObjectId(req.params.studentId)
    // console.log(_id)
    dbtool.findOne('studentInfo',{_id},(err,doc)=>{        
        xtpl.renderFile(path.join(__dirname,'../views/edit.html'),{info:doc,loginname:req.session.loginname},(err,content)=>{
            res.send(content)
        })  
    });   
}

exports.editStudent = (req,res) => {
    const _id =dbtool.ObjectId(req.params.studentId)
    // console.log(_id)
    dbtool.updateOne('studentInfo',{_id},req.body,(err,result)=>{
        if(result != null) {//失败
            res.send('<script>alert("修改失败")</script>')
        }else {
            res.send('<script>location.href = "/studentmanager/studentPage"</script>')
        }
    })

}
exports.deleteStudent = (req,res) => {
    const _id =dbtool.ObjectId(req.params.studentId)
    // console.log(_id)
    dbtool.deleteOne('studentInfo',{_id},(err,result)=>{
        if(result != null) {//失败
            res.send('<script>alert("删除失败")</script>')
        }else {
            res.send('<script>location.href = "/studentmanager/studentPage"</script>')
        }
    })

}

exports.logout = (req,res)=>{
    req.session.loginname = undefined
    res.send('<script>location.href = "/account/login"</script>')

}


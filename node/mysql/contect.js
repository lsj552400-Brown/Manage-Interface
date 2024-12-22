const express = require('express');   //引入express 模块
const app = express();  // 创建实例
const mysql = require('mysql')   // 引入数据库

const userMql = require('../utils/mqlData');  // 导入数据库设置数据，增加代码复用与可维护性

const connectMql = mysql.createConnection({
    host: userMql.mqlIP,       //主机地址
    user: userMql.mqlUser,     // 用户名
    password: userMql.mqlPassWord,   //密码
    database: userMql.mqlName,    // 数据库名
    port: 26702,
    timeout: 30000,
})

connectMql.connect(err => {
    console.log(err, '为null则连接成功')
})

app.get('/find',(req,res)=>{
    let sql = `SELECT * FROM ${userMql.test}`
    connectMql.query(sql,(err,results)=>{
        res.send(results)
        console.log('打印',results, err)
    })
})

app.listen(3000, () => {
    console.log('服务器在3000端口开启');
})
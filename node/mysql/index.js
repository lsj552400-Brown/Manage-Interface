const express = require('express');
const app = express();
const mysql = require('mysql');
const http = require('http');
const cors = require('cors'); // 解决跨域
app.use(cors());

const userMql = require('../utils/mqlData'); // 导入数据库设置数据，增加代码复用与可维护性

const connectMql = mysql.createConnection({
  host: userMql.mqlIP, // 主机地址
  user: userMql.mqlUser, // 用户名
  password: userMql.mqlPassWord, // 密码
  database: userMql.mqlName, // 数据库名
  port: userMql.port // 数据库端口
});

connectMql.connect(err => {
    if (err) {
        console.error('数据库连接失败:', err);
    } else {
        console.log('数据库连接成功');
    }
});

// 登录接口
// 'SELECT * FROM userList WHERE userName = ? AND passWord = ?'
app.post('/login', (req, res) => {
    const { username, password } = req.body; // 从请求体中获取用户名和密码
    if (!username || !password) {
      return res.status(400).json({ message: '用户名和密码不能为空' });
    }
    const sql = 'SELECT * FROM userList WHERE userName = ? AND passWord = ?';
    connectMql.query(sql, [username, password], (err, results) => {
      if (err) {
        res.status(500).send('登录失败');
      } else {
        if (results.length > 0) {
          res.json({ status: 'success', message: '登录成功', user: results[0] });
        } else {
          res.status(401).json({ message: '用户名或密码错误' });
        }
      }
    });
  });


// 处理/find路由
app.get('/find', (req, res) => {
  let sql = `SELECT * FROM ${userMql.test}`;
  connectMql.query(sql, (err, results) => {
    console.log('打印接口', results, err);
    if (err) {
      res.status(500).send('查询失败');
    } else {
      res.json(results);
    }
  });
});

// 处理/getUser路由
app.get('/getUser', (req, res) => {
  console.log('前端触发接口，路由是/getUser，执行代码是/getUser');
  res.json({ status: 'success', message: '进入获取用户接口，这里是用户信息表格' });
});

// 处理/editUser路由
app.post('/editUser', (req, res) => {
  console.log('前端触发接口，路由是/editUser，执行代码是/editUser');
  res.json({ status: 'success', message: '进入修改用户接口，获取的是修改成功的表格' });
});

// 处理其他路由
app.use((req, res) => {
  res.status(404).send('未找到该页面');
});

// 创建HTTP服务器并监听3000端口
const server = http.createServer(app); // 将app传递给http.createServer

server.listen(3000, () => {
  console.log('服务器在3000端口运行');
});
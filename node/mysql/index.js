// 入口启动文件
const express = require('express');   
const app = express();
const mysql = require('mysql')
const http = require('http');

const handleRoute = (route) => {
    
    switch (route) {
        case '/getUser':
            return (request, response) => {
                console.log(`前端触发接口，路由是${route}，执行代码是/getUser`);
                // 代码已执行后，返回前端的值
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ status: 'success', message: '进入获取用户接口，这里是用户信息表格' }));
            }
        case '/editUser':
            return (require, response) => {
                console.log(`前端触发接口，路由是${route}，执行代码是/editUser`);

                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ status: 'success', message: '进入修改用户接口，获取的是修改成功的表格' }));
            }
        default:
            return (request, response) => {
                //处理其他请求
                response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                response.end('未找到该页面')
            }
    }
}

const server = http.createServer((request, response) => {
    // 将请求的URL路径作为参数传递给handleRouter函数
    const handler = handleRoute(request.url);
    handler(request, response);
});

server.listen(3000, () => {
    console.log('服务器在3000端口运行');
})
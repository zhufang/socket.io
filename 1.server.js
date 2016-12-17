var express=require('express');
var path=require('path');
var app=express();

//当客户端访问'/'的时候，返回一个index.html文件
app.get('/',function (req,res) {
    //从当前路径出发向下找 找一个绝对路径
    res.sendFile(path.resolve('index.html'));//绝对路径
    //root: __dirname;当前文档下的路径 相对路径
   //res.sendFile('./index.html',{root:__dirname});//把一个文件发送给客户端
});

//app.listen(); 的原理  是一个请求监听函数 当访问浏览器的时候调用

//创建一个http服务器，把app传进去作为监听函数，当有请求到来的时候此函数
var server=require('http').createServer(app);
//因为我们的websocket服务器依赖http服务器，所以需要把server传进去
var io=require('socket.io')(server);
//websocket服务器监听客户端的请求，当有请求到来的时候执行回调函数，并为每个请求创建一个scoket实例
io.on('connection',function (socket) {
    //进入此函数就表示客户端已经连接成功了
   //监听客户端发过来的消息
    socket.on('message',function (message) {
     console.log(message);
        //服务器向客户端发消息
        socket.send('服务器确认:'+message);
    })
});
//当监听一个端口的时候，服务器才算真正启动成功
server.listen(8080);
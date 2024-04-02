const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path")


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

let users = {};
io.on('connection',(user)=>{
    // console.log("a user connected")
    // users['userId'] = user.id;
    user.on('new-user-jioned',function(name){
        console.log("a user connected",name);
        users[user.id] = name;
        user.broadcast.emit('user-joined',name)
    });
    user.on('send',function(massage){
        user.broadcast.emit('recieve',{massage:massage,name:users[user.id]});
    });
    user.on('disconnect',function(){
        console.log(`${users[user.id]} user disconnected`); 
    });
});
/*---------------------------------------------------------*/

/*---------------------------------------------------------*/
http.listen(3000,()=>{
    console.log("server is running on port 3000");
});


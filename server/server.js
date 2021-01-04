const express = require('express');
const path = require('path');
const pathToReactBuild = path.join(__dirname,'..','build')

const app = express();
//env vars
if(!process.env.NODE_ENV) require('dotenv').config()
//import db
require('./db/mongoose');
//import pusher
require('./db/pusher')

//MIDDLEWARE CUSTOM
app.use((req, res, next)=>{
    console.log("*********** NEW REQUEST ***************");
    console.log("request methods: ",req.method);
    console.log("req.originalUrl",req.originalUrl);
    console.log("authorization header: ", !req.headers.authorization ? 'NO AUTH HEADER': req.headers.authorization.substr(0,12));
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    next();
})
//MIDDLEWARE CUSTOM -END

//import routers
const userRouter = require('./routers/user');
const chatRouter = require('./routers/chat');
const adminRouter = require('./routers/admin');

//MIDDLEWARE PROVIDED BY EXPRESS - parse requests to json
//should run on all request
app.use(express.json());

//API use routers
app.use(userRouter);
app.use(chatRouter);
app.use(adminRouter);

//serve assets for frontend
app.use(express.static(pathToReactBuild));

//serve react app
app.get('*', (req,res, next)=>{
    res.sendFile(path.join(pathToReactBuild, 'index.html'))
})

const port = process.env.PORT || 4000;

app.listen(port, ()=>{
    console.log("server running on port " + port);
})

// Core functionality
const express = require('express')
const cors = require('cors')
// require('dotenv').config() 

// importing functionality from controller
const userClass = require('./src/userClass')
const actionClass = require('./src/actionOutcomeClass')
const jwt = require('./src/jwt.js');
const login = require('./controller/login')
const register = require('./controller/register')
const imageKit  = require('./controller/imagekit.js')

const port = process.env.PORT || 3000;
const app = express()

app.use(cors({origin: '*'}))

app.get('/imagekitauthentication',(req,res)=>{

})

app.get('/login',(req,res)=>{
    console.log("------Processing Login: Server step------")

    const user = new userClass.User(req.query);         // Filled
    const action = new actionClass.action("login");     // Empty            -> What you are going to return
    const jwtToken = new jwt.jwtObject();               // Empty

    login.checkLogin(user,action,jwtToken)
    .then(outcome=>{
        console.log('Final Outcome: ',action.getStatus())
        console.log("------Processing Login: End------")
        res.send(action.getStatus())
    })
})

app.get('/register',(req,res)=>{
    console.log("------Processing Register: Server step------")
    const user = new userClass.User(req.query);         // Filled
    const action = new actionClass.action("register");     // Empty            -> What you are going to return
    const jwtToken = new jwt.jwtObject();               // Empty

    // Tackle
    register.register(user,action,jwtToken)
    .then(respond=>{
        res.send(action.getStatus())
    })
})

app.get('/test',(req,res)=>{
    console.log("------Processing test: Server step------")
    console.log(req.query)
    res.send({outcome: "heeloing you have tested it"})
})

const data = {name: "marcus",photo: "something", email: "marcus@gmail.com"}

app.get('/profiledata',(req,res)=>{
    console.log("------Processing profile data: Server step------")
    console.log(req.query)
    res.send({
        action: "profile data",
        outcome: true,
        data: data
    })
})

app.get('/updateprofiledata',(req,res)=>{
    // I need the token, and I need to query
    // 1. Check token 
    // 2. Check 
    console.log(req.query)

    // assume token has been checked


    for (const key in req.query){
        if (key !== "token"){
            data[key] = req.query[key]
        }
    }

    res.send({
        action: "update profile data", 
        outcome: true,
        data: data
    })
})



app.listen(port,()=>{
    console.log(`Listening to port ${port}...`)
})

// Core functionality
console.log("-------RUNNING SERVER SCRIPT----------")
const express = require('express')
const cors = require('cors')
// require('dotenv').config() 

const database = require('./model/database.js')
const imageKit  = require('./controller/imagekit.js')
// // importing functionality from controller
// const userClass = require('./src/userClass.js')
// const actionClass = require('./src/actionOutcomeClass')
// const jwt = require('./src/jwt.js');
// const login = require('./controller/login')
// const register = require('./controller/register')


const port = process.env.PORT;
const app = express()

app.use(cors({origin: '*'}))

app.get('/',(req,res)=>{
    res.send({outcome: "Helllloooooo"})
})


app.get('/checkdatabase',(req,res)=>{
    database.checkData()
    .then(data=>{
        console.log(data.rows)
        res.send(data.rows)
    })
})


app.get('/imagekitauthentication',(req,res)=>{
    console.log("---------Processing imagekit authentication----------")
    const authenticationResult = imageKit.authentication();
    res.send(authenticationResult);
})

// app.get('/login',(req,res)=>{
//     console.log("------Processing Login: Server step------")

//     const user = new userClass.User(req.query);         // Filled
//     const action = new actionClass.action("login");     // Empty            -> What you are going to return
//     const jwtToken = new jwt.jwtObject();               // Empty

//     login.checkLogin(user,action,jwtToken)
//     .then(outcome=>{
//         console.log('Final Outcome: ',action.getStatus())
//         console.log("------Processing Login: End------")
//         res.send(action.getStatus())
//     })
// })

// app.get('/register',(req,res)=>{
//     console.log("------Processing Register: Server step------")
//     const user = new userClass.User(req.query);         // Filled
//     const action = new actionClass.action("register");     // Empty            -> What you are going to return
//     const jwtToken = new jwt.jwtObject();               // Empty

//     // Tackle
//     register.register(user,action,jwtToken)
//     .then(respond=>{
//         res.send(action.getStatus())
//     })
// })

app.get('/test',(req,res)=>{
    console.log("------Processing test: Server step------")
    console.log(req.query)
    res.send({outcome: "heeloing you have tested it"})
})

// const data = {name: "marcus",photo: "something", email: "marcus@gmail.com"}

// app.get('/profiledata',(req,res)=>{
//     console.log("------Processing profile data: Server step------")
//     console.log(req.query)
//     res.send({
//         action: "profile data",
//         outcome: true,
//         data: data
//     })
// })

// app.get('/updateprofiledata',(req,res)=>{
//     // I need the token, and I need to query
//     // 1. Check token 
//     // 2. Check 
//     console.log(req.query)

//     // assume token has been checked


//     for (const key in req.query){
//         if (key !== "token"){
//             data[key] = req.query[key]
//         }
//     }

//     res.send({
//         action: "update profile data", 
//         outcome: true,
//         data: data
//     })
// })



app.listen(port,()=>{
    console.log(`Listening to port ${port}...`)
})

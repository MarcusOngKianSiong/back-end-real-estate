// const userClass = require('./src/userClass')

// const something = new userClass.User({email: "something@gmail.com",password: "something"})

const database = require('./model/actions.js')
const register = require('./controller/register.js')

// database.insertData({email: "what@gmail.com",password: "what"})
// .then(res=>{
//     console.log(res)
// })
// .catch(error=>{
//     console.log(error)
// })

register.register({email: "what@gmail.com",password: "what"})

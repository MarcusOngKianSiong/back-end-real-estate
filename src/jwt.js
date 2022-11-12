const jwt = require('jsonwebtoken')
require('dotenv').config() 

class jwtObject{
    constructor(){
        this.jwtToken = null;
    }
    createJWTToken(userDetails){
        const jwtToken = jwt.sign({email: userDetails.email,password: userDetails.password},process.env.JWT_SECRET,{algorithm: process.env.ENCRYPTION_ALGO});
        this.jwtToken = jwtToken;
    }
    verifyJWTToken(token){
        let userDetails = null;
        try {
            userDetails = jwt.verify(token, process.env.JWT_SECRET)
        }catch(err){
            console.log(err)
            return false
        }
        return userDetails
    }
}

module.exports = {jwtObject}
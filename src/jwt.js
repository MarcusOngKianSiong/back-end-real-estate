const jwt = require('jsonwebtoken')
require('dotenv').config() 

const encryptionAlgo = process.env.ENCRYPTION_ALGO || 'HS256'
const JWT_SECRET = process.env.JWT_SECRET ||'dasifwefqqfiqbviubdsyvbsd'

class jwtObject{
    constructor(){
        this.jwtToken = null;
    }
    createJWTToken(id){
        const jwtToken = jwt.sign({id: id},JWT_SECRET,{algorithm: encryptionAlgo});
        this.jwtToken = jwtToken;
    }
    verifyJWTToken(token){
        let userDetails = null;
        try {
            userDetails = jwt.verify(token, JWT_SECRET)
        }catch(err){
            console.log(err)
            return false
        }
        return userDetails
    }
}

module.exports = {jwtObject}
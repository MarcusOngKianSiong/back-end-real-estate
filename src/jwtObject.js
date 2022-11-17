const jwt = require('jsonwebtoken')

const encryptionAlgo = process.env.ENCRYPTION_ALGO || 'HS256'
const JWT_SECRET = process.env.JWT_SECRET ||'dasifwefqqfiqbviubdsyvbsd'


class JWTObject{
    constructor(){
        this.jwtToken = null;
    }
    createJWTToken(id){
        const jwtToken = jwt.sign({id: id},JWT_SECRET,{algorithm: encryptionAlgo});
    }
    verifyJWTToken(token){
        let userId = null;
        try {
            userId = jwt.verify(token, JWT_SECRET);
        }catch(err){
            console.log(err)
            return false;
        }
        return userId;
    }
}

module.exports = {JWTObject}
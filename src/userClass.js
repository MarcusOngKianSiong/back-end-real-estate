// const jwt = require('./jwt.js')
const database = require('../model/actions.js')

class User{
    constructor(userDetails){
        this.email = userDetails.email
        this.password = userDetails.password
        this.primaryKey = null;

    }
    getEmail(){
        return this.email
    }
    getPassword(){
        return this.password
    }
    getEmailAndPassword(){
        return {
            email: this.email,
            password: this.password
        }
    }

    getPrimaryKey(){

    }
    
}

module.exports = {User}
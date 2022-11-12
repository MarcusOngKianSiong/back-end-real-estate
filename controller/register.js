const jwt = require('jsonwebtoken')
const database = require('../model/actions.js')
const { action } = require('../src/actionOutcomeClass.js')
const { jwtObject } = require('../src/jwt.js')

require('dotenv').config() 

const setSuccess = (userObject,actionObject,jwtObject) => {
    jwtObject.createJWTToken(userObject)
    actionObject.setSuccess(jwtObject.jwtToken)
}

const setFailure = (userObject,actionObject,jwtObject,message) => {
    actionObject.setFailure(message); 
}

const register = async (userObject,actionObject,jwtObject) => {
    // check if there is an already existing one in the records
    // If no -> create record + create token (DONE)
    await database.insertData(userObject)
    .then(res=>{
        // if it reaches this point, it means the registration is successful. 
        setSuccess(userObject,actionObject,jwtObject);
    })
    .catch(res=>{
        setFailure(userObject,actionObject,jwtObject,"account already exist");
    })
    return true;
}

module.exports = {register}


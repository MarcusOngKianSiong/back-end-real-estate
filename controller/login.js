const jwt = require('jsonwebtoken')
const database = require('../model/actions.js')
const { action } = require('../src/actionOutcomeClass.js')
require('dotenv').config() 

const successfulOutcome = (userObject,actionObject,jwtObject,outcome)=>{
    console.log("---------Processing Login: Controller step --> sub-step: processing successful outcome--------")
    
    jwtObject.createJWTToken(userObject.getEmailAndPassword())          // Create JWTToken
    actionObject.setSuccess(jwtObject.jwtToken);                              // Define success, JWTToken
}

const unsuccessfulOutcome = (userObject,actionObject,jwtObject,error) => {
    console.log("---------Processing Login: Controller step --> sub-step: processing unsuccessful outcome--------")
    actionObject.setFailure(error);                              // Define failure
}

const checkPasswordMatch = (object,userObject,actionObject,jwtObject) => {
    if(object.password === userObject.password){
        successfulOutcome(userObject,actionObject,jwtObject,)
    }else{
        unsuccessfulOutcome(userObject,actionObject,jwtObject,"Password does not match")
    }
}

const checkEmail = (accountList,userObject,actionObject,jwtObject) => {
    if(accountList.length!==0){
        checkPasswordMatch(accountList[0],userObject,actionObject,jwtObject);
    }else{
        unsuccessfulOutcome(userObject,actionObject,jwtObject,"account does not exist")
    }
}

const checkLogin = async (userObject,actionObject,jwtObject) => {
    // check with the database
    console.log("------Processing Login: controller step------")
    await database.checkData(userObject,actionObject)
    .then((outcome)=>{
        const accountList = outcome.rows;
        checkEmail(accountList,userObject,actionObject,jwtObject)
    })
    .catch(error=>{
        console.log(error)
        unsuccessfulOutcome(userObject,actionObject,jwtObject,"Something wrong with database request parameters");
    }) 
    return true
}

module.exports = {checkLogin}
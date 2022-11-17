const express = require('express');
const ImageKit = require('imagekit');
const database = require('../model/database.js')
const jwtObject = require('../src/jwtObject.js')

const router = express.Router();

const imagekit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/uhtx1amtt',
    publicKey: 'public_k0o7zbOkiFy8QSCxNMDgntAvLxg=',
    privateKey: 'private_aaCdEQaDC8kj1gIDzJsxxgnWeFE='
});

let id = null;

router.use((req,res,next)=>{
    console.log("ENTERING PROFILE DATA SCRIPT......")
    // How to process the token here?
    const token = req.query.token;
    
    const jwt = new jwtObject.JWTObject();
    const userID = jwt.verifyJWTToken(token)
    if(userID){
        id = userID;
        next()
    }else{
        res.send({outcome: false,reason: "token cannot be verified....."})
    }
    
})

router.get('/auth',(req,res)=>{
    var result = imagekit.getAuthenticationParameters();
    res.send(result);
})

router.get('/deleteProfileImage',(req,res)=>{
    console.log("DELETING PROFILE IMAGE.....")
    const fileId = req.query.fileId;
    imagekit.deleteFile(fileId,(err,result)=>{
        if(err){
            console.log(err)
            res.send({action: "deleteProfileImage",outcome: false})
        }else{
            console.log(result)
            res.send({action: "deleteProfileImage",outcome: true})
        }
    })
})

router.get('/getProfilePicture',(req,res)=>{
    console.log("GETTING PROFILE PICTURE.....")
    
    res.send({outcome: true, data: {fileId: '637509cee809dd54b096075f', filePath: 'ENTJ_Male_Rngu9OYs2.jpg'}})
})

router.get('/saveProfilePicture',(req,res)=>{
    console.log("SAVING PROFILE PICTURE......")
    const query = req.query;
    console.log(query);

    // Update profileImage datatable -> fileId, filePath
    

    // Remove the previous image from image kit -> previousProfilePictureId


})

router.get('/test',(req,res)=>{
    // res.send({outcome: "something here"})
    console.log("PROCESSING TEST STEP....")
    console.log("account ID: ",id)
    database.checkData()
    .then(respond=>{
        console.log("CHECKING: ",respond.rows)
        res.send(respond.rows)
    })
    
    // res.send({outcome: "testing profileData route"})
})

module.exports = router
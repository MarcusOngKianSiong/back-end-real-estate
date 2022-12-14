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
const defaultImageID = ''
router.use((req,res,next)=>{
    console.log("ENTERING PROFILE DATA SCRIPT......")
    // How to process the token here?
    const token = req.query.token;
    console.log("check token: ",token)
    const jwt = new jwtObject.JWTObject();
    const userID = jwt.verifyJWTToken(token);
    console.log("check userID: ",userID)
    if(userID){
        id = userID.id;
        next()
    }else{
        res.send({action: "token verification",outcome: false,reason: "token cannot be verified....."})
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
    database.getProfilePicture(id)
    .then(respond=>{
        const profileImageData = respond.rows
        if(profileImageData[0].fileid){
            res.send({outcome: true, data: {fileId: profileImageData[0].fileid, filePath: profileImageData[0].filepath}})        
        }else{
            res.send({outcome: true, data: {fileId: '637509cee809dd54b096075f', filePath: 'ENTJ_Male_Rngu9OYs2.jpg'}})
        }
    })
    .catch(err=>{
        console.log("ERROR IN GETTING PROFILE PICTURE DATA.....")
    })
    
})

router.get('/saveProfilePicture',(req,res)=>{
    console.log("SAVING PROFILE PICTURE......")
    const query = req.query;
    console.log(query);
    // Update database with the confirmed profile picture data
    database.updateProfilePictureData(query.fileId,query.filePath,id)
    .then(respond=>{
        console.log("UPDATED: ",respond)
        // Delete the previous profile picture if there is one
        if(query.previousProfilePictureId !== '637509cee809dd54b096075f'){
            imagekit.deleteFile(query.previousProfilePictureId)
        }
    })
    .then(err=>{
        console.log("Error in updating the profile image")
    })
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
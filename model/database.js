const {Client} = require('pg');

// --host=ec2-52-1-17-228.compute-1.amazonaws.com 
// --port=5432 
// --username=xpflcriillmvkv 
// --password 
// --dbname=d1rlatk18qeqg2 

const herokuPSQLClient = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

herokuPSQLClient.connect()


const checkData = async () => {
    console.log("------Checking data: Model step------");
    return await herokuPSQLClient.query(`select * from profileData;`);
}

const getProfilePicture = async (id) => {
    return await herokuPSQLClient.query(`select fileid,filepath from profileData where id = ${id};`)
}

const updateProfilePictureData = async (fileId,filePath,id) => {
    // How do you say to find a row with a specific id 
    // and update a specifc value in it?
    console.log("CHECKING WITHIN: ")
    console.log("fileId: ",fileId)
    console.log("filePath: ",filePath)
    console.log("id: ",typeof id)
    return await herokuPSQLClient.query(`update profileData set fileid = '${fileId}',filepath = '${filePath}' where id = ${id};`)
}

module.exports = {checkData,updateProfilePictureData,getProfilePicture}
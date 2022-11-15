const {Client} = require('pg');

// --host=ec2-52-1-17-228.compute-1.amazonaws.com 
// --port=5432 
// --username=xpflcriillmvkv 
// --password 
// --dbname=d1rlatk18qeqg2 

const herokuPSQLClient = new Client({
    host: "ec2-52-1-17-228.compute-1.amazonaws.com",
    user: "xpflcriillmvkv",
    port: "5432",
    password: "9ddaa18cc6e096002291d245f91dfd1c4098445bf6add7d181dc3ca81e2a3f2e",
    database: "d1rlatk18qeqg2"
})

herokuPSQLClient.connect()

const checkData = async () => {
    console.log("------Checking data: Model step------");
    return await herokuPSQLClient.query(`select * from users;'`);
}

module.exports = {checkData}
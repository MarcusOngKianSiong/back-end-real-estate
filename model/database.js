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
    return await herokuPSQLClient.query(`select * from users;`);
}

module.exports = {checkData}
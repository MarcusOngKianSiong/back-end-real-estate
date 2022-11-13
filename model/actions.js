const {Client} = require('pg');
const { action } = require('../src/actionOutcomeClass');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "",
    database: "accounts"
})

client.connect();

const checkData = async (userObject) => {
    console.log("------Checking data: Model step------")
    console.log(userObject.email)
    return await client.query(`select * from users where email = '${userObject.email}'`);
}

const insertData = async (userObject) => {
    console.log("------Insert data: Model step------")
    return await client.query(`insert into users (email,password) values ('${userObject.email}','${userObject.password}')`);
}

module.exports = {checkData,insertData}

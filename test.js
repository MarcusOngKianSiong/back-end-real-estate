const jwt = require('jsonwebtoken')

const encryptionAlgo = 'HS256'
const JWT_SECRET = 'dasifwefqqfiqbviubdsyvbsd'


const jwtToken = jwt.sign({id: 1},JWT_SECRET,{algorithm: encryptionAlgo});

console.log(jwtToken)

const unpacking = jwt.verify(jwtToken,JWT_SECRET)
console.log(unpacking)
// userDetails = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY4NjU3MDM0fQ.9DnuhysuNdwRZOBLmb1qtxF4_V5qH7h3ZG9dIVFAgiY', JWT_SECRET)
// console.log(userDetails)



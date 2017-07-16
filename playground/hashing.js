const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
   bcrypt.hash(password, salt, (err, hash) => {
      console.log(hash); 
   });
});

var hashedPassword = '$2a$10$1M4X6Gn2lShmF0fv2J0B3uKiRLWzwixMyjXa0qvUvO1HPeRwcKf1u';

bcrypt.compare(password, hashedPassword, (err, res) => {
   console.log(res); 
});

//var data = {
//    _id: 10
//};
//
//var token = jwt.sign(data, '123abc');
//console.log(token);
//
//var decoded = jwt.verify(token, '123abc');
//console.log('decoded', decoded._id);


//var message = 'I am user number 3';
//var hash = SHA256(message).toString();
////hashing is a one way algorithm, you can't go backwards
//
//console.log(`Message: ${message}`);
//console.log(`Hash: ${hash}`);
//
//var data = {
//    id: 4
//};
//
//var token = {
//    data: data,
//    hash: SHA256(JSON.stringify(data) + 'salting').toString()
//};
//
//token.data.id = 5;
//token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//var resultHash = SHA256(JSON.stringify(token.data)  + 'salting').toString();
//
//if(resultHash === token.hash) {
//    console.log('Data was not changed');
//}
//
//else {
//    console.log('Data was changed, do not trust');
//}


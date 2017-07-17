//User model
//email - require - trim it - set type (string) -set min length of 1

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: `{VALUE} is not a valid email`
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});


//automatically runs because it's called as built-in instance method
UserSchema.methods.toJSON = function() {
    var user = this;
    //converts to object
    var userObject = user.toObject();
    
    return _.pick(userObject, ['_id', 'email']);
};

//add instance methods
UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access: access}, process.env.JWT_SECRET).toString();
    
    user.tokens.push({
        access: access,
        token: token
    });
    
    return user.save().then(() => {
        //passed as value for next success from 'then'
        return token;
    });
};

//adds on to model

UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decode;
    
    try {
        decode = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {

    }
    
    //nested needs '  '
    return User.findOne({
        '_id': decode._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function(email, password) {
    var User = this;
    
    return User.findOne({
       email: email 
    }).then((user) => {
        if(!user){
            return Promise.reject();
        }
        
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if(res){
                    resolve(user);
                }
                
                else{
                    reject();
                }
            });
        });
    });
};

UserSchema.methods.removeToken = function(token){
    //pull lets you remove something from an array
    var user = this;
    return user.update({
        $pull: {
            tokens: {
                token: token
            }
        }
    });
};

//schema middleware to encrypt password before saving
UserSchema.pre('save', function(next){
    var user = this;
    //want to encrypt if password was modified (i.e. saved, changed, etc)
    
    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
               user.password = hash;
                next();
           });
        });
    }
    
    else{
        next();
    }
});



var User = mongoose.model('User', UserSchema);

//var User1 = new User({
//    email: 'kasukanraa@gmail.com '
//});
//
//User1.save().then((doc) => {
//    console.log('user saved', doc)
//}, (e) => {
//    console.log('unable to save user', e);
//}); 

module.exports = {
    User: User
};

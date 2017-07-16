//User model
//email - require - trim it - set type (string) -set min length of 1

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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
    var token = jwt.sign({_id: user._id.toHexString(), access: access}, 'h123').toString();
    
    user.tokens.push({
        access: access,
        token: token
    });
    
    return user.save().then(() => {
        //passed as value for next success from 'then'
        return token;
    });
};

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

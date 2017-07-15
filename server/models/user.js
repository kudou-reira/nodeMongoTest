//User model
//email - require - trim it - set type (string) -set min length of 1

var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    }
});

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

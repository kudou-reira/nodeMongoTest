const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '59699228cd40531cc84bee2e';

//59699228cd40531cc84bee2e

//if(!ObjectID.isValid(id)) {
//    console.log('ID not valid');
//}


//Todo.find({
//   _id: id 
//}).then((todos) => {
//    console.log('Todos', todos); 
//});
//
////get a single object
//Todo.findOne({
//    _id: id
//}).then((todo) =>  {
//    console.log('Todo find one', todo)
//});

//Todo.findById(id).then((todo) => {
//    if(!todo){
//        return console.log('Id not found');
//    }
//    console.log('Todo by Id', todo);
//}).catch((e) => console.log(e));

var id2= '5968dd738125362cc8ae09bc'

User.findById(id2).then((user) => {
    if(!user){
        return console.log('User not found');
    }
    
    console.log('user is', JSON.stringify(user, undefined, 2));
}, (e) =>  {
    console.log(e)
});
   

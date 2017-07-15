const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//todo.remove({}); removes all

//Todo.remove({}).then((results) => {
//   console.log(results); 
//});

Todo.findOneAndRemove({})

Todo.findByIdAndRemove('5969c3c70219adf8d83928f6').then((todo) => {
    console.log(todo);
});
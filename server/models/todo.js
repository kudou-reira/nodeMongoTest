var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

//var newTodo = new Todo({
//    text: 'Cook dinner'
//});

//var newTodo1 =  new Todo({
//    text: 'draft magic',
//    completed: true,
//    completedAt: 7
//});

//newTodo.save().then((doc) => {
//    console.log("saved to do", doc);
//}, (e) => {
//    console.log('unable to save todo');
//});

//var newTodo1 = new Todo({
//    text: ' edit this video   '
//});

//newTodo1.save().then((doc) => {
//    console.log("saved todo", doc);
//}, (e) => {
//   console.log('unable to save todo', e); 
//});

module.exports = {
    Todo: Todo
}
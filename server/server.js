var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();


//bind middleware
//body parser takes the entire body portion of an incoming request stream and exposes it on req.body
//reads and stores a form's input as a javascript object
app.use(bodyParser.json());

//create todos
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    
    todo.save().then((doc) => {
        //doc gives ID and stuff
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos: todos});
    }, (e) => {
        res.send(400).send(e);
    });
});

app.listen(3000, () => {
   console.log('Started on port 3000'); 
});

module.exports = {
    app: app
}


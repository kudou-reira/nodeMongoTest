var express = require('express');
var bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

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

app.get('/todos/:id', (req, res) => {
    //params key value pair with url and id
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    //returns 'todo'
    
    Todo.findById(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
        
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    Todo.findByIdAndRemove(id).then((doc) => {
        if(!doc){
            return res.status(404).send();
        }
        
        res.status(200).send(doc);
        
    }).catch((e) => {
       res.status(400).send() 
    });
});

app.listen(port, () => {
   console.log(`Started on port ${port}`); 
});

module.exports = {
    app: app
}


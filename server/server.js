var express = require('express');
var bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const {ObjectID} = require('mongodb');
const _ = require('lodash');

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
    
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        
        res.send({todo});
        
    }).catch((e) => {
       res.status(400).send() 
    });
});

app.patch('/todos/:id', (req, res) =>  {
    
    var id = req.params.id;
    //req.body is all of the things returned in one specific object called by id
    //_.pick takes an object, then the second argument is an array of things you want
    //then pulls off the array of properties and returns an object with the properties requested
    var body = _.pick(req.body, ['text', 'completed']);
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    //check if boolean
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }
    
    else {
        body.completed = false;
        //null removes an object
        body.completedAt = null;
    }
    
    //returnOriginal: false
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
   console.log(`Started on port ${port}`); 
});

module.exports = {
    app: app
}


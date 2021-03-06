require('./config/config');

var express = require('express');
var bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

const {ObjectID} = require('mongodb');
const _ = require('lodash');

var app = express();
const port = process.env.PORT;

//bind middleware
//body parser takes the entire body portion of an incoming request stream and exposes it on req.body
//reads and stores a form's input as a javascript object
app.use(bodyParser.json());



//create todos
app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    
    todo.save().then((doc) => {
        //doc gives ID and stuff
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos: todos});
    }, (e) => {
        res.send(400).send(e);
    });
});

app.get('/todos/:id', authenticate, (req, res) => {
    //params key value pair with url and id
    
    //authenticate middleware gets run at the very beginning of this
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    //returns 'todo'
    
    Todo.findOne({
            _id: id,
            _creator: req.user._id
        }).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
        
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id
        }).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        
        res.send({todo});
        
    }).catch((e) => {
       res.status(400).send() 
    });
});

app.patch('/todos/:id', authenticate, (req, res) =>  {
    
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
        //null removes an object...sort of
        body.completedAt = null;
    }
    
    //returnOriginal: false
    Todo.findOneAndUpdate({
            _id: id,
            _creator: req.user._id
        }, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.post('/users', (req, res) => {
    
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    //when new user created, gets a docs with ID and stuff
    user.save().then(() => {
        //doc gives ID and stuff
        return user.generateAuthToken();
    }).then((token) => {
        //'x-' makes custom header
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    
    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
//    res.send(body);
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`); 
});

module.exports = {
    app: app
}


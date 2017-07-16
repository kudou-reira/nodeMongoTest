const {ObjectID} = require('mongodb');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
    {
        _id: userOneId,
        email: 'kasuka@gmail.com',
        password: 'userOnePass',
        tokens: [
            {
                access: 'auth',
                token: jwt.sign({_id: userOneId, access: 'auth'}, 'h123').toString()
            }
        ]
    },
    {
        _id: userTwoId,
        email: 'kana@gmail.com',
        password: 'userTwoPass'
    }
];

const todos = [
    {
        _id: new ObjectID(),
        text: 'First test todo'
    }, 
    {
        _id: new ObjectID(),
        text: 'Second test todo',
        completed: true,
        completedAt: 123
    }
];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
       Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {
    todos: todos,
    populateTodos: populateTodos,
    users: users,
    populateUsers: populateUsers
}
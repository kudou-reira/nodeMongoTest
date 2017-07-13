//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        console.log('Unable to connect to databse server');
    }
    console.log('Connected to MongoDB server');
    
//    db.collection('Todos').find({
//            _id: new ObjectID('5966f366868e8744a0cb4425')
//        }).toArray().then((docs) => {
//        console.log('Todos');
//        console.log(JSON.stringify(docs, undefined, 2));
//    }, (err) => {
//        console.log('unable to fetch todos', err);
//    });
    
    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('unable to fetch todos', err);
    });
    
    db.collection('Users').find({name: 'kasuka'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('unable to fetch users', err);
    })
    
//    db.close();
});
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        console.log('Unable to connect to databse server');
    }
    console.log('Connected to MongoDB server');
    
//    db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
//       console.log(result); 
//    });
    
//    db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) =>  {
//        
//       console.log(result); 
//    });
    
    db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
        console.log(result);
    });
    
    db.collection('Users').deleteMany({name: 'jen'}).then((result) => {
        console.log(result);
    });
    
    db.collection('Users').findOneAndDelete({_id: new       ObjectID("5966f366868e8744a0cb4426")}).then((result) => {
        console.log(JSON.stringify(results, undefined, 2));
    });
    
//    db.close();
});
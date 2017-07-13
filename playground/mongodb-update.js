const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        console.log('Unable to connect to databse server');
    }
    console.log('Connected to MongoDB server');
    
//    db.collection('Todos').findOneAndUpdate({
//        _id: new ObjectID('5966fb36f7a440856a8ba452')
//    }, {
//        $set: {
//            completed: true
//        }
//    }, {
//        returnOriginal: false
//    }).then((result) => {
//        console.log(result);
//    });
    
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('59677b03f7a440856a8bbbec')
    },  {
        $set: {
            name: 'kudou'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
       console.log(result); 
    });
    
//    db.close();
});
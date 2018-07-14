const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017'; 
const dbName = 'angleone';
exports.dbAction = (action,collectionName,params,callback)=>{
    MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {   
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.action(params,(err,result)=>{           
            client.close();
            callback(err,result)
        });         
    }); 
}
exports.updateOne = (collectionName,params1,params2,callback)=>{
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) { 
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.updateOne(params1, params2, function(err, result) {           
            callback(result);
        });  
        client.close();
    }); 
}    
exports.find = (collectionName,params,callback)=>{
    MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {    
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.find(params).toArray(function(err, docs) {           
            client.close();
            callback(err,docs);
        });
    }); 
}
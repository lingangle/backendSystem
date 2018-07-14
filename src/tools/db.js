const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const url = 'mongodb://127.0.0.1:27017'; 
// Database Name
const dbName = 'angleone';

exports.ObjectId = ObjectId
exports.insertOne = (collectionName,params,callback)=>{
    MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {   
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.insertOne(params,(err,result)=>{           
            client.close();
            callback(err,result)
        });         
    }); 
}
exports.insertMany = (collectionName,params,callback)=>{
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {  
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.insertMany(params,(err,result)=>{           
            client.close();
            callback(err,result)
        }); 
        
    }); 
}

exports.findOne = (collectionName,params,callback)=>{
    MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {   
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.findOne(params,(err,doc)=>{
            client.close();
            callback(err,doc)
        })
        client.close();
    }); 
}
exports.updateOne = (collectionName,params1,params2,callback)=>{
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) { 
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.updateOne(params1, {$set: params2}, function(err, result) {           
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
exports.deleteOne = (collectionName,params,callback)=>{
    MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {   
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.deleteOne(params, function(err, result) {  
            client.close();         
            callback(result);
        }); 
    }); 
}

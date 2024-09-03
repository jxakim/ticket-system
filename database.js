const { MongoClient } = require('mongodb');

let dbConnection

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb+srv://admin:admintest@cluster.jzzsv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster')
            .then((client) => {
                dbConnection = client.db();
                return cb();
            }).catch(err => {
                console.log(err);
                return cb(err);
            });
    },
    getDb: () => dbConnection
};
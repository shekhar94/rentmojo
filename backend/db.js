
const MongoClient = require('mongodb').MongoClient;
const DB_URL = 'mongodb://localhost:27017/rentomojo';

exports.connectDb = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, function (err, db) {
            if (err) reject(err);
            else resolve(db.db('rentomojo'));
        });
    });
}


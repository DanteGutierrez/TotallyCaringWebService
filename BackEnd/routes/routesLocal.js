const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'test';
const db = client.db(dbName);

exports.index = (req, res) => {
    res.render('index', {
        title: "API Splash"
    }
    );
};

exports.api = async (req, res) => {
    data = [{ test: "one" }];
    res.JSON(data);
};
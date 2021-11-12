const cosmosPort = 10255;
const dbName = 'totally-caring-web-service';
const key = 'F4UX3UzubsvmqsgDt2ktYZZixdVtiXo5xf3TiUJulRvy8Qhts5wHM0SouYxvLW1jlyaAfccab4ox6A6e9bsSEg==';

var mongoClient = require("mongodb").MongoClient;
mongoClient.connect(`mongodb://${dbName}:${key}==@totally-caring-web-service.mongo.cosmos.azure.com:${cosmosPort}/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@totally-caring-web-service@`, function (err, db) {
  db.close();
});
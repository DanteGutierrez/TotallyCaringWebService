var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://totally-caring-web-service:F4UX3UzubsvmqsgDt2ktYZZixdVtiXo5xf3TiUJulRvy8Qhts5wHM0SouYxvLW1jlyaAfccab4ox6A6e9bsSEg==@totally-caring-web-service.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@totally-caring-web-service@", function (err, db) {
    
    db.close();
});
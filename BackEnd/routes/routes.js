const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://totally-caring-web-service:F4UX3UzubsvmqsgDt2ktYZZixdVtiXo5xf3TiUJulRvy8Qhts5wHM0SouYxvLW1jlyaAfccab4ox6A6e9bsSEg==@totally-caring-web-service.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@totally-caring-web-service@';
const client = new MongoClient(url);
const dbName = 'test';
const db = client.db(dbName);

const addObject = async (collectionName, object) => {
    let collection = db.collection(collectionName);
    await client.connect();
    let confirmation = await collection.insertOne(object);
    client.close();
    return confirmation;
}

const findOneObject = async (collectionName, query) => {
    let collection = db.collection(collectionName);
    await client.connect();
    let resultingData = await collection.findOne(query);
    client.close();
    return resultingData;
}

const updateOneObject = async (collectionName, query, updatedInformation) => {
    let collection = db.collection(collectionName);
    await client.connect();
    let confirmation = await collection.updateOne(query, updatedInformation);
    client.close();
    return confirmation;
};

const deleteOneObject = async (collectionName, query) => {
    let collection = db.collection(collectionName);
    await client.connect();
    let confirmation = await collection.deleteOne(query);
    client.close();
    return confirmation;
};

exports.index = (req, res) => {
    res.render('index', {
        title: "API Splash"
    }
    );
};

exports.addUserForm = (req, res) => {
    res.render('addUserForm', {
        title: "Add User"
    });
};

exports.editUserForm = async (req, res) => {
    let user;
    if (req.body == undefined) {
        user = await findOneObject("users", { _id: ObjectId(req.params.id) });
    }
    else {
        user = req.body;
    }
    res.render('editUserForm', {
        title: `Edit User`,
        user
    });
}

exports.deleteUserForm = async (req, res) => {
    let user;
    if (req.body == undefined) {
        user = await findOneObject("users", { _id: ObjectId(req.params.id) });
    }
    else {
        user = req.body;
    }
    res.render('deleteUserForm', {
        title: `Delete User`,
        user
    });
};

exports.processUser = async (req, res) => {
    let user = {};
    let result;
    switch (req.body._method) {
        case "POST":
            user = {
                firstname: req.body.firstname
            };
            result = await addObject("users", user);
            res.redirect(`/api/users/${result.insertedId.toString()}`);
            break;
        case "PUT":
            user = {
                firstname: req.body.firstname
            };
            result = await updateOneObject("users", { _id: ObjectId(req.params.id) }, { $set: user });
            res.redirect(`/api/users/${req.params.id}`);
            break;
        case "DELETE":
            result = await deleteOneObject("users", { _id: ObjectId(req.params.id) });
            res.redirect(`/api/addUser`);
            break;
        default:
            res.redirect(`/api/addUser`);
            break;
    }
    
};

exports.showUser = async (req, res) => {
    let result = await findOneObject("users", { _id: ObjectId(req.params.id) });
    res.json(result);
};
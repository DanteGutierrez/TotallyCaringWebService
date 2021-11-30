const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://totally-caring-web-service:F4UX3UzubsvmqsgDt2ktYZZixdVtiXo5xf3TiUJulRvy8Qhts5wHM0SouYxvLW1jlyaAfccab4ox6A6e9bsSEg==@totally-caring-web-service.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=240000&appName=@totally-caring-web-service@';
const client = new MongoClient(url);
const dbName = 'test';
const db = client.db(dbName);
const webURL = require('url');

const addObject = async (collectionName, object) => {
    let collection = db.collection(collectionName);
    await client.connect();
    let confirmation = await collection.insertOne(object);
    client.close();
    return confirmation;
};

const findOneObject = async (collectionName, query) => {
    let collection = db.collection(collectionName);
    await client.connect();
    let resultingData = await collection.findOne(query);
    client.close();
    return resultingData;
};

const findManyObjects = async (collectionName, query) => {
    let collection = db.collection(collectionName);
    await client.connect();
    let resultingData = await collection.find(query).toArray();
    client.close();
    return resultingData;
};

const updateOneObject = async (collectionName, query, updatedInformation) => {
    let collection = db.collection(collectionName);
    await client.connect();
    let confirmation = await collection.updateOne(query, updatedInformation);
    client.close();
    return confirmation;
};

const updateManyObjects = async (collectionName, query, updatedInformation) => {
    let collection = db.collection(collectionName);
    await client.connect();
    let confirmation = await collection.updateMany(query, updatedInformation);
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

const deleteManyObjects = async (collectionName, query) => {
    let collection = db.collection(collectionName);
    await client.connect();
    let confirmation = await collection.deleteMany(query);
    client.close();
    return confirmation;
};

const ISODateCreator = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let millisecond = date.getMilliseconds();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;
    millisecond = millisecond < 10 ? '00' + millisecond : millisecond < 100 ? '0' + millisecond : millisecond;
    return `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`;
}

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
    if (req.params.id.toString().length == 24) {
        if (req.body == undefined) {
        user = await findOneObject("users", { _id: ObjectId(req.params.id) });
    }
    else {
        user = req.body;
    }
    }
    
    if (user != null) {
        res.render('editUserForm', {
            title: `Edit User`,
            user
        });
    }
    else {
        res.redirect("/");
    }
};

exports.deleteUserForm = async (req, res) => {
    let user;
    if (req.params.id.toString().length == 24) {
        if (req.body == undefined) {
            user = await findOneObject("users", { _id: ObjectId(req.params.id) });
        }
        else {
            user = req.body;
        }
        if (user != null) {
            res.render('deleteUserForm', {
                title: `Delete User`,
                user
            });
        }
        else {
            res.redirect("/");
        }
    }
};

exports.processUser = async (req, res) => {
    let date = new Date(ISODateCreator());
    let user = {};
    let result;
    if (req.body._method != undefined) {
        switch (req.body._method) {
            case "POST":
                user = {
                    name: req.body.name,
                    email: req.body.email,
                    totalreviews: 0,
                    joindate: date,
                    password: req.body.password
                };
                result = await addObject("users", user);
                res.send(`https://${req.get('host')}/api/users/${result.insertedId.toString()}`)
                break;
            case "PUT":
                user = {
                    name: req.body.name,
                    password: req.body.password
                };
                result = await updateOneObject("users", { _id: ObjectId(req.params.id) }, { $set: user });
                res.send(`https://${req.get('host')}/api/users/${req.params.id}`)
                break;
            case "DELETE":
                result = await deleteOneObject("users", { _id: ObjectId(req.params.id) });
                res.redirect("/");
                break;
            default:
                res.redirect("/");
                break;
        }
    }
    else {
        user = {
            name: req.body.name,
            email: req.body.email,
            totalreviews: 0,
            joindate: date,
            password: req.body.password
        };
        result = await addObject("users", user);
        res.send(`https://${req.get('host')}/api/users/${result.insertedId.toString()}`)
    }
};

exports.updateUser = async (req, res) => {
    user = {
        name: req.body.name,
        password: req.body.password
    };
    result = await updateOneObject("users", { _id: ObjectId(req.params.id) }, { $set: user });
    res.send(`https://${req.get('host')}/api/users/${req.params.id}`);
};

exports.deleteUser = async (req, res) => {
    result = await deleteOneObject("users", { _id: ObjectId(req.params.id) });
    res.redirect("/");
}

exports.showUser = async (req, res) => {
    let result;
    if (req.params.id.toString().length == 24) {
        result = await findOneObject("users", { _id: ObjectId(req.params.id) });
    }
    else if (req.params.id == "search" && req.query != undefined) {
        let query = {}
        if (req.query.name != undefined) query.name = req.query.name;
        if (req.query.email != undefined) query.email = req.query.email;
        // if (req.query.totalreviews != undefined) query.totalreviews = req.query.totalreviews;
        // if (req.query.joindate != undefined) query.joindate = req.query.joindate;
        result = await findManyObjects("users", query);
    }
    if (result != null) {
        res.json(result);
    }
    else {
        res.redirect("/");
    }
};

exports.addReviewForm = (req, res) => {
    let restaurantid;
    let userid;
    if (req.query != undefined) {
        restaurantid = req.query.restaurantid;
        userid = req.query.userid;
    }
    if(restaurantid == null || userid == null) {
        res.redirect("/");
    }
    else {
        res.render("addReviewForm", {
            title: "Add Review",
            restaurantid,
            userid
        });
    }
};

exports.editReviewForm = async (req, res) => {
    let review;
    if (req.params.id.toString().length == 24) {
        if (req.body == undefined) {
            review = await findOneObject("reviews", { _id: ObjectId(req.params.id) });
        }
        else {
            review = req.body;
        }
        
    }
    if (review != null) {
        res.render('editReviewForm', {
            title: `Edit Review`,
            review
        });
    }
    else {
        res.redirect("/");
    }
};

exports.deleteReviewForm = async (req, res) => {
    let review;
    if (req.params.id.toString().length == 24) {
        if (req.body == undefined) {
            review = await findOneObject("reviews", { _id: ObjectId(req.params.id) });
        }
        else {
            review = req.body;
        }
        if (review != null) {
            res.render('deleteReviewForm', {
                title: `Delete Review`,
                review
            });
        }
        else {
            res.redirect("/");
        }
    }
}

exports.processReview = async (req, res) => {
    let date = new Date(ISODateCreator());
    let review = {};
    let result;
    if (req.body._method != undefined) {
        switch (req.body._method) {
            case "POST":
                review = {
                    restaurantid: req.body.restaurantid,
                    userid: ObjectId(req.body.userid),
                    comment: req.body.comment,
                    rating: req.body.rating,
                    creationdate: date,
                    editdate: date
                };
                result = await addObject("reviews", review);
                res.send(`https://${req.get('host')}/api/reviews/${result.insertedId.toString()}`);
                break;
            case "PUT":
                review = {
                    comment: req.body.comment,
                    rating: req.body.rating,
                    editdate: date
                };
                result = await updateOneObject("reviews", { _id: ObjectId(req.params.id) }, { $set: review });
                res.send(`https://${req.get('host')}/api/reviews/${req.params.id}`);
                break;
            case "DELETE":
                result = await deleteOneObject("reviews", { _id: ObjectId(req.params.id) });
                res.redirect("/");
                break;
            default:
                res.redirect("/");
                break;
        }
    }
    else {
        review = {
            restaurantid: req.body.restaurantid,
            userid: ObjectId(req.body.userid),
            comment: req.body.comment,
            rating: req.body.rating,
            creationdate: date,
            editdate: date
        };
        result = await addObject("reviews", review);
        res.send(`https://${req.get('host')}/api/reviews/${result.insertedId.toString()}`);
    }
};

exports.updateReview = async (req, res) => {
    review = {
        comment: req.body.comment,
        rating: req.body.rating,
        editdate: date
    };
    result = await updateOneObject("reviews", { _id: ObjectId(req.params.id) }, { $set: review });
    res.send(`https://${req.get('host')}/api/reviews/${req.params.id}`);
};

exports.deleteReview = async (req, res) => {
    result = await deleteOneObject("reviews", { _id: ObjectId(req.params.id) });
    res.redirect("/");
};

exports.showReview = async (req, res) => {
    let query = {};
    let review;
    if (req.params.id == "search" && req.query != undefined) {
        review = {};
        if (req.query.restaurantid != undefined) query.restaurantid = req.query.restaurantid;
        if (req.query.userid != undefined) query.userid = ObjectId(req.query.userid);
        review = await findManyObjects("reviews", query);
    }
    else if (req.params.id.toString().length == 24) {
        review = await findOneObject("reviews", {_id: ObjectId(req.params.id)});
    }
    if (review != null) {
        res.json(review);
    }
    else {
        res.redirect("/");
    }
}

const yelp = require('yelp-fusion');
const yelpApiKey = 'fFejzpfTjCerq_1Wowjvg9K5yZBAWEky9PZcpbnYZOM13YYyFPIlb3uJuocXk5HK4Ic_hEo-_biM_nf7ZFOl3bOaUZdA4FzgPIsohbUa8it1BWZfIzoiC8_5EtmKYXYx';
const yelpClient = yelp.client(yelpApiKey);

exports.yelpBusinessForm = (req, res) => {
    res.render('yelpBusinessForm');
}

exports.yelpBusinesses = async (req, res) => {
    let searchRequest = {};
    if (req.body.term != undefined) searchRequest.term = req.body.term;
    if (req.body.location != undefined) {
        searchRequest.location = req.body.location;
        let result = await yelpClient.search(searchRequest);
        res.json(result.jsonBody.businesses);
    } 
    else {
        res.redirect("/");
    }
}

exports.yelpReviewForm = (req, res) => {
    res.render('yelpReviewForm');
}

exports.yelpReviews = async (req, res) => {
    if (req.body.businessId != undefined) {
        let result = await yelpClient.reviews(req.body.businessId);
        res.json(result.jsonBody.reviews);
    }
    else {
        res.redirect("/");
    }
}
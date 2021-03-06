const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/routes');
const cors = require("cors");
const { urlencoded } = require('express');
const port = process.env.PORT || 8080

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     next();
// });

app.use(cors());

const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.get("/", routes.index);

//User Manipulation Forms
app.get("/addUser", routes.addUserForm);
//app.get("/editUser/:id", routes.editUserForm);
//app.get("/deleteUser/:id", routes.deleteUserForm);

//User CRUD
app.post("/api/users/:id", urlencodedParser, routes.processUser);
app.get("/api/users/:id", routes.showUser);
app.put("/api/users/:id", urlencodedParser, routes.updateUser);
//app.delete("/api/users/:id", routes.deleteUser);

app.post("/api/checklogin", urlencodedParser, routes.checkLogin);

//Review Manipulation Forms
app.get("/addReview", routes.addReviewForm);
//app.get("/editReview/:id", routes.editReviewForm);
//app.get("/deleteReview/:id", routes.deleteReviewForm);

//Review CRUD
app.post("/api/reviews/:id", urlencodedParser, routes.processReview);
app.get("/api/reviews/:id", routes.showReview);
//app.put("/api/reviews/:id", urlencodedParser, routes.updateReview);
//app.delete("/api/reviews/:id", routes.deleteReview);

//Favorites CRUD
app.post("/api/favorites/:id", urlencodedParser, routes.processFavorite);
app.get("/api/favorites/:id", routes.showFavorite);
//app.put("/api/favorites/:id", urlencodedParser, routes.updateFavorite);
app.delete("/api/favorites/:id", routes.deleteFavorite);


//Yelp passthrough
app.get("/yelp/getBusinesses", routes.yelpBusinessForm);
app.post("/yelp/businesses", urlencodedParser, routes.yelpBusinesses);
app.get("/yelp/getReviews", routes.yelpReviewForm);
app.post("/yelp/reviews", urlencodedParser, routes.yelpReviews);
app.post("/yelp/singlebusiness", urlencodedParser, routes.yelpSingleBusiness);


app.listen(port);
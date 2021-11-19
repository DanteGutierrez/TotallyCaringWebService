const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/routes'); 

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.get("/", routes.index);

//User Manipulation Forms
app.get("/api/addUser", routes.addUserForm);
app.get("/api/editUser/:id", routes.editUserForm);
app.get("/api/deleteUser/:id", routes.deleteUserForm);

//User CRUD
app.post("/api/users/:id", urlencodedParser, routes.processUser);
app.get("/api/users/:id", routes.showUser);
app.put("/api/users/:id", urlencodedParser, routes.updateUser);
app.delete("/api/users/:id", routes.deleteUser);

//Review Manipulation Forms
app.get("/api/addReview", routes.addReviewForm);
app.get("/api/editReview/:id", routes.editReviewForm);
app.get("/api/deleteReview/:id", routes.deleteReviewForm);

//Review CRUD
app.post("/api/reviews/:id", urlencodedParser, routes.processReview);
app.get("/api/reviews/:id", routes.showReview);
app.put("/api/reviews/:id", urlencodedParser, routes.updateReview);
app.delete("/api/reviews/:id", routes.deleteReview);

app.listen(8080);
const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/routes'); 

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));

const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.get("/", routes.index);
app.get("/api/addUser", routes.addUserForm);
app.get("/api/editUser/:id", routes.editUserForm);
app.get("/api/deleteUser/:id", routes.deleteUserForm);
app.post("/api/users/:id", urlencodedParser, routes.processUser);
app.get("/api/users/:id", routes.showUser);

app.listen(3000);
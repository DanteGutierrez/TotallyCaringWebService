const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080

const app = express();
app.use(express.static(path.join(__dirname,'build')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('build'));

    // Express serve up index.html file if it doesn't recognize route
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}
else {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

app.listen(port);
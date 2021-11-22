const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080

const app = express();
app.use(express.static(path.join(__dirname,'build')));


if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/manifest.json', (req, res) => {
    res.json("/build/manifest.json");
})

app.listen(port);
const path = require('path');
const express = require('express');
const cors = require('cors');
const route = require('./routers');
const db = require('./config/db');
// Connect to db
db.connect();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.json('Home');
});

// Routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

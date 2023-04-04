const path = require('path');
const express = require('express');
const cors = require('cors');
const route = require('./routers');
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/auth.router');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const FindMiddleware = require('./app/middlewares/FindMiddleware');
const UploadMiddleware = require('./app/middlewares/UploadMiddleware');
const AuthMiddleware = require('./app/middlewares/AuthMiddleware');
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

// Xác thực đăng nhập
app.use('/auth', authRouter);

// Middleware
app.use(cookieParser());
app.use(AuthMiddleware);
app.use(SortMiddleware);
app.use(FindMiddleware);
app.use(UploadMiddleware);

// app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.json('Home');
});

// Routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

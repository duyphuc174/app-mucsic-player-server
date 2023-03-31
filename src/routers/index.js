const accountRouter = require('./account.router');
const songRouter = require('./song.router');
const artistRouter = require('./artist.router');

function route(app) {
    app.use('/songs', songRouter);
    app.use('/artists', artistRouter);
    app.use('/account', accountRouter);
}

module.exports = route;

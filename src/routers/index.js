const accountRouter = require('./account.router');
const songRouter = require('./song.router');
const artistRouter = require('./artist.router');
const playlistRouter = require('./playlist.router');
const albumRouter = require('./album.router');

function route(app) {
    app.use('/songs', songRouter);
    app.use('/artists', artistRouter);
    app.use('/accounts', accountRouter);
    app.use('/playlists', playlistRouter);
    app.use('/albums', albumRouter);
}

module.exports = route;

module.exports = function FindMiddleware(req, res, next) {
    res.locals._find = {
        enabled: false,
        search: '',
    };

    if (req.query.hasOwnProperty('_find')) {
        Object.assign(res.locals._find, {
            enabled: true,
            search: req.query.search,
        });
    }

    next();
};

module.exports = function FindMiddleware(req, res, next) {
    res.locals._find = {
        enabled: false,
        keyword: '',
    };

    if (req.query.hasOwnProperty('_find')) {
        Object.assign(res.locals._find, {
            enabled: true,
            keyword: req.query.keyword,
        });
    }

    next();
};

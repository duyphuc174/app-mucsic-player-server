module.exports = {
    createQuery: function (req, Object) {
        let condition = {};
        if (req.query.hasOwnProperty('_find')) {
            condition.name = new RegExp(req.query.search, 'i');
        }
        let objectQuery = Object.find(condition);

        if (req.query.hasOwnProperty('_sort')) {
            objectQuery = objectQuery.sort({
                [req.query.column]: req.query.type,
            });
        }
        return objectQuery;
    },
};

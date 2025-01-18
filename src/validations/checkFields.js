const { expretions } = require('../utils/expretions');
const searchField = (req, key) => {
    if(req.query.hasOwnProperty(key)) return req.query[key];
    if(req.params.hasOwnProperty(key)) return req.params[key];
    if(req.body.hasOwnProperty(key)) return req.body[key];
    return null;
}
const checkField = (field, message, required=true) => {
    return (req, res, next) => {
        const searchResult = searchField(req, field);
        if(!required && !searchResult) return next();
        if(!searchResult) return res.status(500).json({message});
        if(!expretions[field].test(searchResult)) return res.status(500).json({message});
        next();
    }
}

module.exports = {
    checkField
}
require('dotenv').config();

const authentication = {
    JWT_SECRET : process.env.JWT_SECRET || 'acmucsd'
};

module.exports = {
    authentication
};
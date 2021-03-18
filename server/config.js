require('dotenv').config();

const authentication = {
    JWT_SECRET : process.env.JWT_SECRET || 'ACM_LION'
};

module.exports = {
    authentication
};
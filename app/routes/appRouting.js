module.exports = (app) => {
    var usersRoute = require('../controller/users.controller');

    app.use('/users', usersRoute);
}
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:pyKIU73e4O6xxdcI@cluster0.qewxk.mongodb.net/eventManagement?retryWrites=true&w=majority');
module.exports = { mongoose }
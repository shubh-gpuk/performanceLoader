const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Machine = new Schema({
    macAddr : String
});

module.exports = mongoose.model('Machine', Machine);
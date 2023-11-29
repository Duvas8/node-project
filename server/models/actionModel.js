const mongoose = require('mongoose');


const Schema = mongoose.Schema

const actionSchema = new Schema({
    id: Number,
    maxActions: Number,
    email: String,
    name: String,
    actionAllowed: Number,
    date: Date,
    status:String

}, { versionKey: false });

const Action = mongoose.model('actionLog', actionSchema, 'actionLogs');

module.exports = Action;
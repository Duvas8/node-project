const mongoose = require('mongoose');

const Schema = mongoose.Schema

const shiftSchema = new Schema({
  startingTime: Number,
  endingTime: Number,
  shiftDate: Date,
  shiftId: Number
}, { versionKey: false });

const Shift = mongoose.model('shift', shiftSchema);

module.exports = Shift;
const mongoose = require('mongoose');


const Schema = mongoose.Schema

const departmentSchema = new Schema({
  name: String,
  managerName: String,
  managerId: String,
}, { versionKey: false });

const Department = mongoose.model('department', departmentSchema);

module.exports = Department;
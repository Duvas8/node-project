const mongoose = require('mongoose');


const Schema = mongoose.Schema

const employeeSchema = new Schema({
  firstName: String,
  lastName: String,
  startWorkYear: Number,
  workingShifts: [{shiftId: String}],
  departmentId: String,
  employeeId: Number
});

const Employee = mongoose.model('employee', employeeSchema, 'employees');

module.exports = Employee;
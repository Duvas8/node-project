const Employee = require('../models/employeeModel');

const getAllEmployees = () => {
  return Employee.find({});
};

const getEmployeeById = (id) => {
  return Employee.findById({ _id: id });
};

const addEmployee = async (obj) => {
  const per = new Employee(obj);
  await per.save();
  return 'Created!';
};

const updateEmployee = async (id, obj) => {
  await Employee.findByIdAndUpdate(id, obj);
  return 'Updated!';
};

const deleteEmployee = async (id) => {
  await Employee.findByIdAndDelete(id);
  return 'Deleted!';
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee
};
const Department = require('../models/departmentModel');
const Shift = require('../models/shiftModel');
const Employee = require('../models/employeeModel');



const getEmployeeData = async () => {
  const allEmployees = [];
  const employeeDB = await Employee.find();
  const departmentsDB = await Department.find();
  const shiftDB = await Shift.find();

  for (const emp of employeeDB) {
    const obj = {
      id: emp.id,
      firstName: emp.firstName,
      lastName: emp.lastName,
      startWorkYear: emp.startWorkYear,
      workingShifts: [],
      departmentId: emp.departmentId,
      employeeId: emp.employeeId,
    };

    const departmentDB = departmentsDB.find((dep) => dep.id === obj.departmentId);
    obj.departmentName = departmentDB ? departmentDB.name : '';

    for (const shiftIdObj of emp.workingShifts) {
      const shiftId = shiftIdObj.shiftId;
      const shift = shiftDB.find((shif) => shif.id === shiftId);
      if (shift) {
        const shiftData = {
          shiftDate: shift.shiftDate,
          startingTime: shift.startingTime,
          endingTime: shift.endingTime,
        };
        obj.workingShifts.push(shiftData);
      }
    }

    allEmployees.push(obj);
  }
  console.log(allEmployees);
  return allEmployees
};

const getEmployeeById = async(id) => {
  const emp = await Employee.findById(id);
  return emp;
}

const addEmployee = async(obj) => {
  const emp = new Employee(obj);
  await emp.save();
  return 'Created!';
}

const addEmployeeToDepartment = async(id, obj) => {
  await Employee.findByIdAndUpdate(id, obj);
  return 'Updated!';
}

const updateEmployee = async(id, obj) => {
  await Employee.findByIdAndUpdate(id, obj);
  return 'Updated!';
}

const deleteEmployee = async(id) => {
  await Employee.findByIdAndDelete(id);
  return `Deleted Employee ${id}`
}
  
module.exports = {
  getEmployeeData,
  addEmployeeToDepartment,
  updateEmployee,
  addEmployee,
  getEmployeeById,
  deleteEmployee
};
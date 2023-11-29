const Department = require('../models/departmentModel');
const Employee = require('../models/employeeModel');




const getAllDepartmentsData = async () => {
  try {
    const allDepartments = [];
    const employeeDB = await Employee.find();
    const departmentsDB = await Department.find();

    for (const dep of departmentsDB) {
      const obj = {
        id: dep.id,
        name: dep.name,
        managerName:dep.managerName,
        managerId: dep.managerId,
        departmentEmployees: []
      };

      const departmentEmployees = employeeDB.filter((emp) => emp.departmentId === obj.id);
      
      for (const employee of departmentEmployees) {
        const employeeData = {
          id:employee.id,
          firstName: employee.firstName,
          lastName: employee.lastName
        };
        obj.departmentEmployees.push(employeeData);
      }

      allDepartments.push(obj);
    }
    console.log(allDepartments)
    return allDepartments;
  } catch (error) {
    console.error(error);
    throw error; // You might want to handle errors in a more appropriate way
  }
};






const getDepartmentById = (id) => {
  return Department.findById({ _id: id });
};

const addDepartment = async (obj) => {
  const dep = new Department(obj);
  await dep.save();
  return 'Created!';
};

const updateDepartment = async (id, obj) => {
  await Department.findByIdAndUpdate(id, obj);
  return 'Updated!';
};

const deleteDepartment =  async(id) => {
  await Department.findByIdAndDelete(id);
  return 'Deleted!';
};

module.exports = {
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  getAllDepartmentsData
};
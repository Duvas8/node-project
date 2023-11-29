const Shift = require('../models/shiftModel');
const Employee = require('../models/employeeModel');

const getAllShifts = () => {
  return Shift.find({});
};

const getAllShiftsData = async() => {
  const shifts = [];
  const shiftDB = await Shift.find();
  const employeeDB = await Employee.find();

  for (const shif of shiftDB) {
    const obj = {
      id: shif.id,
      shiftDate:shif.shiftDate,
      startingTime: shif.startingTime,
      endingTime: shif.endingTime,
      shiftId: shif.shiftId,
      employeeAllocated: []
    };
    for (const emp of employeeDB) {
      console.log(obj.id)
      console.log(emp.workingShifts)
      // Check if the employee has this shift in their workingEmployees array
      const hasShift = emp.workingShifts.some((shift) => shift.shiftId === obj.id);
      if (hasShift) {
          const empData = {
              firstName: emp.firstName,
              lastName: emp.lastName,
          };
          obj.employeeAllocated.push(empData);
      }
  }
     
    shifts.push(obj)
  }
  
  console.log(shifts);
  return shifts
};

const addShift = async (obj) => {
  const shif = new Shift(obj);
  await shif.save();
  return 'Created!';
};

const updateShift = async (id, obj) => {
  try {
    await Shift.findByIdAndUpdate(id, obj);
  return 'Updated!';
  } catch (error) {
    console.log(error)
  }
  
};


// const allocateEmployee = async (em)

module.exports = {
  getAllShifts,
  getAllShiftsData,
  // getShiftById,
  addShift,
  updateShift
  // deleteShift
};


// const getShiftById = (id) => {
//   return Shift.findById({ _id: id });
// };





// const deleteShift = async (id) => {
//   await Shift.findByIdAndDelete(id);
//   return 'Deleted!';
// };
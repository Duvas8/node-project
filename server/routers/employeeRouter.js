const express = require('express');
const employeesBLL = require('../BLL/employeesBLL');

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const employees = await employeesBLL.getAllEmployees();
    res.json(employees); // 200 - OK
  } catch (error) {
    res.json(error);
  }
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const employee = await employeesBLL.getEmployeeById(id);
  res.json(employee);
});

router.route('/').post(async (req, res) => {
  const obj = req.body;
  const result = await employeesBLL.addEmployee(obj);
  res.status(201).json(result);
});

router.route('/:id').patch(async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await employeesBLL.updateEmployee(id, obj);
    res.json(result);
  } catch (error) {
    res.status(500).json('There was an error!');
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const result = await employeesBLL.deleteEmployee(id);
  res.json(result);
});

module.exports = router;


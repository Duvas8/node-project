const express = require('express');
const departmentsBLL = require('../BLL/departmentsBLL');

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const departments = await departmentsBLL.getAllDepartmentsData();
    res.json(departments); // 200 - OK
  } catch (error) {
    res.json(error);
  }
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const department = await departmentsBLL.getDepartmentById(id);
  res.json(department);
});

router.route('/').post(async (req, res) => {
  try {
    const obj = req.body;
    const newDepartment = await departmentsBLL.addDepartment(obj);
    res.status(201).json(newDepartment);
  } catch (error) {
    console.log(error);
  }

});

router.route('/:id').put(async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await departmentsBLL.updateDepartment(id, obj);
    res.json(result);
  } catch (error) {
    res.status(500).json('There was an error!');
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
  const { id } = req.params;
  const result = await departmentsBLL.deleteDepartment(id);
  res.json(result);
  } catch (error) {
    res.json(error)
  }
  
});

module.exports = router;


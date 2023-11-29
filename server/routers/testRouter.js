const express = require('express');
const testBLL = require('../BLL/testBLL');

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
      const employeeData = await testBLL.getEmployeeData();
      res.json(employeeData); // 200 - OK
    } catch (error) {
      res.json(error);
    }
  });

  router.route('/:id').get(async (req, res) => {
    try {
      const { id } = req.params;
      const employeeData = await testBLL.getEmployeeById(id);
      res.json(employeeData); // 200 - OK
    } catch (error) {
      res.json(error);
    }
  });

  router.route('/:id').patch(async (req, res) => {
    try {
      const { id } = req.params;
      const obj = req.body;
      const newEmployee = await testBLL.addEmployeeToDepartment(id, obj)
      res.status(201).json(newEmployee);;
    } catch (error) {
      res.json(error);
    }
  })

  router.route('/:id').put(async (req, res) => {
    try {
      const { id } = req.params;
      const obj = req.body;
      const result = await testBLL.updateEmployee(id, obj);
      res.json(result);
    } catch (error) {
      res.status(500).json('There was an error!');
    }
  });

  router.route('/').post(async (req,res)=> {
    try {
      const obj = req.body;
      const result = await testBLL.addEmployee(obj);
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  })

  router.route('/:id').delete(async(req, res) => {
    try {
      const { id } = req.params;
      const result = await testBLL.deleteEmployee(id);
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  })

  module.exports = router;
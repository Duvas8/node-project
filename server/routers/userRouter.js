require('dotenv').config()
const express = require('express');
const userBLL = require('../BLL/usersBLL');
const authenticateToken =require('../middleware/verifyToken') 

const router = express.Router();





router.route('/').get(authenticateToken, async (req, res) => {
  try {
    const accessTokenPayload = req.accessTokenPayload;
    const userData = await userBLL.getUser(accessTokenPayload);

    if (userData) {
      res.json(userData); // 200 - OK
      
    } else {
      res.status(404).json({ message: 'User not found' });
    }
    console.log(userData);
  } catch (error) {
    res.json(error);
  }
});




  router.route('/').post(async (req,res)=> {
    try {
      const obj = req.body;
      const result = await userBLL.addUser(obj);
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  })

//   router.route('/:id').get(async (req, res) => {
//     try {
//       const { id } = req.params;
//       const employeeData = await userBLL.getEmployeeById(id);
//       res.json(employeeData); // 200 - OK
//     } catch (error) {
//       res.json(error);
//     }
//   });

//   router.route('/:id').patch(async (req, res) => {
//     try {
//       const { id } = req.params;
//       const obj = req.body;
//       const newEmployee = await userBLL.addEmployeeToDepartment(id, obj)
//       res.status(201).json(newEmployee);;
//     } catch (error) {
//       res.json(error);
//     }
//   })

//   router.route('/:id').put(async (req, res) => {
//     try {
//       const { id } = req.params;
//       const obj = req.body;
//       const result = await userBLL.updateEmployee(id, obj);
//       res.json(result);
//     } catch (error) {
//       res.status(500).json('There was an error!');
//     }
//   });

  

//   router.route('/:id').delete(async(req, res) => {
//     try {
//       const { id } = req.params;
//       const result = await userBLL.deleteEmployee(id);
//       res.json(result);
//     } catch (error) {
//       res.json(error);
//     }
//   })

  module.exports = router;
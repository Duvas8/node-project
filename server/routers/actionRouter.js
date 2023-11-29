const express = require('express');
const actionLogBLL = require('../BLL/actionLogBLL');

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
      const Actions = await actionLogBLL.getAllActions();
      res.json(Actions); // 200 - OK
    } catch (error) {
      res.json(error);
    }
  });


router.route('/').post(async (req, res) => {
    try {
      const obj = req.body;
      const result = await actionLogBLL.addAction(obj);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
    }
  
  });
  
  module.exports = router;
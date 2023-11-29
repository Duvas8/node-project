const express = require('express');
const shiftsBLL = require('../BLL/shiftsBLL');

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const shifts = await shiftsBLL.getAllShiftsData();
    res.json(shifts); // 200 - OK
  } catch (error) {
    res.json(error);
  }
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const shift = await shiftsBLL.getShiftById(id);
  res.json(shift);
});

router.route('/').post(async (req, res) => {
  const obj = req.body;
  const result = await shiftsBLL.addShift(obj);
  res.status(201).json(result);
});

router.route('/:id').put(async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await shiftsBLL.updateShift(id, obj);
    res.json(result);
  } catch (error) {
    res.status(500).json('There was an error!');
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const result = await shiftsBLL.deleteShift(id);
  res.json(result);
});

module.exports = router;


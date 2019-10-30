const express = require('express');
const router = express.Router();
const add = require('./add'); 
const edit = require('./edit');
const saveMeals = require('./save_meals');
const createNewMeal = require('./create_new_meal');
const saveMeasurement = require('./save_measurement');
const deleteMeasurement = require('./delete_measurement');

router.use('/add', add);
router.use('/edit', edit);
router.use('/saveMeals', saveMeals);
router.use('/createNewMeal', createNewMeal);
router.use('/saveMeasurement', saveMeasurement);
router.use('/deleteMeasurement', deleteMeasurement);

module.exports = router;

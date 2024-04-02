// Require needed modules
const express = require ('express'); 
const dataController = require('../controllers/dataController.js')

// Require controllers

const router = express.Router(); 

router.get('/user', dataController.getData, (req, res) => {
    // console.log("from response", res.locals.funcData); 
    res.status(200).json(res.locals.records); 

})

router.get('/data', dataController.getData,dataController.getRuns, (req, res) => {
    // console.log("from response", res.locals.funcData); 
    res.status(200).json(res.locals.runs); 

})

router.get('/period', dataController.getData,dataController.getPeriodData, (req, res) => {
    res.status(200).json(res.locals.weeklyLats); 

})

router.get('/comps', dataController.getData,dataController.getComparison, (req, res) => {
    res.status(200).json(res.locals.comparison); 

})

module.exports = router; 
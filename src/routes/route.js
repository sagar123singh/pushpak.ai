const express = require('express');
const router = express.Router();

const rateLimit=require('express-rate-limit')
const limiter=rateLimit({
    max:10,
    windowMs:60*1000
})

const vehicleController= require('../controller/vehicleController')
const violationController=require('../controller/violationController')

router.post('/createVehicleData',limiter,vehicleController.createVehicle)
router.get('/vehicleDetails',limiter,vehicleController.getVehicleDetails)
router.put('/upToDateVehicleDetails',limiter,vehicleController.updateVehicleDetails)
router.delete('/deleteVehicleDetails',limiter,vehicleController.deleteVehicleDetails)

//////////////////////-------------------violation api----------------------------/////////


router.post('/createViolationData',limiter,violationController.createViolationData)
router.get('/getViolationData',limiter,violationController.getViolationDetails)
router.put('/upToDateViolationDetails',limiter,violationController.updateViolationDetails)
router.delete('/deleteViolationDetails',limiter,violationController.deleteViolationDetails)


module.exports = router;
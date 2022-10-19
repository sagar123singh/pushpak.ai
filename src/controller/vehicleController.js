const vehicleModel= require('../models/vehicleModel')
const mongoose=require('mongoose')




const createVehicle=async(req,res)=>{
    try{
        const body =req.body;
            
        const requiredFields = ['licensePlateNumber', 'manufacturerName', 'model', 'fuelType', 'ownerName', 'rc_status','vehicleColor',];

        for (let i = 0; i < requiredFields.length; i++) {
            if (body[requiredFields[i]] === undefined) {
                return res.status(400).send({ status: false, message: `${requiredFields[i]} field is required` });
            }
            else if (body[requiredFields[i]] === "null" || body[requiredFields[i]] == '') {
                return res.status(400).send({ status: false, message: ` Please enter valid data` });
            }
        }

        if (!(/^([A-Z|a-z]{2}\s{1}\d{2}\s{1}[A-Z|a-z]{1,2}\s{1}\d{1,4})?([A-Z|a-z]{3}\s{1}\d{1,4})?$/).test(body.licensePlateNumber)) {
            return res.status(400).send({ status: false, message: 'Enter a valid plate number' });
        }

        let duplicateLicensePlateNumber = await vehicleModel.findOne({ licensePlateNumber: body.licensePlateNumber })
        if (duplicateLicensePlateNumber) {
            return res.status(400).send({ status: false, msg: "license plate already exists" })
        }
        

        let savedVehicleDetails = await vehicleModel.create(body);
        res.status(201).send({status: true, data: savedVehicleDetails})
    

    }catch(error){
        res.status(500).send({status:"server error",msg:error.message})
    }
}



const getVehicleDetails = async (req, res) => {
    try {
        const licensePlateNumber = req.query.licensePlateNumber;
        const VehicleData = await vehicleModel.find({ licensePlateNumber: licensePlateNumber});
        if (!VehicleData) {
            return res.status(404).send({ status: false,message: 'vehicle data is not present with this plateNumber'});
        }
        return res.status(200).send({status: true, message: 'vehicle details', data: VehicleData});

    } catch (err) {
        return res.status(500).send({status: false,message:'server error',error: err.message  });
    }
}



const updateVehicleDetails = async (req, res) => {
    try {
        const licensePlateNumber = req.query.licensePlateNumber;
        const body=req.body;

        const VehicleData = await vehicleModel.find({ licensePlateNumber: licensePlateNumber});
        if (!VehicleData) {
            return res.status(404).send({ status: false,message: 'vehicle data is not present with this plateNumber'});
        }
        

        if (!(/^([A-Z|a-z]{2}\s{1}\d{2}\s{1}[A-Z|a-z]{1,2}\s{1}\d{1,4})?([A-Z|a-z]{3}\s{1}\d{1,4})?$/).test(body.licensePlateNumber)) {
            return res.status(400).send({ status: false, message: 'Enter a valid plate number' });
        }

        

                 
        const requiredFields = ['licensePlateNumber', 'manufacturerName', 'model', 'fuelType', 'ownerName', 'rc_status','vehicleColor',];

        for (let i = 0; i < requiredFields.length; i++) {
            if (body[requiredFields[i]] === undefined) {
                return res.status(400).send({ status: false, message: `${requiredFields[i]} field is required` });
            }
            else if (body[requiredFields[i]] === "null" || body[requiredFields[i]] == '') {
                return res.status(400).send({ status: false, message: ` Please enter valid data` });
            }
        }

        const updateVehicleData = await vehicleModel.findOneAndUpdate(licensePlateNumber, body, { new: true });
        return res.status(200).send({status: true,message: 'field has been updated successfully !',data: updateVehicleData});
    

    } catch (err) {
        return res.status(500).send({status: false,message:'server error',error: err.message  });
    }
}


const deleteVehicleDetails = async (req, res) => {
    try {
        const licensePlateNumber = req.query.licensePlateNumber;
        const body=req.body;

        const VehicleData = await vehicleModel.find({ licensePlateNumber: licensePlateNumber});
        if (!VehicleData) {
            return res.status(404).send({ status: false,message: 'vehicle data is not present with this plateNumber'});
        }
        
        const deleteData = await vehicleModel.findOneAndUpdate({licensePlateNumber, isDeleted:false}, { isDeleted: true}, { new: true });
        return res.status(200).send({status: true,message: 'data deleted successfully !',data: deleteData});
    

    } catch (err) {
        return res.status(500).send({status: false,message:'server error',error: err.message  });
    }
}

module.exports.createVehicle=createVehicle
module.exports.getVehicleDetails=getVehicleDetails
module.exports.updateVehicleDetails=updateVehicleDetails
module.exports.deleteVehicleDetails=deleteVehicleDetails
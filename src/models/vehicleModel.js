const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    licensePlateNumber: {
        type:String,
        unique:true,
        trim:true,
        required:true
    },
manufacturerName:{
    type:String,
    trim:true,
    required:true
} ,
model:{
    type:Number,
    trim:true,
    required:true
} , 
fuelType: {
    type: String,
    trim: true,
    required: true,
    enum: ['petrol', 'diesel', 'electric']
},

ownerName: {
    type:String,
    trim:true,
    required:true
},
rc_status: {
    type: String,
    trim: true,
    required: true,
    enum: ['active', 'inactive']
},
vehicleColor: {
    type:String,
    trim:true,
    required:true
},
registrationDate: {

    type: String,
    required:true,
     default: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
},
insuranceUpto: {

    type: String,
    required:true,
    default: (new Date().getFullYear()+5) + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
   
},
fitnessUpto: {

    type: String,
    required:true,
    default:(new Date().getFullYear()+15) + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
},
roadTaxUpto: {

    type: String,
    required:true,
    default:(new Date().getFullYear()+15) + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()

},
isDeleted:{
    type:Boolean,
    default:false
},

})

module.exports = mongoose.model('Vehicle', vehicleSchema)


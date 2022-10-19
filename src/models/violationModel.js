const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const violationSchema = new mongoose.Schema({

    licensePlateNumber:{
        type: ObjectId,
        ref: 'Vehicle',
        required: true,
        trim:true
    },
violationType: {
    type:String,
    trim:true,
    required:true
},
status: {
    type: String,
    trim: true,
    required: true,
    enum: ['paid', 'unpaid']
},

date: {

    type: String,
    required:true,
     default: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
},
time:  {
    type: String,
    required:true,
     default: new Date().toLocaleTimeString(),
},
location: {
    type:String,
    required:true,
    trim:true
},
videoUrl: {
    type:String,
    required:true,
    trim:true
},
isDeleted:{
    type:Boolean,
    default:false
}
})

module.exports = mongoose.model('Violation', violationSchema )
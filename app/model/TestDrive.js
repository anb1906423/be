// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// const testDriveSchema = new Schema({
//     fullName: {
//         type: String,
//         required: true
//     },
//     phoneNumber: {
//         type: String,
//         required: true
//     },
//     created: {
//         type: Date,
//         default: Date.now()
//     },
//     modelInterest: {
//         type: String,
//     },
// })

// testDriveSchema.method("toJSON", function () {
//     const { __v, _id, ...object } = this.toObject()
//     object.id = _id
//     return object
// })

// module.exports = mongoose.model('TestDrive', testDriveSchema)
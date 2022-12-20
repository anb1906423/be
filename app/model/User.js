const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        // required: true
    },
    roles: {
        type: Number,
        required: true,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now()
    },
    modelInterest: {
        type: String,
    },
    isCash: {
        type: Boolean
    },
    refreshToken: [String],
})

userSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('User', userSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const priceTableSchema = new Schema({
    nameCar: {
        type: String,
        required: true,
    },
    srcCar: {
        type: String,
        required: true,
    },
    version: {
        type: [String],
    },
    price: {
        type: [String],
    }
})

priceTableSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('PriceTable', priceTableSchema)
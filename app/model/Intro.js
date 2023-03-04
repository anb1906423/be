const mongoose = require('mongoose');
const Schema = mongoose.Schema

const introSchema = new Schema({
    intro: {
        type: String,
        required: false,
    }
})

introSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('IntroTable', introSchema)
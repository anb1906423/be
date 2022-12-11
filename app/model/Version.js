const mongoose = require('mongoose');
const Schema = mongoose.Schema

const versionSchema = new Schema({
    version: {
        type: String,
    }
})

versionSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('Version', versionSchema)
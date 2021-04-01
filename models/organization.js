const mongoose = require('../db')
const Schema = mongoose.Schema;

const organizationSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: [2, 'Name is too short']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: 'user'
    },
    address: {
        country: {
            type: String,
            required: true,
            trim: true,
            default: 'United States',
            min: [2, 'Country is too short']
        },
        state: {
            type: String,
            required: true,
            trim: true,
            min: [2, 'state is too short']
        },
        street: {
            type: String,
            required: true,
            trim: true,
            min: [2, 'Address is too short']
        },
        zip: {
            type: String,
            required: true,
            trim: true,
            min: [5, 'Zip is too short'],
            max: [5, 'Zip is too long']
        }
    }

})


module.exports = mongoose.model('Organizations', organizationSchema)




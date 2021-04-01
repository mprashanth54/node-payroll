const mongoose = require('../db')
const Schema = mongoose.Schema;
const Organization = require('./organization')

const deductionSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: [2, 'Name is too short']
    },
    orgID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organizations',
        required: true
    },
    type: {
        type: String,
        enum: ['percent', 'flat'],
        required: true
    },
    value: {
        type: Number,
        min: 0,
        required: true
    }
})

deductionSchema.pre('save', async function (next) {

    const count = await Organization.count({ _id: this.orgID })

    if (count !== 1) throw `Cannot find organization`

    if (this.type === 'percent') {
        if (this.value > 100) throw `Value cannot be greater than 100`
    }
    next()
});


module.exports = mongoose.model('Deductions', deductionSchema)



const mongoose = require('../db')
const Schema = mongoose.Schema;
const Organization = require('./organization')
const Deductions = require('./deductions')

const employeeSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: [2, 'Name is too short']
    },
    empID: {
        type: String,
        required: true,
        trim: true,
        min: [2, 'Employee ID is too short']
    },
    orgID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organizations',
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        min: [2, 'Email is too short']
    },
    salary: {
        type: Number,
        min: 1,
        required: true
    },
    department: {
        type: String,
        min: [2, 'Department is too short'],
        required: true
    },
    deductions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'deductions'
        }
    ]
})

employeeSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
}, 'Enter Valid Email')


employeeSchema.pre('save', async function (next) {
    const count = await Organization.count({ _id: this.orgID })
    if (count !== 1) throw `Cannot find organization`

    const d_count = await Deductions.count({ _id: { $in: this.deductions } })
    if (this.deductions.length != d_count) throw `Invalid Deductions`
    next()
});

employeeSchema.index({ orgID: 1, email: 1 }, { unique: true })
employeeSchema.index({ orgID: 1, empID: 1 }, { unique: true })

const employees = mongoose.model('Employees', employeeSchema)



module.exports = employees
const Deductions = require('../models/deductions')
const { ObjectId } = require('mongoose').Types

exports.create = async (orgID, deduction) => {
    let n_deduction = new Deductions(deduction)
    n_deduction.orgID = orgID
    await n_deduction.save()
    return true
}


exports.get = async (orgID) => {
    return Deductions.find({ orgID })
}

exports.getById = async (orgID, id) => {
    return await Deductions.findOne({ orgID: orgID, _id: id })
}

exports.updateByID = async (orgID, id, deduction) => {
    let u_deduction = await Deductions.findOne({ _id: id, orgID: orgID })
    const { name, value, type } = deduction
    u_deduction.name = name
    u_deduction.type = type
    u_deduction.value = value
    await u_deduction.save()
}
require('dotenv').config()

const Organization = require('../models/organization')

exports.create = async (ownerID, data) => {
    const organization = await Organization.findOne({ owner: ownerID })
    if (organization) {
        organization.address = data.address
        organization.name = data.name
        await organization.save()
    } else {
        let newOrg = new Organization(data)
        newOrg.owner = ownerID
        await newOrg.save()
    }
}


exports.get = async (owner) => {
    return await Organization.findOne({ owner })
}
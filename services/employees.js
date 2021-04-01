const Employees = require('../models/employees')
const Organization = require('../models/organization')
const { ObjectId } = require('mongoose').Types

exports.create = async (orgID, employee) => {
    let n_employee = new Employees(employee)
    n_employee.orgID = orgID
    await n_employee.save()
}


exports.get = async (orgID) => {
    return Employees.find({ orgID })
}

exports.getById = async (orgID, id) => {
    return await Employees.findOne({ orgID: orgID, _id: id })
}


exports.getPayslipById = async (orgID, id) => {
    let [orgInfo, empInfo] = await Promise.all([
        Organization.findOne({ _id: orgID }),
        Employees.aggregate([
            { $match: { _id: ObjectId(id), orgID: ObjectId(orgID) } },
            {
                "$lookup": {
                    "from": "deductions",
                    "localField": "deductions",
                    "foreignField": "_id",
                    "as": "deductions"
                }
            }
        ])
    ])
    empInfo = empInfo[0]
    return {
        orgInfo, empInfo
    }


}


exports.updateByID = async (orgID, id, employee) => {
    let u_employee = await Employees.findOne({ _id: id, orgID: orgID })
    const { name, salary, department, deductions, email, empID } = employee
    u_employee.email = email
    u_employee.name = name
    u_employee.empID = empID
    u_employee.salary = salary
    u_employee.department = department
    u_employee.deductions = deductions
    await u_employee.save()
}


exports.updateExemptions = async (orgID, id, exemptions) => {
    let u_employee = await Employees.findOne({ _id: id, orgID: orgID })
    u_employee.exemptions = exemptions
    await u_employee.save()
}
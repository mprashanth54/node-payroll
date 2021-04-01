const router = require('express').Router()
const EmployeeService = require('../services/employees')

router.post('/', async (req, res) => {
    try {
        const { orgID } = req.user
        await EmployeeService.create(orgID, req.body)
        res.json({ message: "Success" })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Invalid Request' })
    }
})


router.get('/', async (req, res) => {
    try {
        const { orgID } = req.user
        const emplaoyees = await EmployeeService.get(orgID)
        res.json(emplaoyees)
    } catch (err) {
        res.status(400).json({ message: 'Invalid Request' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { orgID } = req.user
        const { id } = req.params
        const employee = await EmployeeService.getById(orgID, id)
        res.json(employee)
    } catch (err) {
        res.status(400).json({ message: 'Invalid Request' })
    }
})

router.get('/:id/payslip', async (req, res) => {
    try {
        const { orgID } = req.user
        const { id } = req.params
        const data = await EmployeeService.getPayslipById(orgID, id)
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Invalid Request' })
    }
})


router.put('/:id', async (req, res) => {
    try {
        const { orgID } = req.user
        const { id } = req.params
        await EmployeeService.updateByID(orgID, id, req.body)
        res.json({ message: "Updated Successfully" })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Invalid Request' })
    }
})


module.exports = router
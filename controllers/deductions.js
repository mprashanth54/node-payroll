const router = require('express').Router()
const DeductionService = require('../services/deductions')

router.post('/', async (req, res) => {
    try {
        const { orgID } = req.user
        await DeductionService.create(orgID, req.body)
        res.json({ message: "Success" })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Invalid Request' })
    }
})


router.get('/', async (req, res) => {
    try {
        const { orgID } = req.user
        const deductions = await DeductionService.get(orgID)
        res.json(deductions)
    } catch (err) {
        res.status(400).json({ message: 'Invalid Request' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { orgID } = req.user
        const { id } = req.params
        const deduction = await DeductionService.getById(orgID, id)
        res.json(deduction)
    } catch (err) {
        res.status(400).json({ message: 'Invalid Request' })
    }
})


router.put('/:id', async (req, res) => {
    try {
        const { orgID } = req.user
        const { id } = req.params
        await DeductionService.updateByID(orgID, id, req.body)
        res.json({ message: "Updated Successfully" })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Invalid Request' })
    }
})


module.exports = router
const router = require('express').Router()
const OrganizationService = require('../services/organization')

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const owner = req.user._id
        await OrganizationService.create(owner, data)
        res.json({ message: "Success" })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Invalid Request' })
    }
})


router.get('/', async (req, res) => {
    try {
        const owner = req.user._id
        const organization = await OrganizationService.get(owner)
        res.json(organization)
    } catch (err) {
        res.status(400).json({ message: 'Invalid Request' })
    }


})


module.exports = router
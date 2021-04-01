const router = require('express').Router()
const AuthService = require('../services/auth')

router.post('/login', async (req, res) => {
    try {
        const { body } = req
        const token = await AuthService.login(body)
        res.json({ token })
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' })
    }
})

router.get('/token-refresh', AuthService.verifyTokenForRefresh, async (req, res) => {
    try {
        const token = await AuthService.getJWTToken(req.user)
        res.json({ token })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Invalid Token' })
    }
})

module.exports = router
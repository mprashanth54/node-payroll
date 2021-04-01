require('dotenv').config()
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRET);
const User = require('../models/user')
const Organization = require('../models/organization')

exports.checkGoogleOauth = async (idToken) => {
    return await client.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    })
}

exports.getUser = async (payload) => {
    let user = await User.findOne({ email: payload.email })
    if (user == null) {
        user = User({
            first_name: payload.given_name,
            last_name: payload.family_name,
            email: payload.email
        })
        await user.save()
    }
    return user
}

exports.getJWTToken = async (payload) => {
    const user = await this.getUser(payload)
    const org = await Organization.findOne({ owner: user._id })
    let tokenData
    if (org) {
        tokenData = JSON.parse(JSON.stringify(user))
        tokenData['orgID'] = org._id
    } else {
        tokenData = user
    }
    return jwt.sign({
        data: tokenData
    }, process.env.JWT_SECRET, { expiresIn: '48h' })
}


exports.login = async (gData) => {
    try {
        const { payload } = await this.checkGoogleOauth(gData.idToken)
        const token = await this.getJWTToken(payload)
        return token
    } catch (err) {
        console.log(err)
        throw `Token verification failed`
    }

}


exports.verifyTokenForRefresh = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const verified = await jwt.verify(token, process.env.JWT_SECRET)
    if (verified) {
        const { data } = jwt.decode(token)
        req.user = data
        next()
    } else {
        res.status(400).json({ message: 'Invalid Token' })
    }
}
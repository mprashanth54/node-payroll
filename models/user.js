const mongoose = require('../db')
const Schema = mongoose.Schema;

const userSchema = Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
        min: [2, 'Name is too short']
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        min: [2, 'Name is too short']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        index: true
    }
})

userSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
}, 'Enter Valid Email')


const users = mongoose.model('Users', userSchema)



module.exports = users
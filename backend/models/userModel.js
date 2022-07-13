const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const validator = require('validator')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "please enter name"],
    },
    email: {
        type: String,
        require: [true, "please enter email"],
        unique: true,
        validate: [validator.isEmail, "please enter valid email"]
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "please enter 8 digit password"]
    }


})

// password Hashing
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// password check
userSchema.methods.comparePassword = async function (enteredPass) {
    return await bcrypt.compare(enteredPass, this.password);
}

// create jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}


module.exports = mongoose.model("User", userSchema);
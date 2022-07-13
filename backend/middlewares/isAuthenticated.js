const catchAsyncError = require('./catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');

const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler(500, "login to access this resource"))
    }

    // console.log(token)
    const data = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Users.findById(data.id)
    // console.log(req.user)

    next()

})

module.exports = isAuthenticated;
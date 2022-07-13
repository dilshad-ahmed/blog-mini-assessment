const catchAsyncError = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const Users = require('../models/userModel')


//register user & save token in cookie
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await Users.create({
        name, email, password
    })

    const token = await user.getJwtToken();

    options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false
    }

    res.status(200).cookie("token", token, options).json({
        success: true,
        user,
        token
    });

})

//login user & save token in cookie
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler(500, "please enter email and password"))
    }

    const user = await Users.findOne({ email })

    if (!user) {
        return next(new ErrorHandler(500, "user not found"))
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return next(new ErrorHandler(500, "email or password or not correct"))
    }

    const token = await user.getJwtToken();

    options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false
    }

    res.status(200).cookie("token", token, options).json({
        success: true,
        user,
        token
    });

})

//clear the cookie & logout user 
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, { expires: new Date(Date.now()) }).json({
        success: true,
        messages: "logout successfully"
    })
})

// login user details for load user
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await Users.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    })
})
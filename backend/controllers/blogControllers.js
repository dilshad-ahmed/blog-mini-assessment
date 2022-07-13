const catchAsyncError = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const Blogs = require('../models/blogModel')


//create Blog
exports.createBlog = catchAsyncError(async (req, res, next) => {

    req.body.createdBy = req.user._id

    const blog = await Blogs.create(req.body)

    res.status(201).json({
        success: true,
        blog
    });

})

// get all blogs
exports.getAllBlogs = catchAsyncError(async (req, res, next) => {

    const blogs = await Blogs.find().populate("createdBy", "name email");

    res.status(200).json({
        success: true,
        blogs
    });

})

// get Single blogs
exports.getSingleBlog = catchAsyncError(async (req, res, next) => {

    const blog = await Blogs.findById(req.params.id).populate("createdBy", "name email");
    if (!blog) { return next(new ErrorHandler(500, "blog not found")) }

    res.status(200).json({
        success: true,
        blog
    });

})

//update Blog

exports.updateBlog = catchAsyncError(async (req, res, next) => {
    const blog = await Blogs.findById(req.params.id);

    if (!blog) {
        return next(new ErrorHandler(500, "blogs not found"))
    }

    await Blogs.findByIdAndUpdate(req.params.id, req.body)

    res.status(200).json({
        success: true,
        message: "blog updated"
    })
})

// delete Blog 
exports.deleteBlog = catchAsyncError(async (req, res, next) => {

    const blog = await Blogs.findById(req.params.id);
    if (!blog) {
        return next(new ErrorHandler(500, "blogs not found"))
    }

    await blog.remove();

    res.status(200).json({
        success: true,
        message: "blog deleted successfully"
    })
})


// Like Blog  & cant Like who created the blog
exports.likeBlog = catchAsyncError(async (req, res, next) => {
    const userId = req.user._id;

    const blog = await Blogs.findById(req.body.BlogId);
    if (!blog) {
        return next(new ErrorHandler(500, "blogs not found"))
    }

    if (blog.createdBy.toString() === userId.toString()) {
        return next(new ErrorHandler(500, " you cant Like your own post"))
    }

    console.log(blog.likes);
    if (blog.likes.includes(userId)) {
        // return next(new ErrorHandler(500, " you already likes this post"))
        await Blogs.findByIdAndUpdate(req.body.BlogId, {
            $pull: { likes: userId }
        }, {
            new: true
        });

        res.json({
            success: true,
            message: "successfully Unliked"
        })

    } else {
        await Blogs.findByIdAndUpdate(req.body.BlogId, {
            $push: { likes: userId }
        }, {
            new: true
        });
        res.json({
            success: true,
            message: "successfully Liked"
        })
    }



})


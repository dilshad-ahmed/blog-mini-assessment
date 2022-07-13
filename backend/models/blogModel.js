const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "please enter title"],
    },
    description: {
        type: String,
        require: [true, "please enter description"],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    createdBy: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    }


})

module.exports = mongoose.model("Blog", blogSchema);
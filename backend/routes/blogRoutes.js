const express = require('express');
const { createBlog, getAllBlogs, getSingleBlog, updateBlog, deleteBlog, likeBlog, unlikeBlog } = require('../controllers/blogControllers');
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');

router.route("/blog/new").post(isAuthenticated, createBlog);
router.route("/blogs").get(getAllBlogs);
router.route("/blog/:id").get(getSingleBlog);
router.route("/blog/:id").put(isAuthenticated, updateBlog);
router.route("/blog/:id").delete(isAuthenticated, deleteBlog);

router.route("/like").put(isAuthenticated, likeBlog);

module.exports = router;
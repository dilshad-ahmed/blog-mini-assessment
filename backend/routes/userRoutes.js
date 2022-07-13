const express = require('express');
const { registerUser, loginUser, logoutUser, getUserDetails } = require('../controllers/userControllers');
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/loaduser").get(isAuthenticated, getUserDetails);


// router.route("/blog/new").post(createBlog);
// router.route("/blogs").get(getAllBlogs);
// router.route("/blog/:id").get(getSingleBlog);
// router.route("/blog/:id").put(updateBlog);
// router.route("/blog/:id").delete(deleteBlog);

module.exports = router;
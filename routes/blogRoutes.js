const express = require('express');
const { getBlogs, createBlog, getBlogById, getBlogsByAuthor, getBlogsByTitle, updateBlog } = require('../controllers/blogController');

// express router
const router = express.Router();

router.get('/', getBlogs);
router.get('/blog/:id', getBlogById);
router.get('/search_by_author',getBlogsByAuthor);
router.get('/search_by_title',getBlogsByTitle);
router.post('/create_blog', createBlog);
router.put("/update_blog/:id", updateBlog);

module.exports = router;
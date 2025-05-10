const router = require('express').Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  createBlog, getBlogs, getBlog, updateBlog, deleteBlog
} = require('../controllers/blogController');

router.route('/')
  .get(getBlogs)
  .post(protect, createBlog);

router.route('/:id')
  .get(getBlog)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

module.exports = router;

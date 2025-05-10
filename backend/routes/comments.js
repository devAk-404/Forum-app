// const router = require('express').Router();
const router = require('express').Router({ mergeParams: true });
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  getComments, postComment, deleteComment
} = require('../controllers/commentsController');

router.route('/')
  .get(getComments)
  .post(protect, postComment);

router.route('/:commentId')
  .delete(protect, deleteComment);

module.exports = router;

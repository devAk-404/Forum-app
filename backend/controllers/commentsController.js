const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Helper function to build nested comments
const buildNestedComments = (comments, parentId = null) => {
  return comments
    .filter(comment => comment.parentId === parentId)
    .map(comment => ({
      ...comment,
      replies: buildNestedComments(comments, comment.id),
    }));
};

// GET /api/blogs/:blogId/comments
exports.getComments = async (req, res) => {
  const { blogId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { blogId: Number(blogId) },
      include: {
        user: { select: { username: true } },
      },
    });

    const nestedComments = buildNestedComments(comments);
    res.json(nestedComments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
};

// POST /api/blogs/:blogId/comments
exports.postComment = async (req, res) => {
  const { blogId } = req.params;
  const { userId, content, parentId = null } = req.body;

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        parentId,
        blogId: Number(blogId),
        userId: Number(userId),
      },
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ message: 'Failed to post comment' });
  }
};

// DELETE /api/blogs/:blogId/comments/:id
// exports.deleteComment = async (req, res) => {
//   const { id } = req.params;
//   const { userId } = req.body;

//   try {
//     const comment = await prisma.comment.findUnique({
//       where: { id: Number(id) },
//     });

//     if (!comment) {
//       return res.status(404).json({ message: 'Comment not found' });
//     }

//     if (comment.userId !== Number(userId)) {
//       return res.status(403).json({ message: 'Unauthorized to delete this comment' });
//     }

//     await prisma.comment.delete({
//       where: { id: Number(id) },
//     });

//     res.sendStatus(204);
//   } catch (error) {
//     console.error('Error deleting comment:', error);
//     res.status(500).json({ message: 'Failed to delete comment' });
//   }
// };

exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user.id;

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(commentId) },
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId !== Number(userId)) {
      return res.status(403).json({ message: 'Unauthorized to delete this comment' });
    }

    await prisma.comment.delete({
      where: { id: Number(commentId) },
    });

    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Failed to delete comment' });
  }
};


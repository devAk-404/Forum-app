const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createBlog = async (req, res) => {
  try {
    const blog = await prisma.blog.create({
      data: {
        ...req.body,
        createdBy: { connect: { id: req.user.id } },
      },
    });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error creating blog', error: err.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        createdBy: {
          select: { username: true },
        },
      },
    });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs', error: err.message });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        createdBy: {
          select: { username: true },
        },
      },
    });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blog', error: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await prisma.blog.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error updating blog', error: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await prisma.blog.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blog', error: err.message });
  }
};

import express from 'express';
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';

const router = express.Router();

// Routes
router.post('/createBlog', createBlog);
router.get('/getAllBlog', getAllBlogs);
router.get('/getOneBlog/:id', getBlogById);
router.put('/updateBlog/:id', updateBlog);
router.delete('/deleteBlog/:id', deleteBlog);

export default router;

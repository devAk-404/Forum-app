// services/commentService.js
import api from './api';

export const getComments = (blogId) =>
  api.get(`/blogs/${blogId}/comments`).then(res => res.data);

export const postComment = (blogId, commentData, token) =>
  api.post(`/blogs/${blogId}/comments`, commentData, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);

export const deleteComment = (blogId, commentId, userId, token) =>
  api.delete(`/blogs/${blogId}/comments/${commentId}`, {
    data: { userId },
    headers: { Authorization: `Bearer ${token}` },
  });

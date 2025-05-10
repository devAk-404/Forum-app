import api from "./api";
export const getBlogs = () => api.get("/blogs").then((res) => res.data);
export const getBlog = (id) => api.get(`/blogs/${id}`).then((res) => res.data);
export const createBlog = (data, token) =>
  api
    .post("/blogs", data, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

export const updateBlog = (id, data, token) =>
  api
    .put(`/blogs/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

export const deleteBlog = (id, token) =>
  api
    .delete(`/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

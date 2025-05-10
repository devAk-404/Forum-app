import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBlog, getBlog, updateBlog } from '../services/blogService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

export default function BlogForm() {
  const { token } = useAuth();
  const { id } = useParams(); // blog id if editing
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    if (id) {
      getBlog(id)
        .then(data => setForm({ title: data.title, content: data.content }))
        .catch(() => toast.error('Failed to fetch blog'));
    }
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (id) {
        await updateBlog(id, form, token);
        toast.success('Blog updated');
        navigate(`/blog/${id}`);
      } else {
        await createBlog(form, token);
        toast.success('Blog created');
        navigate('/blogs');
      }
      setForm({ title: '', content: '' });
    } catch {
      toast.error(id ? 'Update failed' : 'Create failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-roboto">
      <input
        className="w-full p-2 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white"
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white"
        placeholder="Content"
        rows="6"
        value={form.content}
        onChange={e => setForm({ ...form, content: e.target.value })}
      />
      <button type="submit" className="bg-sky-600 text-white px-4 py-2 rounded">
        {id ? 'Update' : 'Create'}
      </button>
    </form>
  );
}

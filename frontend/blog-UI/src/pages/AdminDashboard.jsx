import BlogForm from '../components/BlogForm';

export default function AdminDashboard() {
  return (
    <div className="bg-gradient-to-br from-gray-200 to-blue-50 shadow-md hover:shadow-xl max-w-xl mx-auto mt-10 p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Create New Forum</h2>
      <BlogForm />
    </div>
  );
}

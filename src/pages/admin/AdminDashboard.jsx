import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../../lib/firebase';

function formatDate(ts) {
  if (!ts) return '—';
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }

  async function handleDelete(id, title) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await deleteDoc(doc(db, 'posts', id));
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  async function handleSignOut() {
    await signOut(auth);
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Blog Posts</h1>
          <p className="text-xs text-gray-400">Rose Portfolio Admin</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/posts/new"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all"
          >
            + New Post
          </Link>
          <button
            onClick={handleSignOut}
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {loading && <p className="text-gray-400 text-sm">Loading posts…</p>}

        {!loading && posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">📝</p>
            <p className="text-gray-500 mb-4">No posts yet.</p>
            <Link
              to="/admin/posts/new"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-5 py-2 rounded-lg text-sm font-semibold"
            >
              Write your first post
            </Link>
          </div>
        )}

        {!loading && posts.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Published</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900 max-w-xs truncate">
                      {post.title}
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">
                      {post.category || '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                      {formatDate(post.publishedAt)}
                    </td>
                    <td className="px-4 py-3">
                      {post.published ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <Link
                        to={`/admin/posts/${post.id}/edit`}
                        className="text-orange-500 hover:text-orange-600 font-medium mr-4 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="text-red-400 hover:text-red-600 font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

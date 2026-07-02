import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

function formatDate(ts) {
  if (!ts) return '';
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      where('published', '==', true),
      orderBy('publishedAt', 'desc')
    );
    getDocs(q).then((snap) => {
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Blog</h1>
        <p className="mt-2 text-gray-500">Financial tips, market insights, and planning guides from Roselyn.</p>
      </div>

      {loading && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-xl border border-gray-100 overflow-hidden animate-pulse">
              <div className="bg-gray-200 h-48 w-full" />
              <div className="p-4 space-y-3">
                <div className="bg-gray-200 h-3 w-1/4 rounded" />
                <div className="bg-gray-200 h-5 w-3/4 rounded" />
                <div className="bg-gray-200 h-3 w-full rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">📝</p>
          <p className="text-lg font-medium text-gray-500">No posts yet — check back soon!</p>
        </div>
      )}

      {!loading && posts.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col"
            >
              {post.coverImageUrl ? (
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center text-4xl">
                  📰
                </div>
              )}
              <div className="p-5 flex flex-col flex-1">
                {post.category && (
                  <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
                    {post.category}
                  </span>
                )}
                <h2 className="font-bold text-lg text-gray-900 mt-1 group-hover:text-orange-500 transition-colors leading-snug">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2 flex-1">{post.excerpt}</p>
                )}
                <p className="text-xs text-gray-400 mt-3">{formatDate(post.publishedAt)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

function formatDate(ts) {
  if (!ts) return '';
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      where('slug', '==', slug),
      where('published', '==', true),
      limit(1)
    );
    getDocs(q).then((snap) => {
      if (snap.empty) {
        setNotFound(true);
      } else {
        setPost({ id: snap.docs[0].id, ...snap.docs[0].data() });
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12 animate-pulse space-y-4">
        <div className="bg-gray-200 h-8 w-2/3 rounded" />
        <div className="bg-gray-200 h-4 w-1/4 rounded" />
        <div className="bg-gray-200 h-64 rounded-xl" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((n) => <div key={n} className="bg-gray-200 h-4 rounded" />)}
        </div>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">🔍</p>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Post not found</h1>
        <p className="text-gray-500 mb-6">This post may have been removed or the link is incorrect.</p>
        <Link to="/blog" className="text-orange-500 font-semibold hover:underline">← Back to Blog</Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link to="/blog" className="text-sm text-orange-500 font-medium hover:underline">← Back to Blog</Link>

      <article className="mt-6">
        {post.category && (
          <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
            {post.category}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 leading-tight">{post.title}</h1>
        <p className="text-gray-400 text-sm mt-2">{formatDate(post.publishedAt)}</p>

        {post.coverImageUrl && (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full rounded-xl mt-6 object-cover max-h-96"
          />
        )}

        <div
          className="prose prose-orange max-w-none mt-8"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </article>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <Link to="/blog" className="text-sm text-orange-500 font-medium hover:underline">← Back to Blog</Link>
      </div>
    </main>
  );
}

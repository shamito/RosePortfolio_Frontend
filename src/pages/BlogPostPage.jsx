import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

const SITE_URL = 'https://roseadanza.vercel.app';
const DEFAULT_IMAGE = `${SITE_URL}/assets/img/Rose_Photo.png`;

function formatDate(ts) {
  if (!ts) return '';
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

function ShareButtons({ title }) {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  function openShare(shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=500,noopener,noreferrer');
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement('textarea');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      // user cancelled or not supported — do nothing
    }
  }

  const buttons = [
    {
      label: 'Facebook',
      color: 'hover:bg-[#1877F2] hover:text-white',
      border: 'border-[#1877F2] text-[#1877F2]',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
        </svg>
      ),
      onClick: () => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`),
    },
    {
      label: 'WhatsApp',
      color: 'hover:bg-[#25D366] hover:text-white',
      border: 'border-[#25D366] text-[#25D366]',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      onClick: () => openShare(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`),
    },
    {
      label: 'X',
      color: 'hover:bg-black hover:text-white',
      border: 'border-black text-black',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      onClick: () => openShare(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`),
    },
    {
      label: 'LinkedIn',
      color: 'hover:bg-[#0A66C2] hover:text-white',
      border: 'border-[#0A66C2] text-[#0A66C2]',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      onClick: () => openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`),
    },
  ];

  return (
    <div className="mt-10 pt-8 border-t border-gray-100">
      <p className="text-sm font-semibold text-gray-500 mb-3">Share this article</p>
      <div className="flex flex-wrap gap-2">
        {/* Native share on mobile if supported */}
        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            onClick={nativeShare}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        )}

        {buttons.map(({ label, color, border, icon, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${border} ${color}`}
          >
            {icon}
            {label}
          </button>
        ))}

        <button
          onClick={copyLink}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Copy link
            </>
          )}
        </button>
      </div>
    </div>
  );
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

  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = post.coverImageUrl || DEFAULT_IMAGE;

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Helmet>
        <title>{post.title} | Roselyn Adanza</title>
        <meta name="description" content={post.excerpt || post.title} />

        {/* Open Graph — Facebook, WhatsApp, LinkedIn */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Roselyn Adanza | Sun Life Financial Advisor" />

        {/* Twitter / X card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={postUrl} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || post.title} />
        <meta name="twitter:image" content={ogImage} />

        <link rel="canonical" href={postUrl} />
      </Helmet>

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

      <ShareButtons title={post.title} />

      <div className="mt-8 pt-6 border-t border-gray-100">
        <Link to="/blog" className="text-sm text-orange-500 font-medium hover:underline">← Back to Blog</Link>
      </div>
    </main>
  );
}

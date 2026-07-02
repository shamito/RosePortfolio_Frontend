import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TipTapLink from '@tiptap/extension-link';
import slugify from 'slugify';
import {
  collection,
  addDoc,
  updateDoc,
  getDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';

const CATEGORIES = [
  'Life Insurance',
  'Investment Planning',
  'Health Insurance',
  'Retirement Planning',
  'Education Planning',
  'Wealth Management',
  'Financial Tips',
  'Market Updates',
];

function ToolbarButton({ onClick, active, title, children }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      title={title}
      className={`px-2.5 py-1.5 rounded text-sm font-medium transition-colors ${
        active
          ? 'bg-orange-500 text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
}

function EditorToolbar({ editor }) {
  if (!editor) return null;

  function addLink() {
    const url = window.prompt('Enter URL:');
    if (url) editor.chain().focus().setLink({ href: url }).run();
  }

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
        <strong>B</strong>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
        <em>I</em>
      </ToolbarButton>
      <div className="w-px bg-gray-200 mx-1" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">
        H2
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">
        H3
      </ToolbarButton>
      <div className="w-px bg-gray-200 mx-1" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">
        • List
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered list">
        1. List
      </ToolbarButton>
      <div className="w-px bg-gray-200 mx-1" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">
        ❝
      </ToolbarButton>
      <ToolbarButton onClick={addLink} active={editor.isActive('link')} title="Add link">
        Link
      </ToolbarButton>
      {editor.isActive('link') && (
        <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()} active={false} title="Remove link">
          Unlink
        </ToolbarButton>
      )}
      <div className="w-px bg-gray-200 mx-1" />
      <ToolbarButton onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} active={false} title="Clear formatting">
        Clear
      </ToolbarButton>
    </div>
  );
}

export default function PostFormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingPost, setLoadingPost] = useState(isEditing);
  const [error, setError] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      TipTapLink.configure({ openOnClick: false }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-orange max-w-none min-h-64 p-4 focus:outline-none',
      },
    },
  });

  useEffect(() => {
    if (!isEditing || !editor) return;

    getDoc(doc(db, 'posts', id)).then((snap) => {
      if (!snap.exists()) {
        setError('Post not found.');
        setLoadingPost(false);
        return;
      }
      const data = snap.data();
      setTitle(data.title || '');
      setCategory(data.category || '');
      setExcerpt(data.excerpt || '');
      setCoverImageUrl(data.coverImageUrl || '');
      setPublished(data.published || false);
      editor.commands.setContent(data.body || '');
      setLoadingPost(false);
    });
  }, [id, isEditing, editor]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) { setError('Title is required.'); return; }
    if (!editor.getText().trim()) { setError('Post body cannot be empty.'); return; }

    setSaving(true);
    setError('');

    const slug = slugify(title, { lower: true, strict: true });
    const body = editor.getHTML();

    const payload = {
      title: title.trim(),
      slug,
      category,
      excerpt: excerpt.trim(),
      coverImageUrl: coverImageUrl.trim(),
      body,
      published,
      updatedAt: serverTimestamp(),
    };

    try {
      if (isEditing) {
        await updateDoc(doc(db, 'posts', id), payload);
      } else {
        await addDoc(collection(db, 'posts'), {
          ...payload,
          createdAt: serverTimestamp(),
          publishedAt: published ? serverTimestamp() : null,
        });
      }
      navigate('/admin/posts');
    } catch (err) {
      setError('Failed to save post. Please try again.');
      setSaving(false);
    }
  }

  if (loadingPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Loading post…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/admin/posts" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
            ← Posts
          </Link>
          <span className="text-gray-200">|</span>
          <h1 className="text-lg font-bold text-gray-900">{isEditing ? 'Edit Post' : 'New Post'}</h1>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="rounded border-gray-300 text-orange-500 focus:ring-orange-400"
            />
            Publish
          </label>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving…' : isEditing ? 'Update' : 'Save Post'}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Title */}
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title…"
            required
            className="w-full text-3xl font-bold text-gray-900 placeholder-gray-300 border-0 border-b-2 border-gray-100 focus:border-orange-400 focus:outline-none pb-2 bg-transparent transition-colors"
          />
          {title && (
            <p className="text-xs text-gray-400 mt-1">
              Slug: /blog/{slugify(title, { lower: true, strict: true })}
            </p>
          )}
        </div>

        {/* Meta fields */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            >
              <option value="">Select a category…</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
            <input
              type="url"
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short summary shown on the blog listing page…"
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          />
        </div>

        {/* Rich text editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <div className="border border-gray-300 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-orange-400 focus-within:border-orange-400">
            <EditorToolbar editor={editor} />
            <EditorContent editor={editor} />
          </div>
        </div>
      </main>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { supabase, Blog } from '../lib/supabase';

export function AdminBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [image, setImage] = useState('');
  const [slug, setSlug] = useState('');
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('blogs')
        .insert([
          {
            title,
            content,
            excerpt,
            image,
            slug,
            published_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      // Reset form
      setTitle('');
      setContent('');
      setExcerpt('');
      setImage('');
      setSlug('');

      // Reload posts
      loadPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Blog Admin</h1>

        <form onSubmit={handleSubmit} className="space-y-6 mb-12">
          <div>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded h-20"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Content (Markdown)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded h-64 font-mono"
              required
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition-colors"
          >
            Create Post
          </button>
        </form>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Existing Posts</h2>
          {posts.map((post) => (
            <div key={post.id} className="p-4 bg-gray-800 rounded">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="text-gray-400">{post.excerpt}</p>
              <p className="text-sm text-gray-500 mt-2">
                Published: {new Date(post.published_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
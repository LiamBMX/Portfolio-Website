import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { supabase, Blog } from '../lib/supabase';

export function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        if (data) setPost(data);
      } catch (error) {
        console.error('Failed to load blog post:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Post not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 max-w-4xl mx-auto px-6 py-32"
      >
        <Link 
          to="/blog" 
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all posts
        </Link>

        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-xl mb-8"
        />

        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        <time className="text-gray-400 mb-8 block">
          {format(parseISO(post.published_at), 'MMMM d, yyyy')}
        </time>

        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </motion.article>
    </div>
  );
}
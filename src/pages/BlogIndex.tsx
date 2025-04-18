import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BlogCard } from '../components/BlogCard';
import { useInView } from 'react-intersection-observer';
import { supabase, Blog } from '../lib/supabase';

export function BlogIndex() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('published_at', { ascending: false });

        if (error) throw error;
        if (data) setBlogPosts(data);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-16">Blog Posts</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard 
                key={post.id}
                title={post.title}
                date={post.published_at}
                excerpt={post.excerpt}
                image={post.image}
                slug={post.slug}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
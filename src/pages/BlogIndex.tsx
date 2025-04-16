import React from 'react';
import { motion } from 'framer-motion';
import { BlogCard } from '../components/BlogCard';
import { useInView } from 'react-intersection-observer';

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  slug: string;
}

export function BlogIndex() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const blogPosts = [
    {
      title: 'What is MindBloom, and why did you make it?',
      date: '2025-04-15',
      excerpt: 'People often ask me, "What is MindBloom, and why did you make it?", well here\'s your answer...',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      slug: 'what-is-mindbloom'
    },
    {
      title: 'What its like being a 14 year old business owner',
      date: '2025-03-31',
      excerpt: 'Day in the life as a 14 year old startup owner and how I got started with entrepreneurship.',
      image: 'https://images.unsplash.com/photo-1661588698602-da41ee4fc846',
      slug: '14-year-old-business-owner'
    },
    {
      title: 'The thought behind creating MindBlooms virtual garden',
      date: '2025-03-31',
      excerpt: 'How and why I created MindBlooms virtual garden, as well as the science behind how it helps people.',
      image: 'https://plus.unsplash.com/premium_photo-1720998704025-fac9bac7c31d',
      slug: 'mindbloom-virtual-garden'
    },
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative">
      {/* Background Pattern */}
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
          <h1 className="text-4xl md:text-5xl font-bold mb-16">Yap sessions</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
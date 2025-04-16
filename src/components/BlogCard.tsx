import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  slug: string;
}

export function BlogCard({ title, date, excerpt, image, slug }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-gray-900/50 rounded-xl overflow-hidden relative"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-6">
        <time className="text-sm text-gray-400">
          {format(new Date(date), 'MMMM d, yyyy')}
        </time>
        <h3 className="text-lg font-semibold mt-2 mb-3 group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-400 mb-4">{excerpt}</p>
        <Link 
          to={`/blog/${slug}`}
          className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Read more
          <svg 
            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M14 5l7 7m0 0l-7 7m7-7H3" 
            />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}
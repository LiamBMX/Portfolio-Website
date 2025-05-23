import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Sun, Moon, Github, Linkedin, Mail, Brain, Code, Rocket } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BlogCard } from './components/BlogCard';
import { BlogPost } from './pages/BlogPost';
import { BlogIndex } from './pages/BlogIndex';
import { AdminBlog } from './pages/AdminBlog';
import { supabase } from './lib/supabase';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { scrollYProgress } = useScroll();
  const springScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [blogRef, blogInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const swirlPath = "M0,50 Q25,50 50,25 T100,50";

  const projects = [
    {
      title: 'MindBloom',
      description: 'A neurodivergence-focused task management platform that gamifies productivity for ADHD and OCD users.',
      stack: 'React, AI, Supabase',
      icon: <Brain className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'RedGen',
      description: 'Subscription-based service that generates faceless reddit stories for TikTok using code.',
      stack: 'Python, AI, FFmpeg',
      icon: <Code className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1542903660-eedba2cda473?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&q=60&w=3000',
    },
    {
      title: 'SpineShiver Productions',
      description: 'AI-powered short form horror stories YouTube channel, everything automated by AI and Python.',
      stack: 'Python, AI, HTML/CSS',
      icon: <Rocket className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1563884086633-84f54b3240fd?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Scribbly.lol',
      description: 'Fun and playful way to quickly jolt down notes without the need of subscriptions, just open the site and write.',
      stack: 'React, Supabase, Tailwind',
      icon: <Rocket className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1511871893393-82e9c16b81e3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  const skills = {
    technical: [
      { name: 'Frontend Development', level: 85 },
      { name: 'Backend Development', level: 90 },
      { name: 'AI & Machine Learning', level: 80 },
      { name: 'Database Design', level: 70 },
      { name: 'Yapanese', level: 110 },
    ],
    languages: ['TypeScript', 'Python', 'JavaScript', 'HTML', 'CSS', 'React'],
    tools: ['Linux', 'Github', 'VSC', 'Docker', 'Termius']
  };

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
      slug: '14-year-old-ceo'
    },
    {
      title: 'The thought behind creating MindBlooms virtual garden',
      date: '2025-03-31',
      excerpt: 'How and why I created MindBlooms virtual garden, as well as the science behind how it helps people.',
      image: 'https://plus.unsplash.com/premium_photo-1720998704025-fac9bac7c31d',
      slug: 'mindblooms-virtual-garden'
    }
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  return (
    <Router>
      <Routes>
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/admin/blog" element={<AdminBlog />} />
        <Route path="/" element={
          <div className={`min-h-screen ${isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-white text-gray-900'} relative`}>
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
                backgroundSize: '50px 50px'
              }} />
            </div>

            {/* Scroll Progress */}
            <svg className="fixed top-0 left-0 w-full h-1 z-50">
              <motion.path
                d={swirlPath}
                stroke="url(#gradient)"
                strokeWidth="4"
                fill="none"
                style={{ pathLength, opacity: pathLength }}
              />
              <defs>
                <linearGradient id="gradient" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="50%" stopColor="#9333EA" />
                  <stop offset="100%" stopColor="#4F46E5" />
                </linearGradient>
              </defs>
            </svg>

            {/* Header */}
            <header className="fixed w-full top-0 z-40 backdrop-blur-lg bg-opacity-50">
              <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xl font-mono"
                >
                  LA
                </motion.span>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full hover:bg-gray-800/30 transition-colors"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </nav>
            </header>

            {/* Hero Section */}
            <section 
              ref={heroRef} 
              className="min-h-screen flex items-center justify-center relative px-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="max-w-4xl mx-auto text-center"
              >
                <h1 className="text-6xl md:text-8xl font-bold mb-8">
                  Liam Adams
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed">
                  Full Stack Developer & Entrepreneur designing projects 
                  that make a difference.
                </p>
                <div className="flex justify-center gap-6">
                  <a 
                    href="https://github.com/LiamBMX" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 hover:text-indigo-400 transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/liamgadams0" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 hover:text-indigo-400 transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a 
                    href="mailto:liamadams@mindbloomapp.com"
                    className="p-2 hover:text-indigo-400 transition-colors"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </motion.div>
            </section>

            {/* Projects Section */}
            <section 
              ref={projectsRef} 
              className="py-32 px-6"
            >
              <div className="max-w-6xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  animate={projectsInView ? { opacity: 1, x: 0 } : {}}
                  className="text-3xl font-bold mb-16"
                >
                  My Work
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 50 }}
                      animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.2 }}
                      className={`group relative rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                        <div className="flex items-center gap-3 mb-3">
                          {project.icon}
                          <h3 className="text-xl font-semibold">{project.title}</h3>
                        </div>
                        <p className="text-sm text-gray-300 mb-3">{project.description}</p>
                        <p className="text-xs font-mono text-gray-400">{project.stack}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section 
              ref={skillsRef} 
              className="py-32 px-6 bg-gradient-to-b from-transparent to-gray-900/20"
            >
              <div className="max-w-6xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  animate={skillsInView ? { opacity: 1, x: 0 } : {}}
                  className="text-3xl font-bold mb-16"
                >
                  Result of being chronically online
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                    className="space-y-8"
                  >
                    {skills.technical.map((skill, index) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{skill.name}</span>
                          <span className="font-mono">{skill.level}%</span>
                        </div>
                        <motion.div 
                          className="h-1 bg-gray-800 rounded-full overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={skillsInView ? { opacity: 1 } : {}}
                          transition={{ delay: index * 0.2 }}
                        >
                          <motion.div
                            className="h-full bg-indigo-500"
                            initial={{ width: 0 }}
                            animate={skillsInView ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 1, delay: index * 0.2 }}
                          />
                        </motion.div>
                      </div>
                    ))}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                    className="grid grid-cols-2 gap-8"
                  >
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Languages</h3>
                      <ul className="space-y-2">
                        {skills.languages.map((lang) => (
                          <li key={lang} className="text-gray-400">{lang}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Tools</h3>
                      <ul className="space-y-2">
                        {skills.tools.map((tool) => (
                          <li key={tool} className="text-gray-400">{tool}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Blog Section */}
            <section ref={blogRef} className="py-32 px-6 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-16">
                  <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    animate={blogInView ? { opacity: 1, x: 0 } : {}}
                    className="text-3xl font-bold"
                  >
                    Latest yap sessions
                  </motion.h2>
                  <Link 
                    to="/blog"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center"
                  >
                    View all yaps
                    <svg 
                      className="w-4 h-4 ml-2" 
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {blogPosts.map((post) => (
                    <BlogCard key={post.slug} {...post} />
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-12 text-center text-sm text-gray-400">
              <p>© 2025 Liam Adams. All rights reserved.</p>
            </footer>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
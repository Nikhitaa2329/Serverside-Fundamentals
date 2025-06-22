import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Play, BookOpen, Code, Server } from 'lucide-react';

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

const Hero = () => {
  const features = [
    { icon: Server, text: 'Server Architecture', delay: 0.2 },
    { icon: Code, text: 'Real-time Examples', delay: 0.4 },
    { icon: BookOpen, text: 'Interactive Learning', delay: 0.6 },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [2, 1, 1, 2, 2],
            rotate: [360, 270, 180, 90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, -90, -180, -270, -360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Server Side
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Engineering
            </span>
            Fundamentals
          </h1>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Master the core concepts of server-side development through interactive learning modules, 
          real-world examples, and hands-on practice.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            className="btn btn-primary hero-btn-gradient flex items-center space-x-2 text-lg px-8 py-4 shadow-lg"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection('overview')}
          >
            <Play className="w-5 h-5" />
            <span>Start Learning</span>
          </motion.button>
          
          <motion.button
            className="btn btn-secondary hero-btn-gradient flex items-center space-x-2 text-lg px-8 py-4 shadow-lg"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection('modules')}
          >
            <BookOpen className="w-5 h-5" />
            <span>View Modules</span>
          </motion.button>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ delay: feature.delay }}
              >
                <Icon className="w-8 h-8 text-white mx-auto mb-3" />
                <p className="text-white font-medium">{feature.text}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6 text-white/70" />
        </motion.div>

        <style>{`
          .hero-btn-gradient {
            background: linear-gradient(90deg, #a78bfa 0%, #f472b6 100%);
            color: #fff;
            border: none;
            border-radius: 10px;
            box-shadow: 0 4px 24px 0 rgba(167,139,250,0.15);
            transition: background 0.2s, box-shadow 0.2s;
          }
          .hero-btn-gradient:hover {
            background: linear-gradient(90deg, #f472b6 0%, #a78bfa 100%);
            box-shadow: 0 8px 32px 0 rgba(244,114,182,0.18);
          }
        `}</style>
      </div>
    </section>
  );
};

export default Hero; 
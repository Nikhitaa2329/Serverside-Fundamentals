import React from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Github, 
  Linkedin, 
  Mail, 
  Heart,
  BookOpen,
  Code,
  Users
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const features = [
    { icon: BookOpen, text: 'Interactive Learning' },
    { icon: Code, text: 'Real Examples' },
    { icon: Server, text: 'Architecture Diagrams' },
    { icon: Users, text: 'Hands-on Practice' }
  ];

  return (
    <footer className="relative bg-gray-900 text-white py-16 mt-20">
      {/* Gradient Top Border */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-t-xl" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Project Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Server className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold">ServerSide Fundamentals</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              A comprehensive interactive learning platform designed to help students master 
              server-side engineering concepts through hands-on practice, real-world examples, 
              and visual learning experiences.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-2 text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Icon className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">{feature.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Learning Modules</h3>
            <ul className="space-y-2">
              <li>
                <a href="#overview" className="footer-link">Core Concepts</a>
              </li>
              <li>
                <a href="#modules" className="footer-link">Interactive Practice</a>
              </li>
              <li>
                <a href="#examples" className="footer-link">Code Examples</a>
              </li>
              <li>
                <a href="#architecture" className="footer-link">System Architecture</a>
              </li>
              <li>
                <a href="#quiz" className="footer-link">Knowledge Assessment</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="space-y-3">
              <a 
                href="mailto:contact@serversidefundamentals.com" 
                className="footer-link flex items-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">Contact Us</span>
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link flex items-center space-x-2"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link flex items-center space-x-2"
              >
                <Linkedin className="w-4 h-4" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
              <span className="text-sm">
                © {currentYear} ServerSide Fundamentals. Made with
              </span>
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm">for students</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Empowering the next generation of server-side engineers.</span>
            </div>
          </div>
        </div>
      </div>
      {/* Extra styles for footer links */}
      <style>{`
        .footer-link {
          color: #c4b5fd;
          transition: color 0.2s, background 0.2s, box-shadow 0.2s;
          border-radius: 6px;
          padding: 4px 8px;
          text-decoration: none;
        }
        .footer-link:hover {
          color: #fff;
          background: linear-gradient(90deg, #a78bfa 0%, #f472b6 100%);
          box-shadow: 0 2px 12px 0 rgba(167,139,250,0.15);
        }
      `}</style>
    </footer>
  );
};

export default Footer; 
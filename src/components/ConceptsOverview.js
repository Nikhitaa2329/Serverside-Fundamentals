import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Database, 
  Shield, 
  Zap, 
  Globe, 
  Lock, 
  Cpu, 
  Network,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const ConceptsOverview = () => {
  const [selectedConcept, setSelectedConcept] = useState(null);

  const concepts = [
    {
      id: 'architecture',
      title: 'Server Architecture',
      icon: Server,
      description: 'Understanding the fundamental structure and components of server-side systems.',
      details: [
        'Client-Server Model',
        'Multi-tier Architecture',
        'Microservices vs Monolith',
        'Load Balancing',
        'Horizontal vs Vertical Scaling'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'databases',
      title: 'Database Management',
      icon: Database,
      description: 'Core concepts of data storage, retrieval, and management in server applications.',
      details: [
        'Relational vs NoSQL',
        'ACID Properties',
        'Database Normalization',
        'Indexing Strategies',
        'Connection Pooling'
      ],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'security',
      title: 'Security Fundamentals',
      icon: Shield,
      description: 'Essential security practices and protocols for protecting server applications.',
      details: [
        'Authentication & Authorization',
        'HTTPS & SSL/TLS',
        'SQL Injection Prevention',
        'Cross-Site Scripting (XSS)',
        'API Security'
      ],
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'performance',
      title: 'Performance Optimization',
      icon: Zap,
      description: 'Techniques for improving server performance and response times.',
      details: [
        'Caching Strategies',
        'Database Query Optimization',
        'CDN Implementation',
        'Memory Management',
        'Async Processing'
      ],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'networking',
      title: 'Network Protocols',
      icon: Network,
      description: 'Understanding how data flows between client and server applications.',
      details: [
        'HTTP/HTTPS Protocols',
        'RESTful APIs',
        'WebSocket Communication',
        'TCP/IP Fundamentals',
        'DNS Resolution'
      ],
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'deployment',
      title: 'Deployment & DevOps',
      icon: Globe,
      description: 'Modern deployment strategies and continuous integration practices.',
      details: [
        'Containerization (Docker)',
        'CI/CD Pipelines',
        'Cloud Deployment',
        'Environment Management',
        'Monitoring & Logging'
      ],
      color: 'from-teal-500 to-blue-500'
    }
  ];

  return (
    <div className="py-20 px-2 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 min-h-[80vh] relative">
      <div className="absolute inset-0 pointer-events-none select-none opacity-30" style={{zIndex:0}}>
        <div className="absolute top-10 left-10 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-2xl opacity-30" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title text-blue-900 drop-shadow-lg">Core Concepts Overview</h2>
          <p className="section-subtitle text-blue-800/90">
            Explore the fundamental building blocks of server-side engineering through interactive learning modules
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {concepts.map((concept, index) => {
            const Icon = concept.icon;
            return (
              <motion.div
                key={concept.id}
                className="card bg-white/70 backdrop-blur-md border-2 border-blue-200 shadow-xl hover:shadow-2xl cursor-pointer group transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => setSelectedConcept(selectedConcept === concept.id ? null : concept.id)}
                style={{ minHeight: 180 }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${concept.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors">
                      {concept.title}
                    </h3>
                    <p className="text-blue-700 text-sm leading-relaxed">
                      {concept.description}
                    </p>
                  </div>
                  <button className={`ml-2 px-2 py-1 rounded-full bg-blue-200 hover:bg-blue-400 transition-colors text-blue-800 font-bold text-xs shadow ${selectedConcept === concept.id ? 'bg-blue-500 text-white' : ''}`}>{selectedConcept === concept.id ? '-' : '+'}</button>
                </div>
                {selectedConcept === concept.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-blue-200"
                  >
                    <h4 className="font-medium text-blue-900 mb-3">Key Topics:</h4>
                    <ul className="space-y-2">
                      {concept.details.map((detail, detailIndex) => (
                        <motion.li
                          key={detailIndex}
                          className="flex items-center space-x-2 text-sm text-blue-700"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: detailIndex * 0.1 }}
                        >
                          <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Learning Path */}
        <motion.div
          className="card bg-gradient-to-r from-blue-200 via-blue-100 to-cyan-100 border-2 border-blue-300 shadow-xl max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            Learning Path
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">Foundation</h4>
              <p className="text-blue-700 text-sm">
                Start with basic concepts and architecture patterns
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">Implementation</h4>
              <p className="text-blue-700 text-sm">
                Build real applications with hands-on practice
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">Advanced</h4>
              <p className="text-blue-700 text-sm">
                Master advanced topics and optimization techniques
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConceptsOverview; 
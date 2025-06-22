import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Database, 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  ArrowRight,
  Info,
  Play,
  Pause
} from 'lucide-react';

const ArchitectureDiagram = () => {
  const [activeLayer, setActiveLayer] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const layers = [
    {
      id: 'presentation',
      name: 'Presentation Layer',
      description: 'User interface and client-side applications',
      components: [
        { name: 'Web Browser', icon: Globe, color: 'from-blue-500 to-cyan-500' },
        { name: 'Mobile App', icon: Users, color: 'from-green-500 to-emerald-500' },
        { name: 'API Client', icon: ArrowRight, color: 'from-purple-500 to-pink-500' }
      ],
      connections: ['Load Balancer']
    },
    {
      id: 'load-balancer',
      name: 'Load Balancer',
      description: 'Distributes incoming requests across multiple servers',
      components: [
        { name: 'Nginx', icon: Server, color: 'from-orange-500 to-red-500' },
        { name: 'HAProxy', icon: Server, color: 'from-yellow-500 to-orange-500' }
      ],
      connections: ['Web Server', 'API Gateway']
    },
    {
      id: 'web-server',
      name: 'Web Server',
      description: 'Handles HTTP requests and serves static content',
      components: [
        { name: 'Express.js', icon: Server, color: 'from-green-500 to-teal-500' },
        { name: 'Node.js', icon: Server, color: 'from-yellow-500 to-green-500' }
      ],
      connections: ['Application Server', 'Static Files']
    },
    {
      id: 'api-gateway',
      name: 'API Gateway',
      description: 'Manages API requests, authentication, and routing',
      components: [
        { name: 'Authentication', icon: Shield, color: 'from-red-500 to-pink-500' },
        { name: 'Rate Limiting', icon: Zap, color: 'from-purple-500 to-indigo-500' },
        { name: 'Request Routing', icon: ArrowRight, color: 'from-blue-500 to-cyan-500' }
      ],
      connections: ['Microservices', 'Application Server']
    },
    {
      id: 'application',
      name: 'Application Server',
      description: 'Business logic and application processing',
      components: [
        { name: 'User Service', icon: Users, color: 'from-blue-500 to-purple-500' },
        { name: 'Product Service', icon: Server, color: 'from-green-500 to-blue-500' },
        { name: 'Order Service', icon: Server, color: 'from-orange-500 to-red-500' }
      ],
      connections: ['Database', 'Cache', 'Message Queue']
    },
    {
      id: 'data',
      name: 'Data Layer',
      description: 'Data storage and management systems',
      components: [
        { name: 'PostgreSQL', icon: Database, color: 'from-blue-500 to-indigo-500' },
        { name: 'Redis Cache', icon: Zap, color: 'from-red-500 to-orange-500' },
        { name: 'MongoDB', icon: Database, color: 'from-green-500 to-emerald-500' }
      ],
      connections: []
    }
  ];

  const startAnimation = () => {
    setIsAnimating(true);
    let currentIndex = 0;
    
    const animateNext = () => {
      if (currentIndex < layers.length) {
        setActiveLayer(layers[currentIndex].id);
        currentIndex++;
        setTimeout(animateNext, 1500);
      } else {
        setIsAnimating(false);
        setActiveLayer(null);
      }
    };
    
    animateNext();
  };

  const stopAnimation = () => {
    setIsAnimating(false);
    setActiveLayer(null);
  };

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="section-title">System Architecture</h2>
        <p className="section-subtitle">
          Visualize the complete server-side architecture and understand how different components interact
        </p>
      </div>

      {/* Animation Controls */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-4">
          <motion.button
            onClick={startAnimation}
            disabled={isAnimating}
            className="btn btn-primary flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-4 h-4" />
            <span>Start Animation</span>
          </motion.button>
          <motion.button
            onClick={stopAnimation}
            className="btn btn-secondary flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Pause className="w-4 h-4" />
            <span>Stop Animation</span>
          </motion.button>
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="max-w-6xl mx-auto">
        <div className="space-y-6">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.id}
              className={`relative ${index % 2 === 0 ? 'ml-0' : 'ml-8 md:ml-16'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Layer Card */}
              <motion.div
                className={`card cursor-pointer transition-all duration-300 ${
                  activeLayer === layer.id
                    ? 'ring-4 ring-purple-500 shadow-xl scale-105'
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {layer.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {layer.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      Layer {index + 1}
                    </span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Components */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {layer.components.map((component, compIndex) => {
                    const Icon = component.icon;
                    return (
                      <motion.div
                        key={compIndex}
                        className={`p-3 rounded-lg bg-gradient-to-r ${component.color} text-white text-center`}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: compIndex * 0.1 }}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">{component.name}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Connections */}
                {layer.connections.length > 0 && (
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Connects to:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {layer.connections.map((connection, connIndex) => (
                        <motion.span
                          key={connIndex}
                          className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: connIndex * 0.1 }}
                        >
                          {connection}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Connection Line */}
              {index < layers.length - 1 && (
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-500 to-pink-500"
                  style={{ top: '100%', height: '24px' }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Architecture Benefits */}
      <motion.div
        className="card max-w-4xl mx-auto mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Architecture Benefits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Scalability</h4>
            <p className="text-gray-600 text-sm">
              Horizontal scaling with load balancers and microservices architecture
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Security</h4>
            <p className="text-gray-600 text-sm">
              Multiple security layers with authentication, authorization, and encryption
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Server className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Reliability</h4>
            <p className="text-gray-600 text-sm">
              Fault tolerance with redundancy, caching, and proper error handling
            </p>
          </div>
        </div>
      </motion.div>

      {/* Interactive Legend */}
      <motion.div
        className="card max-w-2xl mx-auto mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h4 className="font-semibold text-gray-800 mb-4 text-center">How to Use</h4>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>Click on any layer to highlight and see details</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
            <span>Use animation controls to see the flow between layers</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Each component shows its role in the system</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ArchitectureDiagram; 
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  X, 
  Code, 
  Terminal,
  Database,
  Shield,
  Zap
} from 'lucide-react';

const InteractiveModules = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
  const [showSolution, setShowSolution] = useState(false);

  const modules = [
    {
      id: 'http-server',
      title: 'HTTP Server Basics',
      icon: Code,
      description: 'Learn to create a basic HTTP server and handle different types of requests.',
      challenge: 'Create a simple HTTP server that responds with "Hello, World!"',
      starterCode: `const http = require('http');

const server = http.createServer((req, res) => {
  // Your code here
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
      solution: `const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
      explanation: 'This creates a basic HTTP server that listens on port 3000 and responds with "Hello, World!" to all requests.'
    },
    {
      id: 'database-connection',
      title: 'Database Connections',
      icon: Database,
      description: 'Practice connecting to databases and performing basic CRUD operations.',
      challenge: 'Connect to a database and create a simple query',
      starterCode: `const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'testdb'
});

// Your code here`,
      solution: `const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'testdb'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database successfully!');
  
  connection.query('SELECT * FROM users LIMIT 5', (err, results) => {
    if (err) throw err;
    console.log('Query results:', results);
  });
});`,
      explanation: 'This code establishes a connection to a MySQL database and performs a simple SELECT query to retrieve user data.'
    },
    {
      id: 'authentication',
      title: 'Authentication System',
      icon: Shield,
      description: 'Implement basic authentication and authorization mechanisms.',
      challenge: 'Create a simple login verification function',
      starterCode: `const bcrypt = require('bcrypt');

function verifyLogin(username, password, storedHash) {
  // Your code here
}`,
      solution: `const bcrypt = require('bcrypt');

function verifyLogin(username, password, storedHash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, storedHash, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}`,
      explanation: 'This function uses bcrypt to securely compare a user-provided password with a stored hash.'
    },
    {
      id: 'caching',
      title: 'Caching Strategies',
      icon: Zap,
      description: 'Learn about different caching techniques to improve performance.',
      challenge: 'Implement a simple in-memory cache',
      starterCode: `class SimpleCache {
  constructor() {
    // Your code here
  }
  
  set(key, value, ttl = 3600) {
    // Your code here
  }
  
  get(key) {
    // Your code here
  }
}`,
      solution: `class SimpleCache {
  constructor() {
    this.cache = new Map();
  }
  
  set(key, value, ttl = 3600) {
    const expiry = Date.now() + (ttl * 1000);
    this.cache.set(key, { value, expiry });
  }
  
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }
}`,
      explanation: 'This implements a simple in-memory cache with TTL (Time To Live) functionality.'
    }
  ];

  const runCode = () => {
    setIsRunning(true);
    setOutput('Running code...\n');
    
    // Simulate code execution
    setTimeout(() => {
      const currentModule = modules[activeModule];
      setOutput(`✅ Code executed successfully!\n\nOutput:\n${currentModule.explanation}`);
      setIsRunning(false);
    }, 2000);
  };

  const resetCode = () => {
    setUserCode(modules[activeModule].starterCode);
    setOutput('');
    setShowSolution(false);
  };

  const showSolutionCode = () => {
    setShowSolution(true);
    setUserCode(modules[activeModule].solution);
  };

  return (
    <div className="py-20 px-2 bg-gradient-to-br from-green-100 via-teal-100 to-green-200 min-h-[80vh] relative">
      <div className="absolute inset-0 pointer-events-none select-none opacity-30" style={{zIndex:0}}>
        <div className="absolute top-10 right-10 w-80 h-80 bg-green-300 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-200 rounded-full blur-2xl opacity-30" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title text-green-900 drop-shadow-lg">Interactive Learning Modules</h2>
          <p className="section-subtitle text-green-800/90">
            Practice server-side concepts with hands-on coding challenges and real-time feedback
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Module Navigation */}
          <div className="lg:col-span-1">
            <div className="card bg-white/70 backdrop-blur-md border-2 border-green-200 shadow-xl mb-8">
              <h3 className="text-xl font-bold text-green-900 mb-6">Learning Modules</h3>
              <div className="space-y-3">
                {modules.map((module, index) => {
                  const Icon = module.icon;
                  return (
                    <motion.button
                      key={module.id}
                      onClick={() => {
                        setActiveModule(index);
                        setUserCode(module.starterCode);
                        setOutput('');
                        setShowSolution(false);
                      }}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                        activeModule === index
                          ? 'bg-purple-100 border-2 border-purple-500'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 ${
                          activeModule === index ? 'text-purple-600' : 'text-gray-600'
                        }`} />
                        <div>
                          <h4 className={`font-semibold ${
                            activeModule === index ? 'text-purple-600' : 'text-gray-800'
                          }`}>
                            {module.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {module.description}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Code Editor */}
          <div className="lg:col-span-2">
            <div className="card bg-gradient-to-br from-green-100 via-teal-100 to-green-200 border-2 border-green-300 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-green-900">
                  {modules[activeModule].title}
                </h3>
                <div className="flex space-x-2">
                  <motion.button
                    onClick={runCode}
                    disabled={isRunning}
                    className="btn btn-primary flex items-center space-x-2 px-5 py-2 rounded-full bg-gradient-to-r from-green-400 to-teal-400 text-white font-semibold shadow-lg hover:from-teal-400 hover:to-green-400 transition-all"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isRunning ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                  </motion.button>
                  <motion.button
                    onClick={resetCode}
                    className="btn btn-secondary flex items-center space-x-2 px-5 py-2 rounded-full bg-gradient-to-r from-teal-200 to-green-200 text-green-900 font-semibold shadow hover:from-green-200 hover:to-teal-200 transition-all"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset</span>
                  </motion.button>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-green-900 mb-3">Challenge:</h4>
                <p className="text-green-800 bg-green-50 p-4 rounded-lg">
                  {modules[activeModule].challenge}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Code Input */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-green-900">Your Code:</h4>
                    <button
                      onClick={showSolutionCode}
                      className="text-sm text-purple-600 hover:text-purple-700"
                    >
                      Show Solution
                    </button>
                  </div>
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="w-full h-64 p-4 bg-gray-900 text-green-400 font-mono text-sm rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 resize-none"
                    placeholder="Write your code here..."
                  />
                </div>

                {/* Output */}
                <div>
                  <h4 className="font-semibold text-green-900 mb-3">Output:</h4>
                  <div className="w-full h-64 p-4 bg-gray-900 text-white font-mono text-sm rounded-lg border border-gray-300 overflow-y-auto">
                    <Terminal className="w-4 h-4 text-green-400 mb-2" />
                    <pre className="whitespace-pre-wrap">{output || 'No output yet. Run your code to see results.'}</pre>
                  </div>
                </div>
              </div>

              {showSolution && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <h4 className="font-semibold text-green-800 mb-2">Explanation:</h4>
                  <p className="text-green-700 text-sm">
                    {modules[activeModule].explanation}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default InteractiveModules; 
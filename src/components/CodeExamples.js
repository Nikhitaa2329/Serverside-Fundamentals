import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  Copy, 
  Check, 
  Server, 
  Database, 
  Shield, 
  Zap, 
  Globe,
  ExternalLink
} from 'lucide-react';

const CodeExamples = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const examples = [
    {
      id: 'express-server',
      title: 'Express.js REST API',
      icon: Server,
      description: 'A complete Express.js server with middleware, routing, and error handling.',
      language: 'javascript',
      code: `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ 
      success: true, 
      data: user 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Something went wrong!' 
  });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
      explanation: 'This example shows a complete Express.js server setup with security middleware, RESTful routes, and proper error handling.'
    },
    {
      id: 'database-orm',
      title: 'Database ORM with Sequelize',
      icon: Database,
      description: 'Using Sequelize ORM for database operations with models and relationships.',
      language: 'javascript',
      code: `const { Sequelize, DataTypes } = require('sequelize');

// Database connection
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

// User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Post model with relationship
const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT
  }
});

// Define relationships
User.hasMany(Post);
Post.belongsTo(User);

// Database operations
async function createUser(userData) {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    throw new Error('Failed to create user: ' + error.message);
  }
}

async function getUserWithPosts(userId) {
  try {
    const user = await User.findByPk(userId, {
      include: [{
        model: Post,
        attributes: ['id', 'title', 'createdAt']
      }]
    });
    return user;
  } catch (error) {
    throw new Error('Failed to fetch user: ' + error.message);
  }
}`,
      explanation: 'This demonstrates using Sequelize ORM for database modeling, relationships, and CRUD operations with proper error handling.'
    },
    {
      id: 'authentication-jwt',
      title: 'JWT Authentication',
      icon: Shield,
      description: 'Complete JWT authentication system with middleware and token validation.',
      language: 'javascript',
      code: `const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      error: 'Access token required' 
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        error: 'Invalid or expired token' 
      });
    }
    req.user = user;
    next();
  });
};

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid credentials' 
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        error: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Login failed' 
    });
  }
});

// Protected route example
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ['password'] }
    });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch profile' 
    });
  }
});`,
      explanation: 'This shows a complete JWT authentication system with middleware for protecting routes and secure password handling.'
    },
    {
      id: 'caching-redis',
      title: 'Redis Caching',
      icon: Zap,
      description: 'Implementing Redis caching for improved performance and session management.',
      language: 'javascript',
      code: `const redis = require('redis');
const { promisify } = require('util');

// Redis client setup
const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD
});

// Promisify Redis commands
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);

// Cache middleware
const cacheMiddleware = (duration = 3600) => {
  return async (req, res, next) => {
    const key = \`cache:\${req.originalUrl}\`;
    
    try {
      const cachedData = await getAsync(key);
      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }
      
      // Store original send function
      const originalSend = res.json;
      
      // Override send function to cache response
      res.json = function(data) {
        setAsync(key, JSON.stringify(data), 'EX', duration);
        originalSend.call(this, data);
      };
      
      next();
    } catch (error) {
      next();
    }
  };
};

// Session management
class SessionManager {
  static async createSession(userId, data = {}) {
    const sessionId = require('crypto').randomBytes(32).toString('hex');
    const sessionData = {
      userId,
      ...data,
      createdAt: Date.now()
    };
    
    await setAsync(\`session:\${sessionId}\`, JSON.stringify(sessionData), 'EX', 86400);
    return sessionId;
  }

  static async getSession(sessionId) {
    try {
      const sessionData = await getAsync(\`session:\${sessionId}\`);
      return sessionData ? JSON.parse(sessionData) : null;
    } catch (error) {
      return null;
    }
  }

  static async deleteSession(sessionId) {
    await delAsync(\`session:\${sessionId}\`);
  }
}

// Usage example
app.get('/api/products', cacheMiddleware(1800), async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});`,
      explanation: 'This demonstrates Redis caching implementation for improving API performance and managing user sessions.'
    },
    {
      id: 'docker-deployment',
      title: 'Docker Configuration',
      icon: Globe,
      description: 'Docker setup for containerized deployment with multi-stage builds.',
      language: 'dockerfile',
      code: `# Multi-stage build for Node.js application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Copy built application
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["node", "dist/index.js"]

# Docker Compose example
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    networks:
      - app-network

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    networks:
      - app-network

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge`,
      explanation: 'This shows a complete Docker setup with multi-stage builds, security best practices, and Docker Compose for orchestration.'
    }
  ];

  const copyToClipboard = async (code, index) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="section-title">Real-World Code Examples</h2>
        <p className="section-subtitle">
          Explore production-ready code examples demonstrating best practices in server-side development
        </p>
      </div>

      <div className="space-y-8">
        {examples.map((example, index) => {
          const Icon = example.icon;
          return (
            <motion.div
              key={example.id}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {example.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {example.description}
                  </p>
                </div>
                <motion.button
                  onClick={() => copyToClipboard(example.code, index)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600" />
                  )}
                  <span className="text-sm font-medium">
                    {copiedIndex === index ? 'Copied!' : 'Copy Code'}
                  </span>
                </motion.button>
              </div>

              <div className="relative">
                <SyntaxHighlighter
                  language={example.language}
                  style={tomorrow}
                  customStyle={{
                    margin: 0,
                    borderRadius: '8px',
                    fontSize: '14px',
                    lineHeight: '1.5'
                  }}
                  showLineNumbers={true}
                >
                  {example.code}
                </SyntaxHighlighter>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Explanation
                </h4>
                <p className="text-blue-700 text-sm leading-relaxed">
                  {example.explanation}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Best Practices Summary */}
      <motion.div
        className="card max-w-4xl mx-auto mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Best Practices Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Security</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Always validate and sanitize input data</li>
              <li>• Use HTTPS in production</li>
              <li>• Implement proper authentication & authorization</li>
              <li>• Keep dependencies updated</li>
              <li>• Use environment variables for secrets</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Performance</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Implement caching strategies</li>
              <li>• Optimize database queries</li>
              <li>• Use connection pooling</li>
              <li>• Implement rate limiting</li>
              <li>• Monitor application metrics</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CodeExamples; 
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  X, 
  ArrowRight, 
  RotateCcw, 
  Trophy, 
  Brain,
  Clock,
  Target
} from 'lucide-react';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the primary purpose of a load balancer in server architecture?",
      options: [
        "To store user data",
        "To distribute incoming requests across multiple servers",
        "To encrypt data transmission",
        "To generate API keys"
      ],
      correct: 1,
      explanation: "Load balancers distribute incoming requests across multiple servers to ensure optimal resource utilization and high availability."
    },
    {
      id: 2,
      question: "Which of the following is NOT a valid HTTP method?",
      options: [
        "GET",
        "POST",
        "PUT",
        "FETCH"
      ],
      correct: 3,
      explanation: "FETCH is not a standard HTTP method. The standard HTTP methods are GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, etc."
    },
    {
      id: 3,
      question: "What does ACID stand for in database transactions?",
      options: [
        "Atomicity, Consistency, Isolation, Durability",
        "Authentication, Confidentiality, Integrity, Data",
        "Access, Control, Identity, Database",
        "Application, Cache, Index, Data"
      ],
      correct: 0,
      explanation: "ACID properties ensure reliable database transactions: Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions), Durability (permanent changes)."
    },
    {
      id: 4,
      question: "Which caching strategy stores frequently accessed data in memory?",
      options: [
        "Database caching",
        "CDN caching",
        "In-memory caching",
        "Browser caching"
      ],
      correct: 2,
      explanation: "In-memory caching stores frequently accessed data in RAM for faster retrieval, significantly improving application performance."
    },
    {
      id: 5,
      question: "What is the purpose of JWT (JSON Web Tokens) in authentication?",
      options: [
        "To encrypt database passwords",
        "To provide stateless authentication",
        "To compress API responses",
        "To validate email addresses"
      ],
      correct: 1,
      explanation: "JWTs provide stateless authentication by containing user information and permissions, eliminating the need to store session data on the server."
    },
    {
      id: 6,
      question: "Which of the following is a microservices communication pattern?",
      options: [
        "Synchronous HTTP calls",
        "Message queues",
        "Shared database",
        "All of the above"
      ],
      correct: 3,
      explanation: "Microservices can communicate through various patterns including synchronous HTTP calls, asynchronous message queues, and sometimes shared databases for specific use cases."
    },
    {
      id: 7,
      question: "What is the main advantage of horizontal scaling?",
      options: [
        "Lower hardware costs",
        "Better performance per server",
        "Ability to handle more traffic by adding servers",
        "Simpler deployment process"
      ],
      correct: 2,
      explanation: "Horizontal scaling allows applications to handle more traffic by adding more servers, providing better scalability and fault tolerance."
    },
    {
      id: 8,
      question: "Which security practice helps prevent SQL injection attacks?",
      options: [
        "Using HTTPS",
        "Input validation and parameterized queries",
        "Rate limiting",
        "CORS configuration"
      ],
      correct: 1,
      explanation: "Input validation and parameterized queries prevent SQL injection by ensuring user input is properly sanitized and not executed as SQL code."
    },
    {
      id: 9,
      question: "What is the purpose of connection pooling in database management?",
      options: [
        "To encrypt database connections",
        "To reuse database connections efficiently",
        "To backup database data",
        "To monitor database performance"
      ],
      correct: 1,
      explanation: "Connection pooling reuses database connections to avoid the overhead of creating new connections for each request, improving performance."
    },
    {
      id: 10,
      question: "Which deployment strategy allows zero-downtime updates?",
      options: [
        "Blue-green deployment",
        "Rolling deployment",
        "Canary deployment",
        "All of the above"
      ],
      correct: 3,
      explanation: "All three deployment strategies (blue-green, rolling, and canary) can achieve zero-downtime updates when properly implemented."
    }
  ];

  useEffect(() => {
    let timer;
    if (isQuizStarted && timeLeft > 0 && !showResults) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isQuizStarted, timeLeft, showResults]);

  const startQuiz = () => {
    setIsQuizStarted(true);
    setTimeLeft(300);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
    setTimeLeft(300);
    setIsQuizStarted(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return { message: "Excellent! You're a server-side expert!", color: "text-green-600" };
    if (percentage >= 80) return { message: "Great job! You have solid understanding!", color: "text-blue-600" };
    if (percentage >= 70) return { message: "Good work! Keep learning!", color: "text-yellow-600" };
    if (percentage >= 60) return { message: "Not bad! Review the concepts!", color: "text-orange-600" };
    return { message: "Keep studying! Practice makes perfect!", color: "text-red-600" };
  };

  if (!isQuizStarted) {
    return (
      <div className="py-16">
        <div className="text-center mb-12">
          <h2 className="section-title">Knowledge Assessment</h2>
          <p className="section-subtitle">
            Test your understanding of server-side engineering concepts with this interactive quiz
          </p>
        </div>

        <motion.div
          className="card max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <Brain className="w-16 h-16 text-purple-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Server-Side Engineering Quiz
            </h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>{questions.length} Questions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>5 Minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4" />
                  <span>Passing: 70%</span>
                </div>
              </div>
            </div>
            <motion.button
              onClick={startQuiz}
              className="btn btn-primary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Quiz
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (showResults) {
    const scoreMessage = getScoreMessage();
    return (
      <div className="py-16">
        <div className="text-center mb-12">
          <h2 className="section-title">Quiz Results</h2>
        </div>

        <motion.div
          className="card max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Quiz Complete!
            </h3>
            
            <div className="mb-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {score}/{questions.length}
              </div>
              <div className="text-lg text-gray-600 mb-4">
                {((score / questions.length) * 100).toFixed(1)}%
              </div>
              <div className={`text-lg font-semibold ${scoreMessage.color}`}>
                {scoreMessage.message}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-green-700">Correct</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{questions.length - score}</div>
                <div className="text-sm text-red-700">Incorrect</div>
              </div>
            </div>

            <motion.button
              onClick={resetQuiz}
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Take Quiz Again
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="section-title">Knowledge Assessment</h2>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Progress and Timer */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-purple-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm font-medium">
              <Clock className="w-4 h-4" />
              <span className={timeLeft < 60 ? 'text-red-600' : 'text-gray-600'}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Score: {score}/{currentQuestion + 1}
            </span>
            <span className="text-sm text-gray-600">
              {((score / (currentQuestion + 1)) * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestion}
          className="card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            {currentQ.question}
          </h3>

          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === index
                    ? index === currentQ.correct
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : isAnswered && index === currentQ.correct
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                whileHover={!isAnswered ? { scale: 1.02 } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index
                      ? index === currentQ.correct
                        ? 'border-green-500 bg-green-500'
                        : 'border-red-500 bg-red-500'
                      : isAnswered && index === currentQ.correct
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      index === currentQ.correct ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <X className="w-4 h-4 text-white" />
                      )
                    )}
                    {isAnswered && index === currentQ.correct && selectedAnswer !== index && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-gray-800">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Explanation */}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6"
            >
              <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
              <p className="text-blue-700 text-sm">{currentQ.explanation}</p>
            </motion.div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end">
              <motion.button
                onClick={nextQuestion}
                className="btn btn-primary flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Quiz; 
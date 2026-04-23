"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RefreshCcw, ArrowRight, Brain, Zap } from 'lucide-react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ingredientsData from '@/lib/data/ingredients.json';
import useTranslation from '@/lib/i18n/useTranslation';

export default function SwapQuiz() {
  const { t, lang } = useTranslation();
  const [gameState, setGameState] = useState('start'); // start, playing, result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // Generate 5 random questions
  const startNewGame = () => {
    const allIngredients = [...ingredientsData.ingredients];
    const shuffled = allIngredients.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5).map(ing => {
      const correctSub = ing.substitutes[0].name[lang];
      // Get 2 wrong answers from other ingredients
      const wrongSubs = allIngredients
        .filter(item => item.id !== ing.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)
        .map(item => item.substitutes[0].name[lang]);
      
      const options = [correctSub, ...wrongSubs].sort(() => 0.5 - Math.random());
      
      return {
        ingredient: ing.name[lang],
        correct: correctSub,
        options,
        id: ing.id
      };
    });
    
    setQuestions(selected);
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswer = (option) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(option);
    const correct = option === questions[currentQuestion].correct;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(q => q + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setGameState('result');
      }
    }, 1500);
  };

  return (
    <div className="quiz-page">
      <Header />
      
      <div className="container quiz-container">
        <AnimatePresence mode="wait">
          {gameState === 'start' && (
            <motion.div 
              key="start"
              className="quiz-card glass-card start-screen"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="icon-badge">
                <Brain size={48} className="brand-primary" />
              </div>
              <h1>{lang === 'ko' ? '스왑 마스터 퀴즈' : 'Swap Master Quiz'}</h1>
              <p>{lang === 'ko' ? '과학적으로 가장 적합한 대체제를 맞출 수 있을까요?' : 'Do you know the science behind the perfect swap?'}</p>
              
              <button className="btn btn-primary start-btn" onClick={startNewGame}>
                {lang === 'ko' ? '퀴즈 시작' : 'Start Quiz'}
                <Zap size={18} style={{ marginLeft: '10px' }} />
              </button>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <motion.div 
              key="playing"
              className="quiz-card glass-card playing-screen"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div className="quiz-progress">
                <span>{lang === 'ko' ? '문제' : 'Question'} {currentQuestion + 1} / 5</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / 5) * 100}%` }} />
                </div>
              </div>

              <h2 className="question-text">
                {lang === 'ko' ? `[${questions[currentQuestion].ingredient}]의 가장 적합한 대체제는?` : `What is the best substitute for ${questions[currentQuestion].ingredient}?`}
              </h2>

              <div className="options-grid">
                {questions[currentQuestion].options.map((option, idx) => {
                  let statusClass = '';
                  if (selectedAnswer === option) {
                    statusClass = isCorrect ? 'correct' : 'wrong';
                  } else if (selectedAnswer !== null && option === questions[currentQuestion].correct) {
                    statusClass = 'correct';
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                      whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                      className={`option-btn ${statusClass}`}
                      onClick={() => handleAnswer(option)}
                      disabled={selectedAnswer !== null}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {gameState === 'result' && (
            <motion.div 
              key="result"
              className="quiz-card glass-card result-screen"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Trophy size={64} className="trophy-icon" />
              <h1>{lang === 'ko' ? '퀴즈 종료!' : 'Quiz Finished!'}</h1>
              <div className="final-score">
                <span className="score-num">{score}</span>
                <span className="score-total">/ 5</span>
              </div>
              <p className="rank-text">
                {score === 5 ? (lang === 'ko' ? '당신은 진정한 스왑 마스터입니다! 👨‍🔬' : 'You are a true Swap Master! 👨‍🔬') :
                 score >= 3 ? (lang === 'ko' ? '요리 과학에 재능이 있으시군요! 🍳' : 'You have a talent for culinary science! 🍳') :
                 (lang === 'ko' ? '조금 더 연구가 필요해 보입니다. 🧪' : 'More research is needed in the lab. 🧪')}
              </p>

              <div className="result-actions">
                <button className="btn btn-primary" onClick={startNewGame}>
                  <RefreshCcw size={18} style={{ marginRight: '8px' }} />
                  {lang === 'ko' ? '다시 도전' : 'Try Again'}
                </button>
                <button className="btn btn-outline" onClick={() => window.location.href = '/'}>
                  {lang === 'ko' ? '홈으로' : 'Home'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />

      <style jsx>{`
        .quiz-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: radial-gradient(circle at center, #111 0%, #000 100%);
        }
        .quiz-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
        }
        .quiz-card {
          width: 100%;
          max-width: 600px;
          padding: 64px;
          text-align: center;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .icon-badge {
          width: 80px;
          height: 80px;
          background: rgba(245, 158, 11, 0.1);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 32px;
        }
        h1 {
          font-size: 48px;
          margin-bottom: 16px;
        }
        p {
          color: var(--text-secondary);
          font-size: 18px;
          margin-bottom: 40px;
        }
        .start-btn {
          padding: 16px 32px;
          font-size: 18px;
        }
        
        .quiz-progress {
          margin-bottom: 40px;
          text-align: left;
        }
        .quiz-progress span {
          font-size: 14px;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }
        .progress-bar {
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          margin-top: 12px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: var(--brand-primary);
          transition: width 0.4s ease;
        }
        
        .question-text {
          font-size: 32px;
          margin-bottom: 48px;
          line-height: 1.3;
        }
        .options-grid {
          display: grid;
          gap: 16px;
        }
        .option-btn {
          padding: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 18px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }
        .option-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--text-muted);
        }
        .option-btn.correct {
          background: rgba(16, 185, 129, 0.2);
          border-color: var(--brand-success);
          color: #fff;
        }
        .option-btn.wrong {
          background: rgba(239, 68, 68, 0.2);
          border-color: var(--brand-danger);
          color: #fff;
        }
        
        .trophy-icon {
          color: var(--brand-primary);
          margin-bottom: 24px;
        }
        .final-score {
          margin-bottom: 24px;
        }
        .score-num {
          font-size: 84px;
          font-weight: 800;
          color: var(--brand-primary);
        }
        .score-total {
          font-size: 32px;
          color: var(--text-muted);
        }
        .result-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
        }
        
        @media (max-width: 600px) {
          .quiz-card {
            padding: 32px;
          }
          h1 { font-size: 32px; }
          .question-text { font-size: 24px; }
        }
      `}</style>
    </div>
  );
}

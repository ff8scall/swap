"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';
import useTranslation from '@/lib/i18n/useTranslation';

export default function RequestModal({ isOpen, onClose }) {
  const { t, lang } = useTranslation();
  const [formData, setFormData] = useState({ ingredient: '', reason: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ ingredient: '', reason: '' });
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay">
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className="request-modal glass-card"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button className="close-btn" onClick={onClose}>
              <X size={20} />
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="request-form">
                <div className="form-header">
                  <Sparkles className="brand-primary" size={28} />
                  <h2>{lang === 'ko' ? '대체제 요청하기' : 'Request a Swap'}</h2>
                  <p>{lang === 'ko' ? '찾으시는 재료가 없나요? 연구팀에 제보해주세요.' : "Can't find an ingredient? Let our lab know."}</p>
                </div>

                <div className="input-group">
                  <label>{lang === 'ko' ? '재료명' : 'Ingredient Name'}</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Tamarind Paste"
                    value={formData.ingredient}
                    onChange={(e) => setFormData({...formData, ingredient: e.target.value})}
                  />
                </div>

                <div className="input-group">
                  <label>{lang === 'ko' ? '용도 (선택)' : 'Intended Use (Optional)'}</label>
                  <textarea 
                    placeholder="e.g. Making Pad Thai, looking for tanginess."
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  />
                </div>

                <button type="submit" className="btn btn-primary submit-btn">
                  <Send size={18} style={{ marginRight: '8px' }} />
                  {lang === 'ko' ? '요청 제출' : 'Submit Request'}
                </button>
              </form>
            ) : (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="success-icon">✅</div>
                <h3>{lang === 'ko' ? '성공적으로 접수되었습니다!' : 'Request Received!'}</h3>
                <p>{lang === 'ko' ? '셰프와 과학자들이 곧 분석에 착수하겠습니다.' : 'Our chefs and scientists are on it.'}</p>
              </motion.div>
            )}
          </motion.div>

          <style jsx>{`
            .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 2000;
              padding: 20px;
            }
            .modal-backdrop {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.8);
              backdrop-filter: blur(8px);
            }
            .request-modal {
              width: 100%;
              max-width: 500px;
              position: relative;
              background: #111;
              padding: 48px;
              border: 1px solid var(--glass-border);
              box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
            }
            .close-btn {
              position: absolute;
              top: 24px;
              right: 24px;
              background: transparent;
              border: none;
              color: var(--text-muted);
              cursor: pointer;
              transition: color 0.2s;
            }
            .close-btn:hover {
              color: var(--text-primary);
            }
            .form-header {
              text-align: center;
              margin-bottom: 32px;
            }
            .form-header h2 {
              font-size: 28px;
              margin: 16px 0 8px;
            }
            .form-header p {
              color: var(--text-secondary);
              font-size: 15px;
            }
            .input-group {
              margin-bottom: 24px;
            }
            .input-group label {
              display: block;
              font-size: 13px;
              font-weight: 600;
              color: var(--text-muted);
              margin-bottom: 8px;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            input, textarea {
              width: 100%;
              padding: 14px;
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid var(--glass-border);
              border-radius: 8px;
              color: white;
              font-size: 16px;
              transition: border-color 0.2s;
            }
            input:focus, textarea:focus {
              outline: none;
              border-color: var(--brand-primary);
            }
            textarea {
              height: 100px;
              resize: none;
            }
            .submit-btn {
              width: 100%;
              padding: 16px;
              font-size: 16px;
              border-radius: 8px;
            }
            .success-message {
              text-align: center;
              padding: 40px 0;
            }
            .success-icon {
              font-size: 48px;
              margin-bottom: 24px;
            }
            .success-message h3 {
              font-size: 24px;
              margin-bottom: 12px;
            }
            .success-message p {
              color: var(--text-secondary);
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}

"use client";
import React, { useState } from 'react';
import useTranslation from '@/lib/i18n/useTranslation';

export default function SwapCard({ ingredient, substitute }) {
  const { t, lang } = useTranslation();
  const [amount, setAmount] = useState(1);
  const [isFlipped, setIsFlipped] = useState(false);

  const calculateTarget = (val, ratio) => {
    const min = (val * ratio.target_min).toFixed(1);
    const max = (val * ratio.target_max).toFixed(1);
    return min === max ? min : `${min} - ${max}`;
  };

  const formatUnit = (amt, unitKey, ingredientName) => {
    const unit = t(`units.${unitKey}`) || unitKey;
    if (lang === 'ko') {
      return `${ingredientName} ${amt} ${unit}`;
    }
    return `${amt} ${unit} of ${ingredientName}`;
  };

  return (
    <div className="swap-card glass-card">
      <div className="card-header">
        <div className="status-badge">
          <span className="dot"></span> {t('swap.ai_generated')}
        </div>
        <div className="score-badge">
          {substitute.similarity_score}% {t('swap.why_this_works')}
        </div>
      </div>

      <div className="card-main">
        <div className="source-area">
          <p className="label">{t('swap.if_you_need')}</p>
          <div className="input-group">
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              className="amount-input"
            />
            <span className="unit">
              {lang === 'ko' 
                ? `${ingredient.name[lang]} ${t(`units.${substitute.ratio.unit}`)}`
                : `${t(`units.${substitute.ratio.unit}`)} of ${ingredient.name[lang]}`
              }
            </span>
          </div>
        </div>

        <div className="swap-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
        </div>

        <div className="target-area">
          <p className="label">{t('swap.swap_it_with')}</p>
          <div className="result-group">
            <span className="result-amount brand-gradient">
              {calculateTarget(amount, substitute.ratio)}
            </span>
            <span className="unit">
              {lang === 'ko'
                ? `${substitute.name[lang]} ${t(`units.${substitute.ratio.unit}`)}`
                : `${t(`units.${substitute.ratio.unit}`)} of ${substitute.name[lang]}`
              }
            </span>
          </div>
        </div>
      </div>

      <div className="card-details">
        <div className="detail-item">
          <span className="detail-label">{t('swap.chemical_impact')}:</span>
          <p className="detail-text">{substitute.chemical_impact[lang]}</p>
        </div>
        <div className="detail-item alert-box">
          <span className="detail-label text-warning">⚠️ {t('swap.pro_hack')}:</span>
          <p className="detail-text">{substitute.compensation_action[lang]}</p>
        </div>
      </div>

      <button className="btn-toggle" onClick={() => setIsFlipped(!isFlipped)}>
        {isFlipped ? t('swap.hide_science') : t('swap.show_science')}
      </button>

      {isFlipped && (
        <div className="science-drawer">
          <h4>{t('swap.why_this_works')}</h4>
          <p>{substitute.why_it_works[lang]}</p>
          <div className="oops-box">
            <strong>{t('swap.oops_insurance')}:</strong>
            <p>{substitute.oops_insurance[lang]}</p>
          </div>
        </div>
      )}


      <style jsx>{`
        .swap-card {
          max-width: 500px;
          margin: 20px auto;
          position: relative;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        .status-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-muted);
          background: rgba(255,255,255,0.05);
          padding: 4px 10px;
          border-radius: 20px;
        }
        .status-badge .dot {
          width: 6px;
          height: 6px;
          background: var(--brand-success);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--brand-success);
        }
        .score-badge {
          font-weight: 600;
          color: var(--brand-primary);
          font-size: 14px;
        }
        .card-main {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
        }
        .label {
          font-size: 13px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }
        .input-group, .result-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .amount-input {
          width: 80px;
          background: var(--bg-accent);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          padding: 8px;
          color: var(--text-primary);
          font-size: 20px;
          font-weight: 600;
          text-align: center;
        }
        .unit {
          font-size: 16px;
          color: var(--text-secondary);
        }
        .swap-arrow {
          color: var(--text-muted);
          opacity: 0.5;
        }
        .result-amount {
          font-size: 32px;
          font-weight: 700;
        }
        .card-details {
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-top: 1px solid var(--glass-border);
          padding-top: 20px;
        }
        .detail-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
          display: block;
          margin-bottom: 4px;
        }
        .detail-text {
          font-size: 14px;
          color: var(--text-secondary);
        }
        .alert-box {
          background: rgba(245, 158, 11, 0.05);
          padding: 12px;
          border-radius: 8px;
          border-left: 3px solid var(--brand-primary);
        }
        .text-warning {
          color: var(--brand-primary);
        }
        .btn-toggle {
          width: 100%;
          margin-top: 20px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 13px;
          cursor: pointer;
          text-decoration: underline;
        }
        .science-drawer {
          margin-top: 20px;
          padding: 16px;
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
          animation: slideDown 0.3s ease-out;
        }
        .science-drawer h4 {
          font-size: 15px;
          margin-bottom: 10px;
          color: var(--text-primary);
        }
        .science-drawer p {
          font-size: 14px;
          color: var(--text-secondary);
        }
        .oops-box {
          margin-top: 16px;
          padding: 12px;
          border: 1px dashed var(--glass-border);
          border-radius: 8px;
        }
        .oops-box strong {
          font-size: 13px;
          color: var(--brand-success);
          display: block;
          margin-bottom: 4px;
        }
        @media (max-height: 500px) and (orientation: landscape) {
          .swap-card {
            max-width: 95vw;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            padding: 12px 24px;
          }
          .card-header, .card-details, .btn-toggle, .science-drawer {
            display: none !important;
          }
          .card-main {
            flex-direction: row;
            justify-content: space-around;
            margin: 0;
            grid-column: span 2;
          }
          .amount-input {
            width: 120px;
            font-size: 32px;
          }
          .result-amount {
            font-size: 48px;
          }
          .swap-arrow {
            transform: rotate(-90deg);
          }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

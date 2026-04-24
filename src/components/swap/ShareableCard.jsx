"use client";
import React from 'react';
import useTranslation from '@/lib/i18n/useTranslation';

export default function ShareableCard({ ingredient, substitute }) {
  const { t, lang } = useTranslation();

  if (!substitute) return null; // Or render a placeholder if preferred

  return (
    <div id="share-card" className="share-card">
      <div className="card-overlay"></div>
      <div className="card-inner">
        <header className="card-header">
          <span className="brand-label">Swap.sia</span>
          <span className="category-tag">{ingredient.category?.[lang] || ''}</span>
        </header>

        <div className="main-content">
          <h2 className="title">{lang === 'ko' ? `${ingredient.name?.[lang] || ''} 대체제` : `${ingredient.name?.en || ''} Substitute`}</h2>
          
          <div className="swap-visual">
            <div className="swap-item source">
              <span className="amount">1</span>
              <span className="unit">{substitute.ratio?.unit || 'unit'}</span>
              <span className="name">{ingredient.name?.[lang] || ''}</span>
            </div>
            
            <div className="swap-arrow">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
              </svg>
            </div>

            <div className="swap-item target brand-gradient-bg">
              <span className="amount">{substitute.ratio?.target_min || 1}-{substitute.ratio?.target_max || 1}</span>
              <span className="unit">{substitute.ratio?.unit || 'unit'}</span>
              <span className="name">{substitute.name?.[lang] || ''}</span>
            </div>
          </div>
        </div>

        <footer className="card-footer">
          <div className="pro-tip">
            <span className="tip-label">💡 {t('swap.pro_hack')}</span>
            <p className="tip-text">{substitute?.compensation_action?.[lang] || ""}</p>
          </div>
          {substitute?.oops_insurance && (
            <div className="pro-tip" style={{ marginTop: '20px', borderLeftColor: '#10b981' }}>
              <span className="tip-label" style={{ color: '#10b981' }}>🛡️ {t('swap.oops_insurance')}</span>
              <p className="tip-text">{substitute.oops_insurance?.[lang] || ""}</p>
            </div>
          )}
          <p className="domain">www.swap.lego-sia.com</p>
        </footer>
      </div>

      <style jsx>{`
        .share-card {
          width: 1080px;
          height: 1350px;
          background: #0f172a;
          color: white;
          padding: 80px;
          position: relative;
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
          /* Hidden by default, only for export */
          position: fixed;
          left: -9999px;
        }
        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 100% 0%, rgba(245, 158, 11, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 0% 100%, rgba(245, 158, 11, 0.1) 0%, transparent 50%);
          z-index: 1;
        }
        .card-inner {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 120px;
        }
        .brand-label {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #f59e0b;
        }
        .category-tag {
          font-size: 24px;
          font-weight: 600;
          background: rgba(255,255,255,0.1);
          padding: 12px 24px;
          border-radius: 100px;
          text-transform: uppercase;
        }
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 80px;
        }
        .title {
          font-size: 72px;
          font-weight: 800;
          text-align: center;
          line-height: 1.1;
        }
        .swap-visual {
          display: flex;
          align-items: center;
          gap: 60px;
          width: 100%;
        }
        .swap-item {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 2px solid rgba(255,255,255,0.1);
          border-radius: 40px;
          padding: 60px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .swap-item.target {
          background: #f59e0b;
          color: black;
          border: none;
        }
        .amount {
          font-size: 120px;
          font-weight: 900;
          line-height: 1;
        }
        .unit {
          font-size: 32px;
          opacity: 0.8;
          font-weight: 600;
        }
        .name {
          font-size: 40px;
          font-weight: 700;
          margin-top: 20px;
          text-align: center;
        }
        .swap-arrow {
          opacity: 0.5;
        }
        .card-footer {
          margin-top: auto;
        }
        .pro-tip {
          background: rgba(245, 158, 11, 0.1);
          border-left: 10px solid #f59e0b;
          padding: 40px;
          border-radius: 20px;
          margin-bottom: 60px;
        }
        .tip-label {
          font-size: 28px;
          font-weight: 700;
          color: #f59e0b;
          display: block;
          margin-bottom: 16px;
        }
        .tip-text {
          font-size: 32px;
          line-height: 1.5;
          color: #cbd5e1;
        }
        .domain {
          text-align: center;
          font-size: 24px;
          color: #64748b;
          letter-spacing: 0.1em;
        }
      `}</style>
    </div>
  );
}

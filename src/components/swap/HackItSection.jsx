"use client";
import React from 'react';
import useTranslation from '@/lib/i18n/useTranslation';

export default function HackItSection({ substitute }) {
  const { t, lang } = useTranslation();

  return (
    <div className="hack-container glass-card">
      <div className="hack-header">
        <span className="hack-icon">💡</span>
        <h3 className="brand-gradient">{t('swap.hack_it_title')}</h3>
      </div>
      <p className="hack-description">
        {t('swap.hack_it_desc')}
      </p>
      
      <div className="hack-content">
        <div className="hack-item">
          <strong>{t('swap.pro_hack')}:</strong>
          <p>{substitute.compensation_action[lang]}</p>
        </div>
        {substitute?.oops_insurance && (
          <div className="hack-item">
            <strong>{t('swap.oops_insurance')}:</strong>
            <p>{substitute.oops_insurance[lang]}</p>
          </div>
        )}
      </div>


      <style jsx>{`
        .hack-container {
          margin-top: 40px;
          border-left: 4px solid var(--brand-primary);
          background: rgba(245, 158, 11, 0.03);
        }
        .hack-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .hack-icon {
          font-size: 24px;
        }
        .hack-header h3 {
          font-size: 20px;
          margin: 0;
        }
        .hack-description {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 24px;
          font-style: italic;
        }
        .hack-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .hack-item strong {
          display: block;
          font-size: 13px;
          color: var(--brand-primary);
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        .hack-item p {
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-primary);
        }
        @media (max-width: 768px) {
          .hack-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

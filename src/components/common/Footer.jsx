"use client";
import React from 'react';
import useTranslation from '@/lib/i18n/useTranslation';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <p className="footer-logo brand-gradient">Global Ingredient Swap | Lego-Sia</p>
          <p className="footer-tagline">{t('common.footer_tagline')}</p>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>© 2026 Swap.lego-sia - Part of the Lego-Sia Ecosystem. All rights reserved.</p>
      </div>
      <style jsx>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--glass-border);
          padding: 60px 0 32px;
          margin-top: 80px;
        }
        .footer-inner {
          display: flex;
          justify-content: center;
          text-align: center;
          margin-bottom: 40px;
        }
        .footer-logo {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 20px;
          margin-bottom: 12px;
        }
        .footer-tagline {
          color: var(--text-secondary);
          font-size: 14px;
          max-width: 460px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .footer-bottom {
          padding-top: 24px;
          border-top: 1px solid var(--glass-border);
          text-align: center;
          color: var(--text-muted);
          font-size: 12px;
        }
      `}</style>
    </footer>
  );
}

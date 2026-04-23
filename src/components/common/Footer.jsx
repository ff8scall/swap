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

        <div className="footer-links">
          <div className="footer-column">
            <h4>Categories</h4>
            <a href="#">Baking</a>
            <a href="#">K-Food</a>
            <a href="#">Vegan</a>
            <a href="#">Dairy-Free</a>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <a href="#">Conversion Table</a>
            <a href="#">Flavor Science</a>
            <a href="#">API Documentation</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>© 2026 Swap.lego-sia - Part of the Lego-Sia Ecosystem. All rights reserved.</p>
      </div>
      <style jsx>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--glass-border);
          padding: 64px 0 32px;
          margin-top: 100px;
        }
        .footer-inner {
          display: flex;
          justify-content: space-between;
          margin-bottom: 64px;
        }
        .footer-logo {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 18px;
          margin-bottom: 12px;
        }
        .footer-tagline {
          color: var(--text-secondary);
          font-size: 14px;
          max-width: 240px;
        }
        .footer-links {
          display: flex;
          gap: 64px;
        }
        .footer-column h4 {
          font-size: 14px;
          margin-bottom: 20px;
          color: var(--text-primary);
        }
        .footer-column a {
          display: block;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 12px;
          transition: var(--transition-smooth);
        }
        .footer-column a:hover {
          color: var(--brand-primary);
        }
        .footer-bottom {
          padding-top: 32px;
          border-top: 1px solid var(--glass-border);
          text-align: center;
          color: var(--text-muted);
          font-size: 12px;
        }
        @media (max-width: 768px) {
          .footer-inner {
            flex-direction: column;
            gap: 48px;
          }
          .footer-links {
            gap: 32px;
          }
        }
      `}</style>
    </footer>
  );
}

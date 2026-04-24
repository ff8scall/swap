"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useTranslation from '@/lib/i18n/useTranslation';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Header() {
  const { t, lang } = useTranslation();
  const { toggleLang } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          <span className="brand-gradient">Swap</span>
          <span className="logo-dot">.</span>
          <span className="logo-suffix">lego-sia</span>
        </Link>
        <nav className="nav">
          <div className="header-search">
            <form onSubmit={handleSearch} className="search-form">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder={t('common.search_placeholder')} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </form>
          </div>

          <Link href="/explore" className="nav-link">{t('common.explore')}</Link>

          <Link href="/about" className="nav-link">{t('common.science')}</Link>
          
          <div className="lang-switcher">
            <button 
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`} 
              onClick={() => toggleLang('en')}
            >EN</button>
            <span className="lang-sep">|</span>
            <button 
              className={`lang-btn ${lang === 'ko' ? 'active' : ''}`} 
              onClick={() => toggleLang('ko')}
            >KO</button>
          </div>


        </nav>
      </div>

      <style jsx>{`
        .header {
          height: var(--header-height);
          border-bottom: 1px solid var(--glass-border);
          position: sticky;
          top: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(12px);
          z-index: 100;
        }
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }
        .logo {
          font-family: 'Outfit', sans-serif;
          font-size: 24px;
          font-weight: 700;
          text-decoration: none;
          display: flex;
          align-items: center;
        }
        .logo-dot {
          color: var(--brand-primary);
        }
        .logo-suffix {
          color: var(--text-secondary);
          font-weight: 400;
          font-size: 18px;
          margin-left: 2px;
        }
        .nav {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        
        /* Header Search Styles */
        .header-search {
          margin-right: 8px;
        }
        .search-form {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: 100px;
          padding: 6px 16px;
          transition: all 0.3s ease;
        }
        .search-form:focus-within {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--brand-primary);
          box-shadow: 0 0 15px rgba(245, 158, 11, 0.2);
        }
        .search-icon {
          font-size: 14px;
          margin-right: 8px;
          opacity: 0.6;
        }
        .search-input {
          background: transparent;
          border: none;
          color: white;
          font-size: 13px;
          outline: none;
          width: 140px;
          transition: width 0.3s ease;
        }
        .search-input:focus {
          width: 200px;
        }

        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: var(--transition-smooth);
        }
        .nav-link:hover {
          color: var(--text-primary);
        }

        .btn-sm {
          padding: 8px 16px;
          font-size: 13px;
        }
        .lang-switcher {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          padding: 2px 8px;
          border-radius: 20px;
          border: 1px solid var(--glass-border);
        }
        .lang-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          padding: 4px 6px;
          transition: var(--transition-smooth);
        }
        .lang-btn.active {
          color: var(--brand-primary);
        }
        .lang-sep {
          color: var(--glass-border);
          font-size: 10px;
        }
        @media (max-width: 1024px) {
          .header-search {
            display: none;
          }
        }
        @media (max-width: 768px) {
          .nav {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}

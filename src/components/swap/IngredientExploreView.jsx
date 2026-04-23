"use client";
import React, { useState, useMemo, useEffect } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import useTranslation from '@/lib/i18n/useTranslation';

export default function IngredientExploreView({ ingredients }) {
  const { t, lang } = useTranslation();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Sync search query with URL parameter
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Extract unique categories for tabs
  const categories = useMemo(() => {
    const cats = new Set();
    ingredients.forEach(ing => cats.add(ing.category.en)); // Use EN as internal key
    return ['All', ...Array.from(cats)];
  }, [ingredients]);

  // Unified Filter Logic
  const filteredIngredients = useMemo(() => {
    return ingredients.filter(ing => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        ing.name[lang].toLowerCase().includes(q) ||
        ing.name.en.toLowerCase().includes(q) ||
        ing.category[lang].toLowerCase().includes(q) ||
        ing.description[lang].toLowerCase().includes(q) ||
        ing.substitutes.some(s => s.name[lang].toLowerCase().includes(q));
      
      const matchesCategory = 
        selectedCategory === 'All' || ing.category.en === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [ingredients, searchQuery, selectedCategory, lang]);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container explore-container">
        <header className="explore-header">
          <h1 className="text-gradient explore-title">{t('common.explore_title')}</h1>
          <p className="explore-subtitle">{t('common.explore_subtitle')}</p>
        </header>

        <div className="filter-bar glass-card">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder={t('common.search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="category-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat === 'All' ? t('common.all_categories') : 
                  ingredients.find(i => i.category.en === cat)?.category[lang]}
              </button>
            ))}
          </div>
        </div>

        <div className="ingredient-grid">
          {filteredIngredients.length > 0 ? (
            filteredIngredients.map((ing) => (
              <Link href={`/explore/${ing.id}`} key={ing.id} className="ingredient-card glass-card">
                <div className="card-top">
                  <span className="category-badge">{ing.category[lang]}</span>
                  <span className="substitute-dot"></span>
                </div>
                
                <div className="card-content">
                  <h3>{ing.name[lang]}</h3>
                  <div className="desc-wrapper">
                    <p>{ing.description[lang]}</p>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="stats">
                    <span className="stat-label">{t('common.substitutes_label')}</span>
                    <span className="stat-value">{ing.substitutes.length}</span>
                  </div>
                  <div className="action-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                <div className="card-glow"></div>
              </Link>
            ))
          ) : (
            <div className="no-results">
              <p>No ingredients found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .explore-container {
          padding: 80px 24px 120px;
        }
        .explore-header {
          margin-bottom: 48px;
          max-width: 600px;
        }
        .explore-title {
          font-size: 56px;
          font-weight: 700;
          margin-bottom: 16px;
          line-height: 1.1;
        }
        .explore-subtitle {
          color: var(--text-secondary);
          font-size: 18px;
          font-weight: 400;
        }
        
        /* Filter Bar Styles */
        .filter-bar {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 24px;
          margin-bottom: 48px;
          background: rgba(255, 255, 255, 0.03);
        }
        
        .search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search-icon {
          position: absolute;
          left: 16px;
          font-size: 18px;
          opacity: 0.5;
        }
        
        .search-input {
          width: 100%;
          padding: 16px 16px 16px 48px;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 16px;
          transition: var(--transition-smooth);
        }
        
        .search-input:focus {
          outline: none;
          border-color: var(--brand-primary);
          background: rgba(0, 0, 0, 0.4);
        }
        
        .category-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        
        .category-tab {
          padding: 8px 20px;
          border-radius: 100px;
          border: 1px solid var(--glass-border);
          background: transparent;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        
        .category-tab:hover {
          border-color: var(--text-muted);
          color: var(--text-primary);
        }
        
        .category-tab.active {
          background: var(--brand-primary);
          border-color: var(--brand-primary);
          color: #000;
          font-weight: 600;
        }
        
        .ingredient-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 32px;
        }
        
        .ingredient-card {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 32px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: 380px;
        }
        
        .ingredient-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(245, 158, 11, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        
        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .category-badge {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--brand-primary);
          background: rgba(245, 158, 11, 0.1);
          padding: 4px 10px;
          border-radius: 100px;
          letter-spacing: 0.1em;
        }
        
        .substitute-dot {
          width: 6px;
          height: 6px;
          background: var(--brand-primary);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--brand-primary);
        }
        
        .card-content h3 {
          font-size: 24px;
          margin-bottom: 12px;
          color: var(--text-primary);
          font-weight: 600;
        }
        
        .desc-wrapper {
          height: 80px;
          overflow: hidden;
        }

        .card-content p {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        
        .card-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 24px;
          border-top: 1px solid var(--glass-border);
        }
        
        .stats {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .stat-label {
          font-size: 11px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .stat-value {
          font-size: 18px;
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
          color: var(--text-primary);
        }
        
        .action-arrow {
          color: var(--text-muted);
          transition: var(--transition-smooth);
        }
        
        .ingredient-card:hover .action-arrow {
          color: var(--brand-primary);
          transform: translateX(4px);
        }
        
        .card-glow {
          position: absolute;
          top: 0;
          right: 0;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .ingredient-card:hover .card-glow {
          opacity: 1;
        }
        
        .no-results {
          grid-column: 1 / -1;
          padding: 100px 0;
          text-align: center;
          color: var(--text-muted);
          font-size: 18px;
        }

        @media (max-width: 768px) {
          .explore-title {
            font-size: 40px;
          }
          .ingredient-grid {
            grid-template-columns: 1fr;
          }
          .ingredient-card {
            height: auto;
            min-height: 340px;
          }
          .filter-bar {
            padding: 16px;
          }
        }
      `}</style>
    </main>
  );
}

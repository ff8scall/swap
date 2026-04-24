"use client";
import React, { useState, useMemo } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Link from 'next/link';
import useTranslation from '@/lib/i18n/useTranslation';

export default function IngredientExploreView({ ingredients }) {
  const { t, lang } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Dynamically extract categories from ingredients data
  const categories = useMemo(() => {
    const catsMap = new Map();
    ingredients.forEach(ing => {
      if (ing.category?.en) {
        catsMap.set(ing.category.en, ing.category);
      }
    });
    return ['All', ...Array.from(catsMap.values())];
  }, [ingredients]);

  // Unified Filter Logic
  const filteredIngredients = useMemo(() => {
    return ingredients.filter(ing => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        (ing.name?.[lang]?.toLowerCase().includes(q) || false) ||
        (ing.name?.en?.toLowerCase().includes(q) || false) ||
        (ing.search_keywords?.[lang]?.some(s => s.toLowerCase().includes(q)) || false) ||
        (ing.search_keywords?.en?.some(s => s.toLowerCase().includes(q)) || false) ||
        (ing.category?.[lang]?.toLowerCase().includes(q) || false) ||
        (ing.description?.[lang]?.toLowerCase().includes(q) || false) ||
        (ing.substitutes?.some(s => s.name?.[lang]?.toLowerCase().includes(q)) || false);
      
      const matchesCategory = 
        selectedCategory === 'All' || ing.category?.en === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [ingredients, searchQuery, selectedCategory, lang]);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container explore-container">
        <header className="explore-header">
          <div className="title-row">
            <h1 className="text-gradient explore-title">{t('common.explore_title')}</h1>
            <div className="count-badge">{filteredIngredients.length} {t('common.items_count')}</div>
          </div>
          
          <div className="filter-bar glass-card">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder={t('common.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
             <div className="category-chips">
              {categories.map(cat => {
                const isAll = cat === 'All';
                const label = isAll ? t('common.all_categories') : (cat[lang] || cat.en);
                const value = isAll ? 'All' : cat.en;
                
                return (
                  <button 
                    key={value}
                    className={`chip ${selectedCategory === value ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(value)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        <div className="ingredients-grid">
          {filteredIngredients.map(ing => (
            <Link href={`/explore/${ing.id}`} key={ing.id} className="ingredient-card-link">
              <article className="ingredient-card glass-card">
                <div className="card-top">
                  <div className="icon-badge">
                    <img 
                      src={`/images/thumbnails/${ing.id}.webp`} 
                      alt="" 
                      className="thumb-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <span className="emoji-fallback" style={{ display: 'none' }}>{ing.icon || '🧂'}</span>
                  </div>
                  <div className="name-meta">
                    <h3>{ing.name?.[lang] || ing.id}</h3>
                    <span className="category-label">{ing.category?.[lang] || ''}</span>
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="roles-container">
                    {ing.culinary_roles?.slice(0, 1).map(role => (
                      <span key={role} className="role-mini-tag">@{t(`roles.${role}`) || role}</span>
                    ))}
                  </div>
                  <div className="desc-wrapper">
                    <p>{ing.description?.[lang] || ''}</p>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="stats">
                    <span className="stat-label">{t('common.substitutes_label')}</span>
                    <span className="stat-value">{ing.substitutes?.length || 0}</span>
                  </div>
                  <div className="action-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .explore-container {
          padding: 60px 0 100px;
        }
        .explore-header {
          margin-bottom: 48px;
        }
        .title-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
        }
        .explore-title {
          font-size: 40px;
          font-weight: 800;
        }
        .count-badge {
          background: rgba(245, 158, 11, 0.1);
          color: var(--brand-primary);
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 700;
        }
        .filter-bar {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 0 16px;
          transition: all 0.3s ease;
        }
        .search-box:focus-within {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--brand-primary);
        }
        .search-box input {
          width: 100%;
          background: transparent;
          border: none;
          color: white;
          padding: 14px 12px;
          font-size: 16px;
          outline: none;
        }
        .search-icon {
          opacity: 0.6;
        }
        .category-chips {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .chip {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          padding: 8px 18px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .chip:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .chip.active {
          background: var(--brand-primary);
          color: #000;
          border-color: var(--brand-primary);
        }

        .ingredients-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }
        .ingredient-card-link {
          text-decoration: none;
        }
        .ingredient-card {
          height: 100%;
          padding: 28px;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .ingredient-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(245, 158, 11, 0.3);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(245, 158, 11, 0.1);
        }
        .card-top {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }
        .icon-badge {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          border: 1px solid var(--glass-border);
          overflow: hidden;
          flex-shrink: 0;
          transition: all 0.4s ease;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
        }
        .thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .ingredient-card:hover .icon-badge {
          border-color: var(--brand-primary);
          transform: rotate(-5deg);
        }
        .ingredient-card:hover .thumb-img {
          transform: scale(1.15);
        }
        .name-meta h3 {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .category-label {
          font-size: 12px;
          color: var(--brand-primary);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .card-body {
          flex: 1;
        }
        .roles-container {
          margin-bottom: 16px;
          display: flex;
          gap: 6px;
        }
        .role-mini-tag {
          font-size: 10px;
          background: rgba(59, 130, 246, 0.1);
          color: #60a5fa;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .desc-wrapper p {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-footer {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--glass-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .stat-label {
          font-size: 12px;
          color: var(--text-muted);
          display: block;
        }
        .stat-value {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .action-arrow {
          color: var(--brand-primary);
          opacity: 0.6;
          transition: all 0.3s ease;
        }
        .ingredient-card:hover .action-arrow {
          opacity: 1;
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .explore-title {
            font-size: 32px;
          }
          .ingredients-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}

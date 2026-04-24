"use client";
import React, { useState, useMemo } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Link from 'next/link';
import useTranslation from '@/lib/i18n/useTranslation';

export default function IngredientExploreView({ ingredients }) {
  const { t, lang } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [excludeAllergens, setExcludeAllergens] = useState([]);
  const [dietFilter, setDietFilter] = useState('All');
  const [compareList, setCompareList] = useState([]);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [viewHistory, setViewHistory] = useState([]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const history = JSON.parse(localStorage.getItem('ingredient_history') || '[]');
      setViewHistory(history);
    }
  }, []);



  const dietOptions = [
    { id: 'All', label: t('common.all_categories') },
    { id: 'vegan', label: t('dietary.vegan') },
    { id: 'dairy-free', label: t('dietary.dairy-free') },
    { id: 'gluten-free', label: t('dietary.gluten-free') }
  ];

  const allergenOptions = [
    { id: 'nuts', label: t('allergens.nuts') },
    { id: 'soy', label: t('allergens.soy') },
    { id: 'sesame', label: t('allergens.sesame') }
  ];

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
      // 1. Category Filter
      if (selectedCategory !== 'All' && ing.category?.en !== selectedCategory) return false;

      // 2. Search Filter
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        !q ||
        (ing.name?.[lang]?.toLowerCase().includes(q) || false) ||
        (ing.name?.en?.toLowerCase().includes(q) || false) ||
        (ing.search_keywords?.[lang]?.some(s => s.toLowerCase().includes(q)) || false) ||
        (ing.search_keywords?.en?.some(s => s.toLowerCase().includes(q)) || false) ||
        (ing.category?.[lang]?.toLowerCase().includes(q) || false) ||
        (ing.description?.[lang]?.toLowerCase().includes(q) || false) ||
        (ing.substitutes?.some(s => s.name?.[lang]?.toLowerCase().includes(q)) || false);
      
      if (!matchesSearch) return false;

      // 3. Allergen Exclusion Filter
      if (excludeAllergens.length > 0) {
        const hasExcludedAllergen = ing.allergens?.some(a => excludeAllergens.includes(a));
        if (hasExcludedAllergen) return false;
      }

      // 4. Diet Filter (Heuristic based on allergens)
      if (dietFilter === 'vegan') {
        const nonVeganAllergens = ['dairy', 'fish', 'molluscs', 'crustaceans', 'eggs'];
        if (ing.allergens?.some(a => nonVeganAllergens.includes(a))) return false;
        // Basic check for animal products in ID/Name
        if (['honey', 'lard', 'gelatin', 'anchovy', 'oyster'].some(kw => ing.id.includes(kw))) return false;
      } else if (dietFilter === 'dairy-free') {
        if (ing.allergens?.includes('dairy')) return false;
      } else if (dietFilter === 'gluten-free') {
        if (ing.allergens?.includes('gluten') || ing.allergens?.includes('wheat')) return false;
      }

      return true;
    });
  }, [ingredients, searchQuery, selectedCategory, excludeAllergens, dietFilter, lang]);


  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container explore-container">
        <header className="explore-header">
          <div className="title-row">
            <h1 className="text-gradient explore-title">{t('common.explore_title')}</h1>
            <div className="count-badge">{filteredIngredients.length} {t('common.items_count')}</div>
            <button 
              className={`compare-mode-toggle ${isCompareMode ? 'active' : ''}`}
              onClick={() => setIsCompareMode(!isCompareMode)}
            >
              ⚖️ {isCompareMode ? 'Exit Compare' : 'Compare'}
            </button>
          </div>

          {viewHistory.length > 0 && (
            <div className="recent-history-section animate-in fade-in slide-in-from-top-4 duration-500">
              <span className="recent-label">🕒 Recently Viewed</span>
              <div className="recent-items-scroll">
                {viewHistory.map(id => {
                  const item = ingredients.find(i => i.id === id);
                  if (!item) return null;
                  return (
                    <Link href={`/explore/${id}`} key={id} className="recent-item-chip glass-card">
                      <img src={`/images/thumbnails/${id}.webp`} alt="" className="recent-thumb" />
                      <span>{item.name?.[lang]}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}


          
          <div className="filter-bar glass-card">
            <div className="search-box-container">
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input 
                  type="text" 
                  placeholder={t('common.search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                />
              </div>
              
              {isSearchFocused && searchQuery.length >= 1 && (
                <div className="search-suggestions glass-card">
                  {ingredients
                    .filter(ing => 
                      ing.name?.[lang]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      ing.name?.en?.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .slice(0, 6)
                    .map(ing => (
                      <button 
                        key={ing.id}
                        className="suggestion-item"
                        onClick={() => {
                          setSearchQuery(ing.name?.[lang] || ing.name?.en);
                          setIsSearchFocused(false);
                        }}
                      >
                        <span className="suggestion-icon">{ing.icon || '🧂'}</span>
                        <span className="suggestion-name">{ing.name?.[lang] || ing.name?.en}</span>
                        <span className="suggestion-cat">{ing.category?.[lang]}</span>
                      </button>
                    ))
                  }
                  {ingredients.filter(ing => 
                      ing.name?.[lang]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      ing.name?.en?.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length === 0 && (
                    <div className="no-suggestions">No results found</div>
                  )}
                </div>
              )}
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

            <div className="advanced-filters">
              <div className="filter-group">
                <span className="group-label">🥗 {t('dietary.vegetarian')}</span>
                <div className="chips-row">
                  {dietOptions.map(diet => (
                    <button 
                      key={diet.id}
                      className={`chip-sm ${dietFilter === diet.id ? 'active' : ''}`}
                      onClick={() => setDietFilter(dietFilter === diet.id ? 'All' : diet.id)}
                    >
                      {diet.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <span className="group-label">🚫 {t('common.allergy_warning')}</span>
                <div className="chips-row">
                  {allergenOptions.map(alg => (
                    <button 
                      key={alg.id}
                      className={`chip-sm ${excludeAllergens.includes(alg.id) ? 'active' : ''}`}
                      onClick={() => {
                        if (excludeAllergens.includes(alg.id)) {
                          setExcludeAllergens(excludeAllergens.filter(a => a !== alg.id));
                        } else {
                          setExcludeAllergens([...excludeAllergens, alg.id]);
                        }
                      }}
                    >
                      {alg.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </header>

        <div className="ingredients-grid">
          {filteredIngredients.map(ing => (
            <div key={ing.id} className="card-wrapper">
              {isCompareMode && (
                <button 
                  className={`compare-check ${compareList.includes(ing.id) ? 'checked' : ''}`}
                  onClick={() => {
                    if (compareList.includes(ing.id)) {
                      setCompareList(compareList.filter(id => id !== ing.id));
                    } else if (compareList.length < 2) {
                      setCompareList([...compareList, ing.id]);
                    }
                  }}
                >
                  {compareList.includes(ing.id) ? '✓' : '+'}
                </button>
              )}
              <Link 
                href={isCompareMode ? '#' : `/explore/${ing.id}`} 
                className={`ingredient-card-link ${isCompareMode && compareList.includes(ing.id) ? 'comparing' : ''}`}
                onClick={(e) => {
                  if (isCompareMode) {
                    e.preventDefault();
                    if (compareList.includes(ing.id)) {
                      setCompareList(compareList.filter(id => id !== ing.id));
                    } else if (compareList.length < 2) {
                      setCompareList([...compareList, ing.id]);
                    }
                  }
                }}
              >
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
            </div>
          ))}
        </div>

        {compareList.length > 0 && (
          <div className="compare-bar glass-card animate-in slide-in-from-bottom duration-300">
            <div className="compare-items">
              {compareList.map(id => {
                const item = ingredients.find(i => i.id === id);
                return (
                  <div key={id} className="compare-item-tag">
                    <span>{item?.icon} {item?.name?.[lang]}</span>
                    <button onClick={() => setCompareList(compareList.filter(cid => cid !== id))}>×</button>
                  </div>
                );
              })}
              {compareList.length < 2 && <span className="compare-hint">Select one more to compare...</span>}
            </div>
            <div className="compare-actions">
              <button 
                className={`compare-btn-primary ${compareList.length === 2 ? 'active' : ''}`}
                disabled={compareList.length < 2}
                onClick={() => {
                   // Navigate to comparison page or show modal
                   window.location.href = `/explore/compare?ids=${compareList.join(',')}`;
                }}
              >
                Compare Now
              </button>
              <button className="compare-btn-close" onClick={() => { setCompareList([]); setIsCompareMode(false); }}>Cancel</button>
            </div>
          </div>
        )}

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
          height: fit-content;
        }
        .compare-mode-toggle {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: white;
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-left: auto;
        }
        .compare-mode-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .compare-mode-toggle.active {
          background: var(--brand-primary);
          color: black;
          border-color: var(--brand-primary);
        }

        .recent-history-section {
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .recent-label {
          font-size: 11px;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .recent-items-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: none;
        }
        .recent-items-scroll::-webkit-scrollbar {
          display: none;
        }
        .recent-item-chip {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 14px 6px 6px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all 0.3s ease;
          border-color: rgba(255, 255, 255, 0.05);
        }
        .recent-item-chip:hover {
          border-color: var(--brand-primary);
          background: rgba(245, 158, 11, 0.05);
          color: white;
          transform: translateY(-2px);
        }
        .recent-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .filter-bar {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .search-box-container {
          position: relative;
          width: 100%;
        }
        .search-suggestions {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          z-index: 100;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.5);
          animation: in-down 0.2s ease-out;
        }
        @keyframes in-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .suggestion-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          border-radius: 8px;
          background: transparent;
          border: none;
          color: var(--text-primary);
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .suggestion-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .suggestion-icon {
          font-size: 18px;
        }
        .suggestion-name {
          font-weight: 600;
          flex: 1;
        }
        .suggestion-cat {
          font-size: 11px;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .no-suggestions {
          padding: 16px;
          text-align: center;
          color: var(--text-muted);
          font-size: 14px;
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

        .advanced-filters {
          display: flex;
          gap: 24px;
          margin-top: 8px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .group-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .chips-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .chip-sm {
          background: transparent;
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .chip-sm:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .chip-sm.active {
          background: rgba(245, 158, 11, 0.15);
          color: var(--brand-primary);
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

        .card-wrapper {
          position: relative;
        }
        .compare-check {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 10;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.6);
          border: 2px solid white;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .compare-check.checked {
          background: var(--brand-primary);
          border-color: var(--brand-primary);
          color: black;
        }
        .ingredient-card-link.comparing .ingredient-card {
          border-color: var(--brand-primary);
          background: rgba(245, 158, 11, 0.05);
        }

        .compare-bar {
          position: fixed;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 600px;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 200;
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
          border: 1px solid rgba(245, 158, 11, 0.3);
        }
        .compare-items {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .compare-item-tag {
          background: rgba(255, 255, 255, 0.1);
          padding: 6px 12px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
        }
        .compare-item-tag button {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 18px;
          cursor: pointer;
        }
        .compare-hint {
          font-size: 13px;
          color: var(--text-muted);
          font-style: italic;
        }
        .compare-actions {
          display: flex;
          gap: 12px;
        }
        .compare-btn-primary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 700;
          cursor: not-allowed;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        .compare-btn-primary.active {
          background: var(--brand-primary);
          color: black;
          cursor: pointer;
          opacity: 1;
        }
        .compare-btn-close {
          background: transparent;
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          padding: 10px 16px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .explore-title {
            font-size: 32px;
          }
          .ingredients-grid {
            grid-template-columns: 1fr;
          }
          .compare-bar {
            flex-direction: column;
            gap: 16px;
            bottom: 20px;
          }
        }

      `}</style>
    </main>
  );
}

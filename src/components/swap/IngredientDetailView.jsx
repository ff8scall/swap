"use client";
import React from 'react';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SwapCard from '@/components/swap/SwapCard';
import HackItSection from '@/components/swap/HackItSection';
import ShareableCard from '@/components/swap/ShareableCard';
import useTranslation from '@/lib/i18n/useTranslation';
import Script from 'next/script';
import { History, Thermometer, Box, HelpCircle, Heart, ChevronDown, Activity, Zap, Utensils } from 'lucide-react';

export default function IngredientDetailView({ ingredient, bestSubstitute }) {
  const { t, lang } = useTranslation();
  const [isGenerating, setIsGenerating] = React.useState(false);

  const downloadCard = async () => {
    if (typeof window === 'undefined' || !window.htmlToImage) return;
    
    setIsGenerating(true);
    const node = document.getElementById('share-card');
    
    try {
      // Ensure the card is temporarily visible for capture
      node.style.display = 'flex';
      node.style.position = 'fixed';
      node.style.left = '0';
      node.style.top = '0';

      const dataUrl = await window.htmlToImage.toPng(node, {
        quality: 1,
        pixelRatio: 2 // High resolution for SNS
      });

      // Restore hidden state
      node.style.display = 'none';
      node.style.position = 'fixed';
      node.style.left = '-9999px';

      const link = document.createElement('a');
      link.download = `${ingredient.id}-swap-guide.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('oops, something went wrong!', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main 
      className="min-h-screen flex flex-col"
      style={{
        '--ingredient-theme': ingredient.visual_identity?.primary_color || 'var(--brand-primary)',
        '--ingredient-theme-soft': (ingredient.visual_identity?.primary_color || '#f59e0b') + '1A'
      }}
    >
      <Header />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js" 
        strategy="lazyOnload"
      />
      
      <div className="container detail-container">
        <nav className="breadcrumb">
          <Link href="/">{t('common.home')}</Link> / <Link href="/explore">{t('common.explore')}</Link> / {ingredient.name[lang]}
        </nav>

        <section className="detail-hero">
          <div className="detail-title-area">
            <div className="badge-group">
              <span className="category-tag">{ingredient.category[lang]}</span>
              {ingredient.difficulty && (
                <span className={`difficulty-tag difficulty-${ingredient.difficulty}`}>
                  {lang === 'ko' ? `난이도: ${ingredient.difficulty === 'easy' ? '쉬움' : ingredient.difficulty === 'medium' ? '보통' : '어려움'}` : `Difficulty: ${ingredient.difficulty}`}
                </span>
              )}
            </div>
            
            <h1 className="text-gradient theme-text">
              {lang === 'ko' ? `${ingredient.name[lang]}${t('swap.substitute_for')}` : `${t('swap.substitute_for')} ${ingredient.name[lang]}`}
            </h1>
            
            <div className="dietary-tags">
              {ingredient.dietary_tags?.map(tag => (
                <span key={tag} className="dietary-tag">#{tag}</span>
              ))}
            </div>

            <p className="description">{ingredient.description[lang]}</p>
            
            <div className="allergen-alert">
              <span className="alert-icon">⚠️</span>
              <div>
                <strong>{t('swap.allergy_warning')}:</strong>
                <p>
                  {t('swap.primary_sub_desc')} ({bestSubstitute?.name?.[lang] || 'Option'}) 
                  {bestSubstitute?.allergen_warning?.[lang] ? ` ${bestSubstitute.allergen_warning[lang]}` : ` ${t('common.no_allergen_info') || 'No specific allergen info available.'}`}
                </p>
              </div>
              <div className="hero-actions-detail">
                <button 
                  className={`btn ${isGenerating ? 'btn-disabled' : 'btn-outline'}`} 
                  onClick={downloadCard}
                  disabled={isGenerating}
                >
                  {isGenerating ? '⏳ Generating...' : `📥 ${lang === 'ko' ? '인포그래픽 다운로드' : 'Download Infographic'}`}
                </button>
              </div>
            </div>
          </div>


          <div className="detail-swap-card">
            <SwapCard ingredient={ingredient} substitute={bestSubstitute} />
          </div>
        </section>

        {/* Hidden card for social sharing / printing */}
        <ShareableCard ingredient={ingredient} substitute={bestSubstitute} />

        <HackItSection substitute={bestSubstitute} />

        {ingredient.dish_tips && (
          <section className="dish-tips-section glass-card">
            <div className="tips-badge">CHEF'S KICK</div>
            <h2 className="brand-gradient">
              {lang === 'ko' ? '요리별 맞춤 활용 팁' : 'Dish-specific Tips'}
            </h2>
            <p className="tips-content">{ingredient.dish_tips[lang]}</p>
          </section>
        )}

        <section className="science-section glass-card">
          <h2 className="brand-gradient">{t('swap.why_this_works')}</h2>
          <p>{bestSubstitute.why_it_works[lang]}</p>
          <div className="chemical-impact">
            <strong>{t('swap.chemical_impact')}:</strong>
            <p>{bestSubstitute.chemical_impact[lang]}</p>
          </div>
        </section>

        {/* --- SEO & Knowledge Hub Section --- */}
        <section className="knowledge-hub">
          <div className="hub-grid">
            {ingredient.origin_and_history && (
              <div className="hub-card glass-card">
                <div className="hub-header">
                  <History className="brand-primary" size={24} />
                  <h3>{lang === 'ko' ? '기원 및 역사' : 'Origin & History'}</h3>
                </div>
                <p>{ingredient.origin_and_history[lang]}</p>
              </div>
            )}

            {ingredient.storage_tips && (
              <div className="hub-card glass-card">
                <div className="hub-header">
                  <Box className="theme-icon" size={24} />
                  <h3>{lang === 'ko' ? '보관 가이드' : 'Storage Guide'}</h3>
                </div>
                <p>{ingredient.storage_tips[lang]}</p>
              </div>
            )}

            {ingredient.nutrition_highlights && (
              <div className="hub-card glass-card">
                <div className="hub-header">
                  <Activity className="theme-icon" size={24} />
                  <h3>{lang === 'ko' ? '영양 성분' : 'Nutrition'}</h3>
                </div>
                <div className="nutrition-list">
                  {ingredient.nutrition_highlights[lang].map((n, i) => (
                    <div key={i} className="nutrition-item">
                      <Zap size={14} />
                      <span>{n}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hub-bottom-grid">
            {ingredient.flavor_profile && (
              <div className="hub-card glass-card">
                <div className="hub-header">
                  <Thermometer className="brand-primary" size={24} />
                  <h3>{lang === 'ko' ? '맛 프로필' : 'Flavor Profile'}</h3>
                </div>
                <p>{ingredient.flavor_profile[lang]}</p>
              </div>
            )}

            {ingredient.common_pairings && (
              <div className="hub-card glass-card">
                <div className="hub-header">
                  <Heart className="brand-primary" size={24} />
                  <h3>{lang === 'ko' ? '환상의 조합' : 'Perfect Pairings'}</h3>
                </div>
                <div className="pairing-tags">
                  {ingredient.common_pairings.map((p, i) => (
                    <span key={i} className="pairing-tag">{p}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {ingredient.faq && ingredient.faq.length > 0 && (
            <div className="faq-section glass-card">
              <div className="hub-header">
                <HelpCircle className="brand-primary" size={24} />
                <h2>{lang === 'ko' ? '자주 묻는 질문' : 'Frequently Asked Questions'}</h2>
              </div>
              <div className="faq-list">
                {ingredient.faq.map((item, idx) => (
                  <details key={idx} className="faq-item">
                    <summary>
                      {item.question[lang]}
                      <ChevronDown size={16} className="chevron" />
                    </summary>
                    <div className="faq-answer">
                      {item.answer[lang]}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      <Footer />

      <style jsx>{`
        .detail-container {
          padding-top: 40px;
        }
        .breadcrumb {
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 32px;
        }
        .breadcrumb a {
          color: var(--text-muted);
          text-decoration: none;
        }
        .breadcrumb a:hover {
          color: var(--brand-primary);
        }
        .detail-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
          margin-bottom: 60px;
        }
        .category-tag {
          display: inline-block;
          background: rgba(245, 158, 11, 0.1);
          color: var(--brand-primary);
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        .detail-title-area h1 {
          font-size: 48px;
          margin-bottom: 20px;
        }
        .description {
          font-size: 18px;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }
        .badge-group {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
          align-items: center;
        }
        .difficulty-tag {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid var(--glass-border);
        }
        .difficulty-easy { color: #10b981; background: rgba(16, 185, 129, 0.1); }
        .difficulty-medium { color: #f59e0b; background: rgba(245, 158, 11, 0.1); }
        .difficulty-hard { color: #ef4444; background: rgba(239, 68, 68, 0.1); }
        
        .dietary-tags {
          display: flex;
          gap: 8px;
          margin-bottom: 32px;
        }
        .dietary-tag {
          font-size: 13px;
          color: var(--ingredient-theme);
          font-weight: 600;
          opacity: 0.8;
        }
        .theme-text {
          background: linear-gradient(135deg, var(--text-primary) 0%, var(--ingredient-theme) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .theme-icon {
          color: var(--ingredient-theme);
        }
        .nutrition-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .nutrition-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: var(--text-secondary);
        }
        .nutrition-item :global(svg) {
          color: var(--ingredient-theme);
        }
        .allergen-alert {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: rgba(239, 68, 68, 0.05);
          border: 1px solid rgba(239, 68, 68, 0.1);
          border-radius: 12px;
        }
        .alert-icon {
          font-size: 20px;
        }
        .allergen-alert strong {
          color: var(--brand-danger);
          font-size: 14px;
        }
        .allergen-alert p {
          font-size: 14px;
          color: var(--text-secondary);
        }
        .dish-tips-section {
          margin-top: 40px;
          padding: 40px;
          border-left: 4px solid var(--brand-primary);
          position: relative;
          overflow: hidden;
        }
        .tips-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: var(--brand-primary);
          color: #000;
          font-size: 10px;
          font-weight: 800;
          padding: 6px 12px;
          border-bottom-left-radius: 12px;
          letter-spacing: 0.1em;
        }
        .tips-content {
          font-size: 18px !important;
          font-weight: 500;
          color: var(--text-primary) !important;
        }
        .science-section {
          margin-top: 40px;
          padding: 40px;
        }
        .science-section h2 {
          margin-bottom: 24px;
        }
        .science-section p {
          font-size: 16px;
          line-height: 1.8;
          color: var(--text-secondary);
        }
        .chemical-impact {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--glass-border);
        }
        .chemical-impact strong {
          display: block;
          margin-bottom: 12px;
          color: var(--text-primary);
        }
        @media (max-width: 1024px) {
          .detail-hero {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .detail-title-area h1 {
            font-size: 36px;
          }
        }
        @media print {
          body * {
            visibility: hidden;
          }
          #share-card, #share-card * {
            visibility: visible;
          }
          #share-card {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            margin: 0;
            padding: 40px;
            display: flex !important;
          }
          header, footer, .btn, .breadcrumb, .category-tag-detail {
            display: none !important;
          }
        }

        /* Knowledge Hub Styles */
        .knowledge-hub {
          margin-top: 60px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          margin-bottom: 100px;
        }
        .hub-grid, .hub-bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        .hub-card {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .hub-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }
        .hub-header h3, .hub-header h2 {
          margin: 0;
          font-size: 18px;
          letter-spacing: -0.01em;
        }
        .hub-card p {
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
        }
        .pairing-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .pairing-tag {
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: 100px;
          font-size: 13px;
          color: var(--text-primary);
        }
        
        /* FAQ Styles */
        .faq-section {
          padding: 40px;
        }
        .faq-list {
          margin-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .faq-item {
          border-bottom: 1px solid var(--glass-border);
        }
        .faq-item summary {
          padding: 20px 0;
          list-style: none;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          font-size: 16px;
          color: var(--text-primary);
        }
        .faq-item summary::-webkit-details-marker {
          display: none;
        }
        .faq-answer {
          padding: 0 0 24px;
          color: var(--text-secondary);
          font-size: 15px;
          line-height: 1.7;
        }
        .faq-item[open] .chevron {
          transform: rotate(180deg);
        }
        .chevron {
          transition: transform 0.3s ease;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .hub-grid, .hub-bottom-grid {
            grid-template-columns: 1fr;
          }
          .faq-section {
            padding: 24px;
          }
        }
      `}</style>
    </main>
  );
}

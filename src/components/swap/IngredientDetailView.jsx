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
    <main className="min-h-screen flex flex-col">
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
            <span className="category-tag">{ingredient.category[lang]}</span>
            <h1 className="text-gradient">
              {lang === 'ko' ? `${ingredient.name[lang]}${t('swap.substitute_for')}` : `${t('swap.substitute_for')} ${ingredient.name[lang]}`}
            </h1>
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

        <section className="science-section glass-card">
          <h2 className="brand-gradient">{t('swap.why_this_works')}</h2>
          <p>{bestSubstitute.why_it_works[lang]}</p>
          <div className="chemical-impact">
            <strong>{t('swap.chemical_impact')}:</strong>
            <p>{bestSubstitute.chemical_impact[lang]}</p>
          </div>
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
          margin-bottom: 40px;
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
      `}</style>
    </main>
  );
}

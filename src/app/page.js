"use client";
import React from 'react';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SwapCard from '@/components/swap/SwapCard';
import ingredientsData from '@/lib/data/ingredients';
import useTranslation from '@/lib/i18n/useTranslation';

export default function HomePage() {
  const { t } = useTranslation();
  const featuredIngredient = ingredientsData.ingredients[0]; // Gochujang
  const featuredSubstitute = featuredIngredient.substitutes[0];


  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <section className="hero-section">
        <div className="container hero-inner">
          <div className="hero-content">
            <h1 className="hero-title text-gradient">
              {t('swap.hero_title')}<br />
              <span className="brand-gradient">{t('swap.hero_subtitle')}</span>
            </h1>
            <p className="hero-description">
              {t('swap.hero_description')}
            </p>
            <div className="hero-actions">
              <Link href="/explore">
                <button className="btn btn-primary">{t('swap.explore_btn')}</button>
              </Link>
              <Link href="/about">
                <button className="btn btn-outline">{t('swap.how_it_works_btn')}</button>
              </Link>
            </div>
          </div>

          <div className="hero-featured">
            <p className="featured-label">{t('common.try_calculator')}</p>
            <SwapCard 
              ingredient={featuredIngredient} 
              substitute={featuredSubstitute} 
            />
          </div>
        </div>
      </section>



      <Footer />

      <style jsx>{`
        .hero-section {
          padding: 120px 0 80px;
          position: relative;
          overflow: hidden;
        }
        .hero-section::before {
          content: '';
          position: absolute;
          top: -20%;
          left: -10%;
          width: 60%;
          height: 80%;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%);
          z-index: -1;
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 64px;
        }
        .hero-title {
          font-size: 64px;
          line-height: 1.15;
          margin-bottom: 24px;
          word-break: keep-all; /* 단어 단위 줄바꿈으로 깔끔하게 조정 */
        }
        .hero-description {
          font-size: 18px;
          color: var(--text-secondary);
          margin-bottom: 40px;
          max-width: 500px;
          line-height: 1.6;
          word-break: keep-all;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
        }
        .hero-featured {
          position: relative;
        }
        .featured-label {
          text-align: center;
          font-size: 11px;
          color: var(--brand-primary);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 20px;
          font-weight: 700;
        }

        @media (max-width: 1024px) {
          .hero-inner {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-actions {
            justify-content: center;
          }
          .hero-title {
            font-size: 48px;
          }

        }
      `}</style>
    </main>
  );
}

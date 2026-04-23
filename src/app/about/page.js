"use client";
import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import useTranslation from '@/lib/i18n/useTranslation';

export default function AboutPage() {
  const { t, lang } = useTranslation();

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <section className="about-hero">
        <div className="container">
          <h1 className="text-gradient section-title">
            {lang === 'ko' ? '왜 우리의 대체법은 완벽할까요?' : 'The Science Behind Perfect Swaps'}
          </h1>
          <p className="section-subtitle">
            {lang === 'ko' 
              ? '단순한 추측이 아닌, 요리 과학과 데이터가 만나 주방의 실패를 제로로 만듭니다.' 
              : 'Beyond simple guesses, we combine culinary science and data to eliminate kitchen failures.'}
          </p>
        </div>
      </section>

      <section className="science-pillars container">
        <div className="pillars-grid">
          <div className="pillar-item glass-card">
            <div className="pillar-icon">🧬</div>
            <h3>{lang === 'ko' ? '01. 화학적 정밀 분석' : '01. Chemical Precision'}</h3>
            <p>
              {lang === 'ko'
                ? '모든 식재료의 pH(산도), 수분율, 지방 함량을 데이터베이스화했습니다. 베이킹에서 버터밀크 대신 우유를 쓸 때 발생하는 산도 부족을 식초로 보정하는 식의 화학적 밸런싱을 제공합니다.'
                : 'We cataloged pH levels, moisture content, and fat ratios for every ingredient. We ensure chemical balance, like using vinegar to correct acidity when swapping buttermilk for milk.'}
            </p>
          </div>

          <div className="pillar-item glass-card">
            <div className="pillar-icon">👅</div>
            <h3>{lang === 'ko' ? '02. 감칠맛(Umami) 동기화' : '02. Umami Sync'}</h3>
            <p>
              {lang === 'ko'
                ? '맛은 단순히 "비슷하다"로 끝나지 않습니다. 단맛, 짠맛, 감칠맛의 강도를 수치화하여 대체재를 썼을 때 원래 요리가 의도한 미각 프로필과 90% 이상 일치하도록 설계했습니다.'
                : 'Flavor isn\'t just "similar." We quantify sweetness, saltiness, and umami to ensure your dish matches over 90% of the original intended flavor profile.'}
            </p>
          </div>

          <div className="pillar-item glass-card">
            <div className="pillar-icon">🤖</div>
            <h3>{lang === 'ko' ? '03. 2-Pass AI 검증' : '03. 2-Pass Verification'}</h3>
            <p>
              {lang === 'ko'
                ? 'AI가 수만 건의 레시피 데이터를 분석하여 1차 비율을 산출하고, 전문 셰프들이 실제 조리 테스트를 통해 보정값을 확정하는 엄격한 2단계 검증을 거칩니다.'
                : 'AI analyzes thousands of recipes for initial ratios, followed by professional chefs conducting real-world cooking tests to finalize the correction values.'}
            </p>
          </div>
        </div>
      </section>

      <section className="mission-section">
        <div className="container glass-card mission-inner">
          <div className="mission-content">
            <h2>{lang === 'ko' ? '우리의 미션' : 'Our Mission'}</h2>
            <p>
              {lang === 'ko'
                ? '전 세계 어디에 있든, 어떤 재료가 없든 당신의 요리가 멈추지 않기를 바랍니다. Swap.sia는 로컬 마트의 재료로 글로벌 미식의 장벽을 허뭅니다.'
                : 'No matter where you are or what you lack, your cooking shouldn\'t stop. Swap.sia breaks the barriers of global cuisine with local supermarket ingredients.'}
            </p>
          </div>
          <div className="mission-stats">
            <div className="stat">
              <span className="stat-num">20+</span>
              <span className="stat-label">Essential Ingredients</span>
            </div>
            <div className="stat">
              <span className="stat-num">98%</span>
              <span className="stat-label">Accuracy Rate</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .about-hero {
          padding: 80px 0 60px; /* 120px에서 80px로 축소 */
          text-align: center;
          position: relative;
        }
        .section-title {
          font-size: 52px; /* 살짝 축소하여 정갈하게 */
          margin-bottom: 20px;
        }
        .section-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
          max-width: 650px;
          margin: 0 auto;
        }
        .science-pillars {
          padding: 60px 0; /* 80px에서 60px로 축소 */
        }
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        .pillar-item {
          padding: 40px 28px; /* 패딩 축소 */
          transition: transform 0.3s ease;
          background: rgba(255, 255, 255, 0.03);
        }
        .pillar-item:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.05);
        }
        .pillar-icon {
          font-size: 36px;
          margin-bottom: 20px;
        }
        .pillar-item h3 {
          font-size: 22px;
          margin-bottom: 16px;
          color: var(--brand-primary);
        }
        .pillar-item p {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 15px;
        }
        .mission-section {
          padding: 60px 0 100px; /* 100px-140px에서 축소 */
        }
        .mission-inner {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 40px;
          padding: 60px; /* 80px에서 60px로 축소 */
          align-items: center;
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(245,158,11,0.05) 100%);
        }
        .mission-content h2 {
          font-size: 40px;
          margin-bottom: 24px;
        }
        .mission-content p {
          font-size: 18px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .mission-stats {
          display: flex;
          justify-content: space-around;
        }
        .stat {
          text-align: center;
        }
        .stat-num {
          display: block;
          font-size: 48px;
          font-weight: 800;
          color: var(--brand-primary);
          margin-bottom: 8px;
        }
        .stat-label {
          font-size: 14px;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        @media (max-width: 1024px) {
          .pillars-grid {
            grid-template-columns: 1fr;
          }
          .mission-inner {
            grid-template-columns: 1fr;
            padding: 40px;
          }
        }
      `}</style>
    </main>
  );
}

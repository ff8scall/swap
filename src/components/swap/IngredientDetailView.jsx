"use client";
import React, { useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SwapCard from '@/components/swap/SwapCard';
import FlavorRadarChart from '@/components/swap/FlavorRadarChart';
import ShareableCard from '@/components/swap/ShareableCard';
import useTranslation from '@/lib/i18n/useTranslation';
import Script from 'next/script';
import { 
  History, Thermometer, Box, HelpCircle, Heart, ChevronDown, 
  Activity, Zap, Utensils, Clock, ShieldAlert, ChefHat, Info,
  FlaskConical, Droplets, Flame, Wind, Scaling, Layers, Waves,
  CheckCircle2, AlertCircle, Target, Sparkles, MoveRight
} from 'lucide-react';

export default function IngredientDetailView({ ingredient, bestSubstitute, substituteFullInfo }) {
  const { t, lang } = useTranslation();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  // 1. Recently Viewed Tracking
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const history = JSON.parse(localStorage.getItem('ingredient_history') || '[]');
    const newHistory = [ingredient.id, ...history.filter(id => id !== ingredient.id)].slice(0, 8);
    localStorage.setItem('ingredient_history', JSON.stringify(newHistory));
  }, [ingredient.id]);

  // 2. Advanced Sharing (Copy Summary)
  const copySummary = () => {
    const summary = `🍳 ${ingredient.name[lang]} 대체 가이드\n\n✅ 최적의 대체재: ${displaySubName} (${bestSubstitute?.ratio?.source}:${bestSubstitute?.ratio?.target_min} 비율)\n💡 셰프의 킥: ${bestSubstitute?.compensation_action?.[lang] || '없음'}\n\n상세 정보 보기: ${window.location.href}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  // Derive substitute properties from flavor_delta if full info is missing
  const substituteProperties = useMemo(() => {
    if (substituteFullInfo?.properties) return substituteFullInfo.properties;
    if (!bestSubstitute?.flavor_delta) return null;

    const base = { ...ingredient.properties };
    const delta = bestSubstitute.flavor_delta;

    // Apply deltas (assuming delta is on -5 to +5 scale, mapped to 0-100)
    if (delta.sweetness) base.sweetness_index = Math.min(100, Math.max(0, (base.sweetness_index || 50) + (delta.sweetness * 10)));
    if (delta.salinity) base.salinity = Math.min(100, Math.max(0, (base.salinity || 40) + (delta.salinity * 10)));
    if (delta.umami) base.umami_intensity = Math.min(100, Math.max(0, (base.umami_intensity || 50) + (delta.umami * 10)));
    if (delta.heat) base.spiciness = Math.min(100, Math.max(0, (base.spiciness || 0) + (delta.heat * 10)));
    if (delta.acidity) base.acidity = Math.min(100, Math.max(0, (base.acidity || 20) + (delta.acidity * 10)));
    
    return base;
  }, [ingredient, bestSubstitute, substituteFullInfo]);

  const displaySubName = useMemo(() => {
    const name = substituteFullInfo?.name?.[lang] || bestSubstitute?.name?.[lang];
    // 만약 이름이 너무 일반적이면 ID를 활용
    if (name && name !== 'Alternative' && name !== '대안 재료' && name !== 'General Alt') return name;
    
    if (bestSubstitute?.id) {
      return bestSubstitute.id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    return lang === 'ko' ? '대체재' : 'Substitution';
  }, [substituteFullInfo, bestSubstitute, lang]);

  const downloadCard = async () => {
    if (typeof window === 'undefined' || !window.htmlToImage) return;
    setIsGenerating(true);
    const node = document.getElementById('share-card');
    try {
      node.style.display = 'flex';
      node.style.position = 'fixed';
      node.style.left = '0';
      node.style.top = '0';
      const dataUrl = await window.htmlToImage.toPng(node, { quality: 1, pixelRatio: 2 });
      node.style.display = 'none';
      const link = document.createElement('a');
      link.download = `${ingredient.id}-swap-guide.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Download failed', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main 
      className="min-h-screen flex flex-col premium-theme"
      style={{
        '--ingredient-theme': ingredient.visual_identity?.primary_color || 'var(--brand-primary)',
        '--ingredient-theme-soft': (ingredient.visual_identity?.primary_color || '#f59e0b') + '1A'
      }}
    >
      <Header />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js" strategy="lazyOnload" />
      
      <div className="container detail-container">
        {/* Breadcrumb Premium */}
        <nav className="breadcrumb-premium">
          <Link href="/">{t('common.home')}</Link> 
          <MoveRight size={12} className="mx-2" />
          <Link href="/explore">{t('common.explore')}</Link> 
          <MoveRight size={12} className="mx-2" />
          <span className="active-item">{ingredient.name[lang]}</span>
        </nav>

        {/* Hero Section: The Science of Swap */}
        <section className="premium-hero">
          {/* Ambient Background Image */}
          <div 
            className="hero-ambient-bg" 
            style={{ 
              backgroundImage: `url(/images/ingredients/${ingredient.id}.png)`,
              opacity: 1
            }}
          />
          <div className="hero-content-overlay" />
          
          <div className="hero-content">
            <div className="badge-row">
              <span className="premium-badge cat-badge">{ingredient.category[lang]}</span>
              <span className={`premium-badge diff-badge ${ingredient.difficulty}`}>
                {t(`difficulty.${ingredient.difficulty}`)}
              </span>
            </div>
            
            <h1 className="hero-title">
              <span className="original-name">{ingredient.name[lang]}</span>
              <span className="swap-connector">→</span>
              <span className="target-name brand-gradient">{displaySubName}</span>
              
              <div className="confidence-badge-compact">
                <div className="score-num metric-value">{bestSubstitute?.verification?.confidence_score || 0}%</div>
                <div className="score-label">{t('science_labels.match')}</div>
              </div>
            </h1>

            <div className="hero-meta">
              <div className="dietary-tags-premium">
                {ingredient.dietary_tags?.map(tag => (
                  <span key={tag} className="d-tag">#{t(`dietary.${tag}`) || tag}</span>
                ))}
              </div>
              <p className="hero-desc">{ingredient.description[lang]}</p>
              
              {/* Signature Dishes Section */}
              {ingredient.best_use_cases && ingredient.best_use_cases.length > 0 && (
                <div className="signature-dishes-area">
                  <h4 className="signature-title">
                    <Utensils size={14} className="text-amber" />
                    {lang === 'ko' ? '주요 활용 요리' : 'Signature Dishes'}
                  </h4>
                  <div className="signature-pills">
                    {ingredient.best_use_cases.map((dish, idx) => (
                      <div key={idx} className="dish-pill glass-card">
                        {dish[lang]}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="allergen-premium-alert">
              <ShieldAlert size={20} className="text-coral" />
              <div className="alert-text">
                <strong>{t('swap.allergy_warning')}:</strong>
                <span>{ingredient.allergens && ingredient.allergens.length > 0 && ingredient.allergens[0] !== 'none' 
                    ? ingredient.allergens.map(a => t(`allergens.${a}`) || a).join(', ') 
                    : (lang === 'ko' ? '없음' : 'None')}</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="radar-card glass-card">
              <div className="card-header-premium">
                <Target size={18} className="text-blue" />
                <h3>{lang === 'ko' ? '풍미 프로필 분석' : 'Flavor Profile Analysis'}</h3>
              </div>
              <FlavorRadarChart 
                original={ingredient.properties} 
                substitute={substituteProperties}
                originalName={ingredient.name[lang]}
                substituteName={displaySubName}
              />
            </div>
          </div>
        </section>

        {/* --- Unified Action Plan: How to Swap --- */}
        <section className="action-plan-section">
          <div className="section-header-premium">
            <Layers size={24} className="text-amber" />
            <h2>{lang === 'ko' ? '실전 대체 가이드' : 'How to Swap (Action Plan)'}</h2>
          </div>

          <div className="action-plan-grid">
            {/* Step 1: Measure (Calculator) */}
            <div className="plan-step-card glass-card">
              <div className="step-badge">STEP 1</div>
              <div className="step-title-area">
                <Scaling size={20} className="text-blue" />
                <h3>{lang === 'ko' ? '정량 측정' : 'Measure & Ratio'}</h3>
              </div>
              <p className="step-desc">
                {lang === 'ko' 
                  ? '요리에 필요한 정확한 양을 계산하세요.' 
                  : 'Calculate the precise amount for your recipe.'}
              </p>
              
              <div className="plan-calculator-inline">
                <SwapCard ingredient={ingredient} substitute={bestSubstitute} isCompact={true} />
              </div>
            </div>

            {/* Step 2: Balance (Chef's Hack) */}
            <div className="plan-step-card glass-card">
              <div className="step-badge">STEP 2</div>
              <div className="step-title-area">
                <ChefHat size={20} className="text-amber" />
                <h3>{lang === 'ko' ? '풍미 밸런싱 (셰프의 킥)' : 'Balance the Flavor (Chef\'s Hack)'}</h3>
              </div>
              <p className="step-desc">
                {lang === 'ko' 
                  ? '대체재의 미세한 맛 차이를 보정하여 완벽한 맛을 구현합니다.' 
                  : 'Adjust the subtle flavor differences for a perfect result.'}
              </p>

              <div className="plan-steps-container">
                {bestSubstitute?.compensation_action?.[lang] ? (
                  bestSubstitute.compensation_action[lang].split(/[.!?]\s+/).filter(s => s.trim().length > 2).map((step, idx) => (
                    <div key={`${ingredient.id}-step-${idx}`} className="plan-step-item">
                      <CheckCircle2 size={18} className="check-icon" />
                      <p>{step.trim()}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-data">{lang === 'ko' ? '보정 정보가 제공되지 않았습니다.' : 'No correction logic provided.'}</p>
                )}
              </div>

              <div className="compatibility-mini">
                <Sparkles size={14} className="text-mint" />
                <span>{lang === 'ko' ? '가장 추천하는 용도:' : 'Best for:'}</span>
                <strong>{lang === 'ko' ? '소스, 드레싱, 베이킹' : 'Sauces, Dressings, Baking'}</strong>
              </div>
            </div>
          </div>

          <div className="plan-actions">
            <button 
              className={`btn btn-primary download-btn ${isGenerating ? 'loading' : ''}`} 
              onClick={downloadCard}
              disabled={isGenerating}
            >
              {isGenerating ? t('science_labels.processing') : `📥 ${t('science_labels.download_guide')}`}
            </button>
            <button 
              className={`btn btn-secondary copy-summary-btn ${copied ? 'copied' : ''}`}
              onClick={copySummary}
            >
              {copied ? '✅ Copied!' : '🔗 Copy Summary & Link'}
            </button>
          </div>

        </section>

        {/* --- V2.1 Premium Science Engine --- */}
        <section className="science-engine-premium glass-card">
          <div className="engine-header">
            <div className="header-left">
              <FlaskConical size={24} className="text-blue" />
              <h2>{lang === 'ko' ? '정밀 요리 과학 엔진' : 'Culinary Science Engine'}</h2>
            </div>
            <div className="engine-badge">V2.1 {t('science_labels.pro_analytics')}</div>
          </div>

          <div className="metrics-grid">
            <div className="metric-box">
              <div className="box-label">{lang === 'ko' ? '화학적 지표' : 'Chemical Metrics'}</div>
              <div className="metric-items">
                {ingredient.properties?.ph_level !== undefined && ingredient.properties?.ph_level !== null && (
                  <div className="metric-entry">
                    <div className="m-info">
                      <span className="m-label">{t('science_labels.ph_level')}</span>
                      <span className="m-val metric-value">{ingredient.properties?.ph_level}</span>
                    </div>
                    <div className="m-bar-bg">
                      <div className="m-bar-fill ph" style={{ width: `${(ingredient.properties?.ph_level / 14) * 100}%` }}></div>
                    </div>
                  </div>
                )}
                {ingredient.properties?.moisture_content !== undefined && ingredient.properties?.moisture_content !== null && (
                  <div className="metric-entry">
                    <div className="m-info">
                      <span className="m-label">{t('science_labels.moisture')}</span>
                      <span className="m-val metric-value">{ingredient.properties?.moisture_content}%</span>
                    </div>
                    <div className="m-bar-bg">
                      <div className="m-bar-fill moisture" style={{ width: `${ingredient.properties?.moisture_content}%` }}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="metric-box">
              <div className="box-label">{lang === 'ko' ? '열 반응 지표' : 'Thermal Reaction'}</div>
              <div className="thermal-tags-premium">
                <div className={`t-tag ${ingredient.thermal_behavior?.caramelization ? 'on' : 'off'}`}>
                  <Flame size={14} />
                  <span>{t('science_labels.caramelization')}</span>
                </div>
                <div className={`t-tag ${ingredient.thermal_behavior?.maillard_reaction ? 'on' : 'off'}`}>
                  <Zap size={14} />
                  <span>{t('science_labels.maillard')}</span>
                </div>
                {ingredient.thermal_behavior?.smoke_point_c && (
                  <div className="smoke-point-mini">
                    <span>{t('science_labels.smoke_point')}:</span>
                    <strong>{ingredient.thermal_behavior.smoke_point_c}°C</strong>
                  </div>
                )}
              </div>
            </div>

            <div className="metric-box">
              <div className="box-label">{lang === 'ko' ? '물리적 질감' : 'Physical Texture'}</div>
              <div className="texture-pills">
                <div className="pill">
                  <Box size={14} />
                  <span>{t(`science.state.${ingredient.texture_profile?.state}`)}</span>
                </div>
                <div className="pill">
                  <Activity size={14} />
                  <span>{t(`science.mouthfeel.${ingredient.texture_profile?.mouthfeel}`)}</span>
                </div>
                <div className="pill">
                  <Waves size={14} />
                  <span>{t(`science.viscosity.${ingredient.properties?.viscosity}`)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO & Knowledge Hub Premium */}
        <section className="knowledge-base-premium">
          <div className="base-grid">
            {ingredient.origin_and_history && (
              <div className="base-card glass-card">
                <div className="b-header">
                  <History size={20} className="text-amber" /> 
                  <h3>{lang === 'ko' ? '기원 및 문화' : 'Origin & Culture'}</h3>
                </div>
                <p>{ingredient.origin_and_history?.[lang]}</p>
              </div>
            )}
            
            {ingredient.storage_tips && (
              <div className="base-card glass-card">
                <div className="b-header">
                  <Box size={20} className="text-blue" /> 
                  <h3>{lang === 'ko' ? '전문가 보관 가이드' : 'Pro Storage Guide'}</h3>
                </div>
                <p>{ingredient.storage_tips?.[lang]}</p>
                <div className="shelf-life-badge">
                  <Clock size={12} />
                  <span>{t('science_labels.shelf_life')}: {ingredient.shelf_life?.opened_days || '-'} {t('science_labels.days')} ({t('science_labels.opened')})</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {ingredient.faq && ingredient.faq.length > 0 && (
          <section className="faq-premium glass-card">
            <div className="faq-header">
              <HelpCircle size={24} className="text-amber" />
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
          </section>
        )}
      </div>

      <ShareableCard ingredient={ingredient} substitute={bestSubstitute} />
      <Footer />

      <style jsx>{`
        .premium-theme { background-color: var(--bg-primary); }
        .detail-container { padding-bottom: 120px; }
        .breadcrumb-premium { display: flex; align-items: center; padding: 32px 0; font-size: 13px; color: var(--text-muted); font-weight: 500; position: relative; z-index: 10; }
        .active-item { color: var(--brand-primary); }
        
        .premium-hero { 
          display: grid; 
          grid-template-columns: 1.2fr 0.8fr; 
          gap: 60px; 
          align-items: center; 
          margin-bottom: 80px; 
          position: relative;
          min-height: 500px;
          border-radius: 24px;
          overflow: hidden;
          padding: 40px;
          border: 1px solid var(--glass-border);
          background: var(--bg-secondary);
        }

        .hero-ambient-bg {
          position: absolute;
          top: 0;
          right: 0;
          width: 70%;
          height: 100%;
          background-size: cover;
          background-position: center;
          z-index: 1;
          filter: saturate(1.2) brightness(0.8);
          mask-image: linear-gradient(to right, transparent 0%, black 60%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 60%);
        }

        .hero-content-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, var(--bg-secondary) 30%, transparent 100%);
          z-index: 2;
        }

        .hero-content { position: relative; z-index: 5; }
        .hero-visual { position: relative; z-index: 5; }

        .badge-row { display: flex; gap: 12px; margin-bottom: 24px; }
        .premium-badge { padding: 6px 14px; border-radius: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: var(--inner-border); }
        .cat-badge { background: rgba(88, 166, 255, 0.1); color: var(--accent-blue); }
        .diff-badge.easy { background: rgba(35, 134, 54, 0.1); color: var(--accent-mint); }
        .diff-badge.medium { background: rgba(245, 158, 11, 0.1); color: var(--brand-primary); }
        .diff-badge.hard { background: rgba(248, 81, 73, 0.1); color: var(--accent-coral); }
        .hero-title { font-size: 64px; line-height: 1.1; margin-bottom: 40px; display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .original-name { color: var(--text-primary); }
        .swap-connector { color: var(--text-muted); font-weight: 300; }
        .target-name { color: var(--brand-primary); }
        .confidence-badge-compact { display: flex; flex-direction: column; align-items: center; background: rgba(35, 134, 54, 0.1); padding: 8px 16px; border-radius: 12px; border: 1px solid rgba(35, 134, 54, 0.2); transform: translateY(-5px); }
        .confidence-badge-compact .score-num { font-size: 24px; color: var(--accent-mint); line-height: 1; }
        .confidence-badge-compact .score-label { font-size: 9px; font-weight: 800; color: var(--accent-mint); opacity: 0.8; text-transform: uppercase; margin-top: 2px; }
        .hero-desc { font-size: 18px; color: var(--text-secondary); line-height: 1.6; margin-top: 20px; margin-bottom: 32px; }
        
        .signature-dishes-area { margin-top: 10px; }
        .signature-title { font-size: 13px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
        .signature-pills { display: flex; flex-wrap: wrap; gap: 12px; }
        .dish-pill { padding: 10px 20px; border-radius: 100px; font-size: 14px; font-weight: 600; color: var(--text-primary); background: rgba(22, 27, 34, 0.6); border: 1px solid var(--glass-border); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); cursor: default; white-space: nowrap; }
        .dish-pill:hover { background: rgba(255, 255, 255, 0.05); border-color: var(--brand-primary); transform: translateY(-2px); box-shadow: 0 4px 20px rgba(245, 158, 11, 0.15); }
        
        .d-tag { font-size: 13px; color: var(--accent-blue); font-weight: 600; margin-right: 12px; }
        .allergen-premium-alert { display: flex; align-items: center; gap: 16px; padding: 20px; background: rgba(248, 81, 73, 0.05); border: 1px solid rgba(248, 81, 73, 0.1); border-radius: 16px; margin-top: 40px; }
        .alert-text strong { color: var(--accent-coral); margin-right: 8px; font-size: 14px; }
        .alert-text span { font-size: 14px; color: var(--text-primary); }
        
        /* Action Plan Section Styles */
        .action-plan-section { margin-bottom: 80px; }
        .section-header-premium { display: flex; align-items: center; gap: 16px; margin-bottom: 40px; }
        .section-header-premium h2 { font-size: 28px; margin: 0; }
        .action-plan-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start; }
        .plan-step-card { position: relative; padding: 40px; min-height: 480px; display: flex; flex-direction: column; }
        .step-badge { position: absolute; top: 20px; right: 20px; font-size: 10px; font-weight: 900; color: var(--text-muted); background: rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 4px; letter-spacing: 0.1em; }
        .step-title-area { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .step-title-area h3 { font-size: 22px; margin: 0; color: var(--text-primary); }
        .step-desc { font-size: 15px; color: var(--text-secondary); margin-bottom: 32px; line-height: 1.5; }
        .plan-calculator-inline { flex: 1; display: flex; align-items: center; justify-content: center; width: 100%; }
        .plan-steps-container { flex: 1; display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }
        .plan-step-item { display: flex; align-items: flex-start; gap: 12px; padding: 16px; background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border); border-radius: 12px; transition: var(--transition-smooth); }
        .plan-step-item:hover { border-color: var(--brand-primary); background: rgba(245, 158, 11, 0.03); }
        .plan-step-item p { font-size: 15px; margin: 0; color: var(--text-primary); line-height: 1.5; }
        .check-icon { color: var(--brand-primary); flex-shrink: 0; margin-top: 2px; }
        .compatibility-mini { display: flex; align-items: center; gap: 10px; padding-top: 24px; border-top: 1px solid var(--glass-border); font-size: 13px; color: var(--text-secondary); }
        .compatibility-mini strong { color: var(--accent-mint); }
        .plan-actions { display: flex; justify-content: center; margin-top: 48px; }
        .download-btn { min-width: 300px; height: 56px; font-size: 16px; border-radius: 100px; }

        .card-header-premium { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
        .card-header-premium h2 { font-size: 20px; margin: 0; }
        .science-engine-premium { padding: 40px; margin-bottom: 60px; }
        .engine-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .header-left { display: flex; align-items: center; gap: 16px; }
        .engine-badge { font-size: 10px; font-weight: 800; background: var(--bg-accent); color: var(--text-secondary); padding: 4px 12px; border-radius: 4px; }
        .metrics-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; }
        .box-label { font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 32px; }
        .metric-entry { margin-bottom: 24px; }
        .m-info { display: flex; justify-content: space-between; margin-bottom: 12px; }
        .m-label { font-size: 14px; font-weight: 500; color: var(--text-secondary); }
        .m-val { font-size: 18px; }
        .m-bar-bg { height: 8px; background: var(--bg-accent); border-radius: 100px; overflow: hidden; }
        .m-bar-fill { height: 100%; border-radius: 100px; }
        .m-bar-fill.ph { background: var(--accent-purple); }
        .m-bar-fill.moisture { background: var(--accent-blue); }
        .thermal-tags-premium { display: flex; flex-direction: column; gap: 12px; }
        .t-tag { display: flex; align-items: center; gap: 12px; padding: 16px; border-radius: 12px; background: var(--bg-secondary); opacity: 0.5; box-shadow: var(--inner-border); }
        .t-tag.on { opacity: 1; color: var(--brand-primary); border: 1px solid rgba(245, 158, 11, 0.2); }
        .smoke-point-mini { margin-top: 10px; font-size: 14px; color: var(--text-secondary); }
        .smoke-point-mini strong { color: var(--text-primary); margin-left: 8px; }
        .texture-pills { display: flex; flex-direction: column; gap: 12px; }
        .pill { display: flex; align-items: center; gap: 16px; padding: 16px; border-radius: 12px; background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border); font-size: 15px; font-weight: 500; }
        .base-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 40px; }
        .b-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .b-header h3 { font-size: 20px; margin: 0; color: var(--text-primary); }
        .base-card p { font-size: 16px; color: var(--text-secondary); line-height: 1.8; }
        .shelf-life-badge { margin-top: 24px; display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: var(--accent-blue); background: rgba(88, 166, 255, 0.1); padding: 6px 16px; border-radius: 8px; }
        .faq-premium { padding: 40px; }
        .faq-header { display: flex; align-items: center; gap: 16px; margin-bottom: 32px; }
        .faq-header h2 { font-size: 24px; margin: 0; }
        .faq-list { display: flex; flex-direction: column; gap: 16px; }
        .faq-item { border-bottom: 1px solid var(--glass-border); }
        .faq-item summary { padding: 24px 0; list-style: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-weight: 600; font-size: 18px; transition: var(--transition-smooth); }
        .faq-item summary:hover { color: var(--brand-primary); }
        .status-label { font-size: 10px; margin-top: 4px; color: var(--text-muted); font-weight: 500; }
        .faq-answer { padding: 0 0 32px; color: var(--text-secondary); font-size: 16px; line-height: 1.8; }
        .faq-item[open] .chevron { transform: rotate(180deg); color: var(--brand-primary); }
        .chevron { transition: transform 0.3s ease; color: var(--text-muted); }
        .text-blue { color: var(--accent-blue); }
        .text-amber { color: var(--brand-primary); }
        .text-coral { color: var(--accent-coral); }
        .text-mint { color: var(--accent-mint); }
        .w-full { width: 100%; }
        .mt-6 { margin-top: 24px; }
        @media (max-width: 1200px) { .premium-hero { grid-template-columns: 1fr; gap: 60px; } .strategy-grid { grid-template-columns: 1fr; } .metrics-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .hero-title { font-size: 44px; } .hero-visual { order: -1; } .base-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}

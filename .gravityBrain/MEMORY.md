# 🧠 MEMORY: Global Ingredient Swap

## 🕒 Last Update: 2026-04-23
## 🚀 Current Status: Phase 3 - Viral Engine & Global Discovery System Complete

### ✅ Recent Decisions & Accomplishments
1.  **Global Discovery System**: Implemented fuzzy search bar in Header and Explore page with URL parameter sync.
2.  **Viral Sharing Engine**: Replaced legacy print flow with real-time `html-to-image` capture for high-res infographic downloads.
3.  **Science & Authority**: Built `/about` (과학적 근거) page to establish culinary expert identity.
4.  **Data Scalability (v3.0)**: Expanded `ingredients.json` to include multiple substitutes per ingredient and added "Egg (for Baking)".
5.  **SEO Finalization**: Integrated server-side HowTo JSON-LD schema for rich search results.
6.  **UI/UX Polishing**: Optimized whitespace density and added "Lab Grid" background aesthetics.

### 🎯 Next Goals (Phase 4 & Beyond)
- [ ] **Dish-specific Tips**: Expand database to include swap advice for specific famous dishes (e.g., Tteokbokki, Carbonara).
- [ ] **Bing IndexNow Integration**: Automate URL submission to search engines on build/update.
- [ ] **Dynamic OG Images (`/api/og`)**: Implement edge-runtime image generation for social media link previews.
- [ ] **Search Synonym Expansion**: Map "된장" to "Soybean Paste" for 0% search failure rate.

### ⚠️ Critical Notes
- **Library Dependency**: `html-to-image` is loaded via `next/script` in the detail view.
- **Search Context**: `IngredientExploreView` requires `Suspense` wrapping due to `useSearchParams`.

## 📋 진행 상황
- [x] 프로젝트 초기화 및 `.gravityBrain` 구축
- [x] 디자인 시스템 및 공통 레이아웃 구축
- [x] 인터렉티브 계산기(SwapCard) MVP 개발
- [x] 재료 상세 페이지 SSG 템플릿 및 SEO 구축
- [x] 글로벌 검색 및 카테고리 필터링 시스템
- [x] 실시간 인포그래픽 이미지 다운로드 엔진
- [x] 과학적 근거(About) 브랜드 페이지 완성

# 🗺️ SYSTEM_MAP: Global Ingredient Swap

## 🧪 대체 비율 알고리즘 (Finalized)
1. **Variable Ratio Logic**: `Target = Source * [Min_Ratio ~ Max_Ratio]`
2. **Multi-Unit Conversion**: Metric(g, ml) <-> Imperial(cup, oz) 정밀 변환
3. **Flavor Correction**: 대체 시 발생하는 수분/당도/산도 변화에 따른 보정 가이드 생성 (0-100 표준 풍미 지표 기반)

## 🤖 AI 데이터 생성 및 SEO 파이프라인
- **Step 1**: 재료 및 조리법별 대체 후보군 추출 (DeepSeek-R1)
- **Step 2**: 화학적 유사성 및 셰프 데이터 기반 2단계 검증 (2-Pass Verification)
- **Step 3**: SEO 최적화 JSON-LD (HowTo/Recipe) 자동 생성 및 서버 사이드 이식
- **Step 4**: SNS 바이럴용 인포그래픽 이미지 실시간 생성 (ShareableCard)
- **Step 5**: **[NEW]** 네이버/빙 사이트 인증 및 `sitemap.xml`, `rss.xml` 자동 생성 파이프라인 구축

## 🧩 시스템 구조 (Phase 16 - 프로덕션 릴리즈)
- **[View Layer - SSG]**: Home, Ingredient Detail, Explore (140종 정적 페이지 생성)
- **[Global Navigation]**: Header Search Bar (미니멀리즘 UI - 로그인/퀴즈 비활성화)
- **[Client Logic - CSR]**: 
    ├── components/
    │   ├── common/             # 공통 UI (Header, Footer, LanguageSwitcher)
    │   └── swap/               # 스왑 핵심 UI (SwapCard, FlavorRadarChart, ActionPlan)
    ├── lib/
    ├── scripts/                # 데이터 자동화 및 크롤링 관리 스크립트
    - **Swap Widget**: 실시간 비율 계산 및 데이터 누락 시 방어 렌더링 적용
    - **Explore Filter**: Fuzzy Search 기반 다국어 재료 탐색 및 카테고리 필터링
    - **Sharing Engine**: 인포그래픽 실시간 스캔 및 이미지(PNG) 다운로드
- **[Data]**: Verified Ingredient Dataset (140 High-Fidelity Items)
    - **Structure**: Split into 8 category-based JSON files in `src/lib/data/ingredients/`
    - **Entry Point**: `src/lib/data/ingredients/index.js` (Aggregates all fragments)
    - **Defensive Design**: 데이터 누락 시에도 시스템 중단 없는 옵셔널 체이닝 아키텍처

## 🎨 디자인 시스템
- **Theme**: Premium Dark (Glassmorphism, Slate-950 Base + Amber-500 Point)
- **Grid System**: 40px Dot Grid Background (Science/Lab Identity)
- **Typography**: Outfit (Logo), Inter (Content)
- **Layout**: Centered Brand Footer & Clean Header (No clutter)

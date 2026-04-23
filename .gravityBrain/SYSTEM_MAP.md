# 🗺️ SYSTEM_MAP: Global Ingredient Swap

## 🧪 대체 비율 알고리즘 (Finalized)
1. **Variable Ratio Logic**: `Target = Source * [Min_Ratio ~ Max_Ratio]`
2. **Multi-Unit Conversion**: Metric(g, ml) <-> Imperial(cup, oz) 정밀 변환
3. **Flavor Correction**: 대체 시 발생하는 수분/당도/산도 변화에 따른 보정 가이드 생성

## 🤖 AI 데이터 생성 및 SEO 파이프라인
- **Step 1**: 재료 및 조리법별 대체 후보군 추출 (DeepSeek-R1)
- **Step 2**: 화학적 유사성 및 셰프 데이터 기반 2단계 검증 (2-Pass Verification)
- **Step 3**: SEO 최적화 JSON-LD (HowTo/Recipe) 자동 생성 및 서버 사이드 이식
- **Step 4**: SNS 바이럴용 인포그래픽 이미지 실시간 생성 (html-to-image)

## 🧩 시스템 구조 (Phase 2.5 ~ 3.0)
- **[View Layer - SSG]**: Home, Ingredient Detail, About (정적 정보 기반 검색 엔진 최적화)
- **[Global Navigation]**: Header Search Bar (어느 페이지에서든 즉시 재료 탐색 가능)
- **[Client Logic - CSR]**: 
    - **Swap Widget**: 실시간 비율 계산 및 단위 변환
    - **Explore Filter**: Fuzzy Search 기반 다국어 재료 탐색 및 카테고리 필터링
    - **Sharing Engine**: 인포그래픽 실시간 스캔 및 이미지(PNG) 다운로드
- **[Data]**: Verified Ingredient Dataset (20+ Essential Items)
    - **Multi-Substitute**: 하나의 재료에 대해 상황별 2개 이상의 대체 옵션 제공
    - **Data Schema**: `chemical_impact`, `compensation_action`, `umami_reproduction`, `allergen_warning`, `why_it_works`

## 🎨 디자인 시스템
- **Theme**: Glassmorphism (Slate-950 Base + Amber-500 Point)
- **Grid System**: 40px Dot Grid Background (Science/Lab Identity)
- **Typography**: Outfit (Logo), Inter (Content)

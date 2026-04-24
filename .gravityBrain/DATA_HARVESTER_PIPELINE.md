# 🚜 DATA HARVESTER PIPELINE (E-A-T Optimized)

> **목표**: V2.1 스펙의 초정밀 요리 과학 데이터를 최소한의 시간으로, 하지만 구글 E-A-T(전문성, 권위성, 신뢰성) 기준을 완벽히 충족하며 수집하는 자동화 파이프라인.

---

## 🏗️ 4단계 데이터 수집 파이프라인 (The 4-Step Harvester)

### Step 1: 🤖 Schema-Driven Drafting (AI 초안 생성)
가장 품이 많이 드는 '번역'과 '구조화'를 LLM에 맡깁니다.
- **도구**: Gemini 3.5 Pro API 또는 Local LLM
- **방식**: 
  1. `schema.json`을 프롬프트에 주입.
  2. "이 스키마에 맞춰 '고추장' 데이터를 JSON으로 뱉어내라. 단, 수치가 불확실한 필드는 `null`로 두어라."
- **결과**: 다국어 이름(`name`), 기본 카테고리, 형태(`preparation_forms`) 등 70% 완성된 뼈대 생성.

### Step 2: 🔬 Scientific Grounding (권위 있는 출처 교차 검증)
AI가 할루시네이션(거짓 정보)을 만들지 않도록, 부장님이 짚어주신 **1티어 소스**만 검색하여 빈칸(`null`)을 채웁니다.
- **도구**: Perplexity API (또는 GPT-4o with Search)
- **타겟 매핑**:
  - `ph_level`, `moisture_content`: **USDA FoodData Central**, **국립농업과학원** 검색.
  - `thermal_behavior` (발연점 등): **Modernist Cuisine**, **Serious Eats** 검색.
  - `scientific_name` (학명): **Wikipedia** 검색 후 강제 바인딩 (SEO 최고 존엄).

### Step 3: 👨‍🍳 Lab-Tested Swap Validation (대체 로직 정밀 검증)
이 서비스의 핵심 가치인 `substitutes` (대체제)의 화학적 로직을 권위 있는 텍스트로 보강합니다.
- **베이킹류 (가루, 이스트)**: **King Arthur Baking**의 가이드라인 스크래핑/검색.
- **K-Food 고도화 (장류)**: **KCI 논문** (예: "고추장 대체 재료 품질 특성") 요약 내용을 `chemical_impact`에 반영.
- **서양 요리 과학**: **America's Test Kitchen**의 실험 데이터를 `why_it_works`에 인용.

### Step 4: 🛡️ Schema Validation & Chef's Stamp (최종 검수)
수집된 데이터가 시스템을 망가뜨리지 않도록 방어하고 권위를 부여합니다.
- **자동 검증**: `ajv`(JSON Schema Validator)를 통해 `schema.json`과 대조하여 타입/필수값 에러 사전 차단.
- **Human in the Loop**: 핵심 식재료 Top 20은 직접 눈으로 확인 후, `verification` 객체에 `verified_by: "Chef-Curated"` 도장 찍기.

---

## 🛠️ 즉시 실행 가능한 개발 Action Item

1. **Extraction Script 작성**: 
   - Node.js로 `generate_ingredient_draft.js` 스크립트를 만들어, 프롬프트+스키마를 LLM API로 쏴서 JSON을 떨구는 툴 제작.
2. **Wikipedia 연동기 (선택)**:
   - 재료 영문명을 넣으면 위키피디아 API에서 `scientific_name`만 파싱해오는 간단한 유틸리티 작성.
3. **Core 20종 우선 타겟팅**:
   - `STRATEGIC_INGREDIENTS_MAP.md`에서 뽑은 1순위 재료(고추장, 타피오카 전분, 연두부 등) 20개만 이 파이프라인으로 돌려보기.

---
📅 **버전**: V1.0 (2026-04-24)

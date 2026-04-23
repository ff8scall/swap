# ⚙️ CORE_LOGIC: Global Ingredient Swap

## 🧪 대체 비율 알고리즘 (Finalized)
1. **재료 성질 분류**: 가루류, 액체류, 지방류, 향신료 등 물리적 성질 분류
2. **복합 매핑(Complex Mapping)**: 단일 재료 대체를 넘어, '우유 + 식초'와 같이 화학적 밸런스를 맞추는 다중 재료 조합 지원
3. **가변 비율 로직**: 요리의 종류(베이킹, 볶음, 찌개 등)에 따라 Min/Max 비율을 제안하여 실패율 최소화

## 📸 바이럴 엔진 (Real-time Sharing)
1. **Client-side Capture**: `html-to-image` 라이브러리를 사용하여 브라우저에서 특정 DOM(ShareableCard)을 고해상도 PNG로 변환
2. **Dynamic Rendering**: 상세 페이지의 실시간 계산 데이터를 이미지 캔버스에 직접 렌더링
3. **Download Trigger**: 생성된 이미지를 Blob URL로 변환하여 사용자 장치에 즉시 저장

## 🔍 글로벌 검색 및 탐색 (Discovery)
1. **Fuzzy Search**: `useMemo` 기반의 필터링 로직을 통해 재료명, 대체제명, 카테고리를 통합 검색
2. **URL Parameter Sync**: 헤더의 검색 인풋과 탐색 페이지의 상태를 `?q=` 파라미터를 통해 동기화하여 접근성 극대화

## 🤖 AI 검증 파이프라인
1. **2-Pass Verification**: LLM(DeepSeek-R1)이 1차 비율을 생성하고, 실제 셰프 데이터베이스와 화학적 물성(pH, 수분) 데이터를 대조하여 2차 검정
2. **SEO Structured Data**: 검색 결과 상단 노출을 위해 `HowTo` 및 `Recipe` JSON-LD 스키마를 서버 사이드에서 자동 생성

## 📊 데이터 플랫폼 및 명세 (Data Ecosystem)
1. **범용 JSON 플랫폼**: 모든 재료 데이터를 `public/data/ingredients.json`으로 노출하여 외부 서비스(모바일 앱, API 등)에서 즉시 재활용 가능하도록 설계
2. **명세서 기반 관리**: `INGREDIENTS_DATA_SPEC.md`를 통해 데이터 스키마를 표준화하고 필드별 과학적 정의(Chemical Impact, Compensation Action)를 명확히 함
3. **확장성**: 신규 재료 추가 시 2-Pass AI 검증 파이프라인을 통해 정밀도 90% 이상의 고퀄리티 데이터만 유지

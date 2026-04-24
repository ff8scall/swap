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
1. **파편화 데이터 아키텍처 (Fragmented Data Architecture)**: 단일 거대 JSON 대신 카테고리별로 분리된 JSON 파일을 사용하여 유지보수성을 극대화하고, 대용량 데이터 로딩 시의 메모리 병목을 방지
2. **중앙 집계 인터페이스 (Centralized Aggregator)**: `src/lib/data/ingredients/index.js`를 통해 모든 데이터 파편을 하나의 객체로 통합하여 앱 전체에 일관된 API를 제공
3. **명세서 기반 관리 (Schema Specification)**: `INGREDIENTS_DATA_SPEC.md`를 통해 데이터 스키마를 표준화하며, 특히 안전(`allergens`), 관리(`shelf_life`), 조리 기능(`culinary_roles`), 활용 요리(`representative_dishes`) 필드를 필수화하여 데이터의 질적 가치 제고
4. **확장성**: 신규 재료 추가 시 카테고리 파일에 추가하고 인덱스에 등록하는 구조로 협업 및 버전 관리에 용이함

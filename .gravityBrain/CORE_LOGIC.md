# ⚙️ CORE LOGIC: Culinary Intelligence & Data Pipeline

## 1. Action Plan 통합 보정 로직 (Chef's Hack)
원본 식재료와 대체재 간의 **풍미 델타(Flavor Delta)**를 분석하여 사용자에게 단계별 가이드를 제공합니다.
- **Step 1 (Measure & Ratio)**: `source_amount * (target_min/source)` 공식을 통해 정밀한 대체량을 계산합니다.
- **Step 2 (Balance the Flavor)**: 레이더 차트의 오버레이 분석을 통해 부족한 풍미(예: 당도 부족)를 메울 수 있는 구체적인 행동 강령(Compensation Action)을 주입합니다.
- **UI 모드**: `isCompact` 플래그를 통해 디테일 뷰 내에서도 밀도 있게 렌더링되도록 최적화되었습니다.

## 2. 다국어 데이터 무결성 파이프라인 (i18n Validation)
방대한 JSON 데이터(140종)의 품질을 유지하기 위해 자동화된 검증 단계를 거칩니다.
- **감지 알고리즘**:
    1. `Missing`: 국문(ko) 필드가 비어 있는 경우.
    2. `Potential Unlocalized`: 영문과 국문이 토씨 하나 틀리지 않고 동일한 경우 (고유명사 제외).
    3. `Placeholder`: 'Alternative', '대안 재료' 등 실질적인 정보가 없는 범용 텍스트 사용 시.
- **관리 스크립트**:
    - `npm run data:check`: 전수 검사 및 리포트 생성.
    - `apply-fixes.js`: ID 기반 일괄 명칭 교정.
    - `add-best-use-cases.js`: 활용 요리 데이터 자동 주입.

## 3. 프리미엄 시각화 (Flavor Radar)
- `Recharts`를 활용하여 원본(Tahini)과 대체재(Peanut Butter)의 6대 지표를 겹쳐서 보여줍니다.
- 이를 통해 사용자는 왜 '설탕을 더 넣어야 하는지' 또는 '산미를 줄여야 하는지' 시각적으로 납득하게 됩니다.

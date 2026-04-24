# 🗺️ STRATEGY_MAP: Global Ingredient Swap

## 1. 시장 구도 (Market Landscape)
- **레드 오션**: 일반적인 베이킹 재료 대체 (설탕 -> 꿀 등). 대형 요리 사이트(AllRecipes 등)가 장악.
- **블루 오션**: 
    - **K-Food 현지화**: 해외 거주자가 한국 재료가 없을 때 현지 식재료로 맛을 재현하는 정밀 가이드.
    - **화학적 결합 기반 대체**: 단순히 "대신 쓰세요"가 아닌, "이 재료를 쓰면 수분이 많아지니 밀가루를 X만큼 더 넣으세요" 식의 정밀 가이드.

## 2. 공략 빈틈 (The Gap)
- **정밀도 결여**: 기존 사이트들은 요리의 화학적 변화를 고려하지 않음.
- **양방향성 부족**: 서양 -> 동양 재료 대체는 많으나, 동양(K-Food) -> 서양 재료 대체 데이터는 부족함.

## 3. 포지셔닝 (Positioning)
- "The Scientist in Your Kitchen": 고정 비율이 아닌 '가변 범위'와 '화학적 보정 가이드'를 제공하는 정밀 가이드.
- "Verified Alternative": AI가 생성하고 인간(Chef)이 검토한 'Lab-Tested' 데이터로 신뢰성 차별화.
- "K-Food Niche King": 거대 사이트가 다루지 않는 한국 요리별 특화 대체 데이터로 SEO 틈새 장악.
- "Kitchen Mode Ready": 요리 중 조작이 편한 가로 모드 UI 및 향후 VUI(음성 인터페이스) 확장성 고려.

## 4. 서비스 개념 모듈 (Conceptual Modules)
- **[Data Pipeline]**: Local LLM -> Verification -> JSON Data Storage
- **[Swap Engine]**: Unit Converter + Ratio Calculator + Flavor Balancer
- **[View Layer]**: SEO Pages (SSG) + Interactive Widgets (React)

## 5. 사용자 흐름 (User Flow)
## 6. 사용자 여정 맵 (User Journey Map)
### Persona A: Sarah (Baking Crisis)
1. **[Panic]**: "버터밀크가 없네? 어떡하지?" -> 구글 검색.
2. **[Relief]**: 우리 사이트 발견. "요거트 + 우유" 대체안 확인.
3. **[Confidence]**: "화학적 유사도 98%" 점수와 실시간 계산기를 보고 확신.
4. **[Action]**: 계산된 양대로 조리 후 성공.

### Persona B: James (K-Food Explorer)
1. **[Curiosity]**: 제육볶음 레시피 발견 -> 고추장 부재 인지.
2. **[Discovery]**: 우리 사이트에서 "미소 + 고춧가루 + 설탕" 조합 발견.
3. **[Validation]**: "한국의 맛 재현율 92%" 지표 확인.
## 7. 로드맵 (Milestones)
- **Phase 16 (Complete)**: 프리미엄 다크 모드 리팩토링, 풍미 레이더 차트, 과학 엔진 V2.1 적용.
- **Phase 17 (Next)**: 
    - 개인화 위젯(Yield Calculator) 및 레시피 파서(Recipe Parser) MVP 개발.
    - 특수 식단(비건/키토) 데이터셋 100종 확보 및 알레르기 검증 자동화.
- **Phase 18 (Future)**: 
    - 핸즈프리 '키친 모드' UI 런칭 및 VUI 확장 테스트.
    - 시각적 시뮬레이션 엔진 및 소셜 바이럴 카드 자동화.

# 💡 CONCEPT_LOGIC: Global Ingredient Swap

## 1. 비즈니스 수익 모델 (Monetization Strategy)
- **Revenue Mix**: 애드센스(60%) + 제휴 마케팅(30%) + B2B API(10%).
- **Target CPC**: $0.8 - $1.2 (Cooking/Kitchen niche).
- **Affiliate Strategy**: "Don't have it? Buy it here!" - 대체제가 없거나 품질 차이가 큰 경우 즉시 구매 링크 제공.

## 2. 경제성 분석 및 성장 구조 (Growth Engine)
- **CAC (획득 비용)**: SEO 및 유기적 공유 중심이므로 사실상 $0에 수렴.
- **LTV (고객 생애 가치)**: 반복적인 요리 상황에서의 재방문 및 뉴스레터 구독을 통한 연계 수익.
- **Growth Flywheel**: 
    1. AI가 고품질 대체 데이터 생성 
    2. 구글 상위 노출 및 트래픽 유입 
    3. 사용자 피드백(평점/댓글)으로 데이터 정밀도 향상 
    4. 사이트 권위(Authority) 상승.

## 2. 핵심 알고리즘: Ingredient Swap Logic
- **Variable Ratio (R_range)**: `Target = Source * [Min_R ~ Max_R]`. 재료 상태에 따른 범위 제공.
- **Failure Mitigation (F)**: 대체 시 발생할 수 있는 '최악의 시나리오'와 그에 따른 '응급 처치법' 데이터 포함.
- **Exclusion & Hack It Principle**: 대체 불가 시 "Don't swap it. Hack it." 가이드 제공. (예: 식용유로 대체하여 뻑뻑해진 반죽은 우유 추가 및 오븐 온도 보정으로 해결)

## 3. 사용자 경험 로직 (UX Logic)
- **Reliability Scoring**: AI가 성분 분석을 통해 0-100점 사이의 '대체 신뢰도' 부여.
- **Why This Works (Sourcing)**: 대체 비율 하단에 '과학적 각주(팩트)'를 시각화하여 구글 E-E-A-T 신호 강화 및 권위 확보.
- **Oops! Insurance**: 실패 시 활용 가능한 리폼 레시피 팁 제공 (예: 빵이 퍼졌다면 브레드 푸딩으로).
- **Allergy Disclaimer**: 대체제로 인한 교차 오염 및 알레르기 위험을 시각적 아이콘으로 즉각 인지시킴.
- **Community Feedback Loop**: 사용자가 "실제로 해보니 성공했어요/실패했어요" 투표 기능 -> 점수에 반영.
- **User Contribution**: 새로운 대체제를 제안한 유저에게 'Chef Contributor' 뱃지 부여.


## 3. 핵심 기능 로직
1. **Context-Aware Swapping**: 단순 매핑이 아닌 '베이킹/볶음/찌개' 등 조리법에 따른 차별화된 대체안 제시.
2. **Flavor Profile Analytics**: 대체 시 변화하는 맛(단맛, 짠맛, 산미, 매운맛) 수치화 및 보정법 안내.
3. **Multi-Unit Engine**: Metric(g, ml)과 Imperial(oz, cup) 자동 변환 및 최적화.

## 4. MVP 우선순위 (Priority)
1. **[High]**: 다국어 단위 변환 엔진 (Metric <-> Imperial).
2. **[High]**: 가변 범위(Range) 기반의 대체 양 산출 알고리즘 및 'Why This Works' 데이터 구축.
3. **[Medium]**: 검색 엔진 최적화를 위한 JSON-LD 스키마 자동 생성 (Substitutions 섹션 포함).
4. **[Low]**: 사용자 평점 및 리뷰 집계 로직 (Phase 2 예정).

## 5. SEO 및 바이럴 성장 전략
- **K-Food Tagging**: 서구권의 특정 식단 배제를 우회하기 위해 `#Halal`, `#Vegan`, `#GlutenFree` 태그를 메타데이터에 필수 삽입.
- **Pinterest Viral Pipeline**: JSON 데이터를 기반으로 "성분 비교표(Comparison Table)" 및 "대체 비율 카드" 이미지를 자동 생성하여 핀터레스트에 배포.

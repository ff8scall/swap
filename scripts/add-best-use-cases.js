const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/lib/data/ingredients');

const USE_CASES = {
  // Herbs & Spices
  "kkaennip": [{ en: "Wraps", ko: "쌈" }, { en: "Pickles", ko: "장아찌" }, { en: "Garnish", ko: "고명" }],
  "cilantro": [{ en: "Tacos", ko: "타코" }, { en: "Pho", ko: "쌀국수" }, { en: "Salsa", ko: "살사" }],
  "lemongrass": [{ en: "Tom Yum", ko: "똠얌꿍" }, { en: "Curries", ko: "커리" }, { en: "Tea", ko: "차" }],
  "galangal": [{ en: "Tom Yum", ko: "똠얌꿍" }, { en: "Rendang", ko: "인도네시아 커리" }, { en: "Soups", ko: "동남아 수프" }],
  "sumac": [{ en: "Kebab", ko: "케밥" }, { en: "Fattoush", ko: "샐러드 드레싱" }, { en: "Roasted Veg", ko: "구운 채소" }],
  "shallots": [{ en: "Sauce Base", ko: "소스 베이스" }, { en: "Crispy Topping", ko: "튀김 고명" }, { en: "Vinaigrette", ko: "비네그레트" }],
  "garam-masala": [{ en: "Butter Chicken", ko: "버터 치킨" }, { en: "Dal", ko: "달" }, { en: "Meat Dishes", ko: "고기 요리" }],
  "thai-basil": [{ en: "Stir-fries", ko: "팟카파오무쌉" }, { en: "Green Curry", ko: "그린 커리" }, { en: "Pho", ko: "쌀국수" }],
  "zaatar": [{ en: "Flatbread", ko: "마나이시" }, { en: "Hummus", ko: "후무스 토핑" }, { en: "Roast Chicken", ko: "로스트 치킨" }],
  "kashmiri-chili": [{ en: "Tandoori", ko: "탄두리 치킨" }, { en: "Curries", ko: "커리" }, { en: "Chili Oil", ko: "고추기름" }],
  "epazote": [{ en: "Beans", ko: "콩 요리" }, { en: "Tamales", ko: "타말레" }, { en: "Soups", ko: "수프" }],
  "asafoetida": [{ en: "Dal", ko: "달" }, { en: "Sambar", ko: "채소 볶음" }, { en: "Pickles", ko: "피클" }],
  "amchur": [{ en: "Chutney", ko: "처트니" }, { en: "Chaat", ko: "스낵" }, { en: "Fish", ko: "생선 요리" }],
  "curry-leaves": [{ en: "South Indian Curry", ko: "남인도 커리" }, { en: "Tadka", ko: "템퍼링" }, { en: "Coconut Soup", ko: "코코넛 수프" }],
  "mustard-seeds": [{ en: "Pickling", ko: "피클" }, { en: "Tadka", ko: "인도 커리" }, { en: "Sauces", ko: "소스" }],
  "fenugreek-seeds": [{ en: "Methi Chicken", ko: "메티 치킨" }, { en: "Curries", ko: "커리" }, { en: "Soups", ko: "수프" }],
  "saffron": [{ en: "Paella", ko: "파에야" }, { en: "Risotto", ko: "리조또" }, { en: "Desserts", ko: "디저트" }],
  "vanilla-bean": [{ en: "Baking", ko: "베이킹" }, { en: "Pudding", ko: "푸딩" }, { en: "Ice Cream", ko: "아이스크림" }],
  "star-anise": [{ en: "Braised Pork", ko: "동파육" }, { en: "Pho Broth", ko: "쌀국수 육수" }, { en: "Tea", ko: "차" }],
  "allspice": [{ en: "Jerk Chicken", ko: "저크 치킨" }, { en: "Sausages", ko: "소시지" }, { en: "Desserts", ko: "디저트" }],
  "cardamom": [{ en: "Chai Tea", ko: "차이 티" }, { en: "Kheer", ko: "인도 디저트" }, { en: "Baking", ko: "북유럽 베이킹" }],
  "cloves": [{ en: "Roast Ham", ko: "햄 로스트" }, { en: "Sauces", ko: "소스" }, { en: "Chai", ko: "향신료 차" }],
  "nutmeg": [{ en: "Bechamel", ko: "베샤멜 소스" }, { en: "Baking", ko: "베이킹" }, { en: "Potatoes", ko: "감자 요리" }],
  "turmeric": [{ en: "Curries", ko: "커리" }, { en: "Yellow Rice", ko: "밥" }, { en: "Golden Milk", ko: "라떼" }],
  "cumin": [{ en: "Tacos", ko: "타코" }, { en: "Curries", ko: "커리" }, { en: "Chili", ko: "칠리 콘 카르네" }],
  "coriander-seeds": [{ en: "Curries", ko: "커리" }, { en: "Pickling", ko: "피클" }, { en: "Sausages", ko: "소시지" }],
  "cinnamon": [{ en: "Baking", ko: "베이킹" }, { en: "Beverages", ko: "커피/차" }, { en: "Stews", ko: "스튜" }],
  "ginger-powder": [{ en: "Baking", ko: "진저브레드" }, { en: "Sauces", ko: "소스" }, { en: "Tea", ko: "차" }],
  "oregano": [{ en: "Pizza", ko: "피자" }, { en: "Pasta", ko: "파스타" }, { en: "Grill", ko: "그릴 요리" }],
  "thyme": [{ en: "Roast Chicken", ko: "로스트 치킨" }, { en: "Stews", ko: "스튜" }, { en: "Veg", ko: "구운 채소" }],
  "rosemary": [{ en: "Steak", ko: "스테이크" }, { en: "Potatoes", ko: "감자 구이" }, { en: "Focaccia", ko: "포카치아" }],
  "bay-leaves": [{ en: "Stock", ko: "스톡/육수" }, { en: "Stews", ko: "스튜" }, { en: "Sauce", ko: "파스타 소스" }],
  "fennel-seeds": [{ en: "Sausages", ko: "소시지" }, { en: "Mukhwas", ko: "인도 입가심" }, { en: "Fish", ko: "생선 요리" }],

  // Sauces & Condiments
  "gochujang": [{ en: "Bibimbap", ko: "비빔밥" }, { en: "Tteokbokki", ko: "떡볶이" }, { en: "Stir-fried Pork", ko: "제육볶음" }],
  "mirin": [{ en: "Simmered Dishes", ko: "조림" }, { en: "Teriyaki", ko: "테리야키 소스" }, { en: "Rolled Omelet", ko: "계란말이" }],
  "fish-sauce": [{ en: "Pad Thai", ko: "볶음쌀국수" }, { en: "Kimchi", ko: "김치" }, { en: "Dressing", ko: "샐러드 드레싱" }],
  "doenjang": [{ en: "Stew", ko: "된장찌개" }, { en: "Ssamjang", ko: "쌈장" }, { en: "Seasoned Veg", ko: "나물 무침" }],
  "oyster-sauce": [{ en: "Stir-fried Veg", ko: "청경채 볶음" }, { en: "Fried Rice", ko: "볶음밥" }, { en: "Braised Meat", ko: "고기 조림" }],
  "shaoxing-wine": [{ en: "Stir-fries", ko: "중식 볶음" }, { en: "Marinade", ko: "고기 밑간" }, { en: "Braised Pork", ko: "동파육" }],
  "tamarind-paste": [{ en: "Pad Thai", ko: "팟타이" }, { en: "Tom Yum", ko: "똠얌" }, { en: "Chutney", ko: "처트니" }],
  "sriracha": [{ en: "Burgers", ko: "버거" }, { en: "Topping", ko: "소스 토핑" }, { en: "Stir-fries", ko: "볶음 요리" }],
  "hoisin-sauce": [{ en: "Peking Duck", ko: "베이징 덕" }, { en: "Pho Sauce", ko: "쌀국수 고명" }, { en: "BBQ", ko: "바비큐" }],
  "worcestershire-sauce": [{ en: "Steak", ko: "스테이크" }, { en: "Bloody Mary", ko: "블러디 메리" }, { en: "Dressing", ko: "드레싱" }],
  "rice-wine-vinegar": [{ en: "Sushi", ko: "초밥" }, { en: "Pickled Veg", ko: "오이 무침" }, { en: "Sauces", ko: "소스" }],
  "harissa-paste": [{ en: "Tagine", ko: "모로코 요리" }, { en: "Couscous", ko: "쿠스쿠스" }, { en: "Marinade", ko: "마리네이드" }],
  "anchovy-paste": [{ en: "Caesar Salad", ko: "시저 샐러드" }, { en: "Puttanesca", ko: "파스타 소스" }, { en: "Dressing", ko: "드레싱" }],
  "yuzu-kosho": [{ en: "Hot Pot", ko: "나베 요리" }, { en: "Sashimi", ko: "생선회" }, { en: "Grilled Meat", ko: "구운 고기" }],
  "kecap-manis": [{ en: "Nasi Goreng", ko: "나시고랭" }, { en: "Mie Goreng", ko: "미고랭" }, { en: "Satay", ko: "사테" }],
  "chili-crisp": [{ en: "Noodles", ko: "면 요리" }, { en: "Dumplings", ko: "만두 소스" }, { en: "Rice Topping", ko: "밥" }],
  "liquid-smoke": [{ en: "BBQ", ko: "바비큐" }, { en: "Sauces", ko: "소스" }, { en: "Vegan Bacon", ko: "비건 베이컨" }],
  "coconut-aminos": [{ en: "Salad", ko: "샐러드" }, { en: "Stir-fries", ko: "볶음 요리" }, { en: "Marinade", ko: "마리네이드" }],
  "doubanjiang": [{ en: "Mapo Tofu", ko: "마파두부" }, { en: "Hot Pot", ko: "마라탕" }, { en: "Sichuan Dishes", ko: "사천 요리" }],
  "rice-vinegar": [{ en: "Sushi", ko: "초밥" }, { en: "Pickles", ko: "피클" }, { en: "Dressing", ko: "드레싱" }],
  "guk-ganjang": [{ en: "Soups", ko: "국" }, { en: "Seasoned Veg", ko: "나물 무침" }, { en: "Stew", ko: "찌개" }],

  // Dairy & Fats
  "ghee": [{ en: "Steak", ko: "스테이크" }, { en: "Curries", ko: "커리" }, { en: "Baking", ko: "베이킹" }],
  "creme-fraiche": [{ en: "Soups", ko: "수프" }, { en: "Desserts", ko: "디저트" }, { en: "Sauces", ko: "소스" }],
  "coconut-cream": [{ en: "Curries", ko: "커리" }, { en: "Desserts", ko: "디저트" }, { en: "Drinks", ko: "음료" }],
  "heavy-cream": [{ en: "Pasta", ko: "파스타 소스" }, { en: "Baking", ko: "베이킹" }, { en: "Soups", ko: "수프" }],
  "buttermilk": [{ en: "Pancakes", ko: "팬케이크" }, { en: "Fried Chicken", ko: "프라이드 치킨" }, { en: "Biscuits", ko: "비스킷" }],
  "sour-cream": [{ en: "Tacos", ko: "타코" }, { en: "Baking", ko: "베이킹" }, { en: "Sauces", ko: "소스" }],
  "yogurt-greek": [{ en: "Bowls", ko: "볼" }, { en: "Dressing", ko: "드레싱" }, { en: "Baking", ko: "베이킹" }],
  "butter-unsalted": [{ en: "Baking", ko: "베이킹" }, { en: "Steak", ko: "스테이크" }, { en: "Pastries", ko: "페이스트리" }],

  // Grains & Seeds
  "quinoa": [{ en: "Salad", ko: "샐러드" }, { en: "Bowls", ko: "볼" }, { en: "Sides", ko: "사이드" }],
  "couscous": [{ en: "Tagine", ko: "타진" }, { en: "Salad", ko: "샐러드" }, { en: "Sides", ko: "사이드" }],
  "bulgur": [{ en: "Tabbouleh", ko: "타불레" }, { en: "Pilaf", ko: "필라프" }, { en: "Soups", ko: "수프" }],
  "chia-seeds": [{ en: "Pudding", ko: "푸딩" }, { en: "Smoothies", ko: "스무디" }, { en: "Baking", ko: "베이킹" }],

  // Pantry & Sweeteners
  "white-sugar": [{ en: "Baking", ko: "베이킹" }, { en: "Drinks", ko: "음료" }, { en: "General Cooking", ko: "요리 전반" }],
  "brown-sugar": [{ en: "Cookies", ko: "쿠키" }, { en: "BBQ Sauce", ko: "바비큐 소스" }, { en: "Marinade", ko: "양념" }],
  "honey": [{ en: "Tea", ko: "차" }, { en: "Dressing", ko: "드레싱" }, { en: "Toast", ko: "토스트" }],
  "maple-syrup": [{ en: "Pancakes", ko: "팬케이크" }, { en: "Baking", ko: "베이킹" }, { en: "Sauces", ko: "소스" }],
  "salt-kosher": [{ en: "Seasoning", ko: "고기 밑간" }, { en: "General Cooking", ko: "요리 전반" }, { en: "Finishing", ko: "마무리" }],
  "salt-table": [{ en: "Baking", ko: "베이킹" }, { en: "Table use", ko: "식탁용" }, { en: "Cooking", ko: "요리" }],
  "vinegar-rice": [{ en: "Sushi", ko: "초밥" }, { en: "Pickles", ko: "피클" }, { en: "Dressing", ko: "드레싱" }],
  "vinegar-balsamic": [{ en: "Salad", ko: "샐러드" }, { en: "Glaze", ko: "글레이즈" }, { en: "Dipping", ko: "빵 찍어먹기" }],
  "molasses": [{ en: "Baking", ko: "베이킹" }, { en: "Sauces", ko: "소스" }, { en: "BBQ", ko: "바비큐" }],
  "gochugaru": [{ en: "Kimchi", ko: "김치" }, { en: "Stew", ko: "찌개" }, { en: "Seasoned Veg", ko: "나물 무침" }],
  "panko": [{ en: "Frying", ko: "튀김" }, { en: "Tonkatsu", ko: "돈까스" }, { en: "Crust", ko: "크러스트" }],
  "palm-sugar": [{ en: "Curries", ko: "동남아 커리" }, { en: "Desserts", ko: "디저트" }, { en: "Pad Thai", ko: "팟타이" }],
  "pomegranate-molasses": [{ en: "Dips", ko: "무함마라" }, { en: "Salad", ko: "샐러드" }, { en: "Marinade", ko: "마리네이드" }],
  "malt-syrup": [{ en: "Bagels", ko: "베이글" }, { en: "Snacks", ko: "엿강정" }, { en: "Simmered Dishes", ko: "조림" }],
  "mul-yeot": [{ en: "Simmered Dishes", ko: "조림" }, { en: "Stir-fries", ko: "볶음" }, { en: "Korean Fried Chicken", ko: "양념치킨" }],
  "maesil-cheong": [{ en: "Seasoned Veg", ko: "나물 무침" }, { en: "Drinks", ko: "음료" }, { en: "Sauces", ko: "소스" }],
  "cheongju": [{ en: "Marinade", ko: "고기 밑간" }, { en: "Fish", ko: "생선 요리" }, { en: "Stock", ko: "육수" }],
  "mirin-homemade": [{ en: "Simmered Dishes", ko: "조림" }, { en: "Teriyaki", ko: "테리야키" }, { en: "Sauces", ko: "소스" }],
  "agave-syrup": [{ en: "Drinks", ko: "음료" }, { en: "Baking", ko: "비건 베이킹" }, { en: "Dressing", ko: "드레싱" }],
  "cocoa-powder": [{ en: "Baking", ko: "초콜릿 케이크" }, { en: "Drinks", ko: "음료" }, { en: "Desserts", ko: "디저트" }],
  "vanilla-extract": [{ en: "Baking", ko: "베이킹" }, { en: "Custard", ko: "커스터드" }, { en: "Smoothies", ko: "스무디" }],

  // Pickles & Ferments
  "kimchi-cabbage": [{ en: "Stew", ko: "찌개" }, { en: "Fried Rice", ko: "볶음밥" }, { en: "Side Dish", ko: "반찬" }],
  "kimchi-radish": [{ en: "Side Dish", ko: "반찬" }, { en: "Stew", ko: "찌개" }, { en: "Noodle Topping", ko: "국수 고명" }],
  "sauerkraut": [{ en: "Sausages", ko: "소시지" }, { en: "Sandwiches", ko: "샌드위치" }, { en: "Sides", ko: "사이드" }],
  "pickles-dill": [{ en: "Burgers", ko: "버거" }, { en: "Sandwiches", ko: "샌드위치" }, { en: "Snacks", ko: "스낵" }],
  "pickled-ginger": [{ en: "Sushi", ko: "초밥" }, { en: "Donburi", ko: "일식 덮밥" }, { en: "Palate Cleanser", ko: "입가심" }],
  "miso-white": [{ en: "Soups", ko: "미소된장국" }, { en: "Dressing", ko: "드레싱" }, { en: "Marinade", ko: "마리네이드" }],
  "miso-red": [{ en: "Soups", ko: "진한 수프" }, { en: "Ramen", ko: "라멘" }, { en: "Braised Meat", ko: "고기 조림" }],
  "fenugreek-leaves": [{ en: "Curries", ko: "커리" }, { en: "Naan", ko: "인도 빵" }, { en: "Veg", ko: "채소 요리" }],
  "preserved-lemon": [{ en: "Tagine", ko: "모로코 타진" }, { en: "Salad", ko: "샐러드" }, { en: "Fish", ko: "생선 요리" }],
  "koji": [{ en: "Fermentation", ko: "발효 음식" }, { en: "Marinade", ko: "마리네이드" }, { en: "Brewing", ko: "술 제조" }],
  "umeboshi": [{ en: "Rice Balls", ko: "오니기리" }, { en: "Sushi", ko: "초밥" }, { en: "Dressing", ko: "드레싱" }],
  "saeu-jeot": [{ en: "Kimchi", ko: "김치" }, { en: "Stew", ko: "찌개" }, { en: "Steamed Eggs", ko: "계란찜" }],

  // Seaweed & Dried Seafood
  "nori": [{ en: "Gimbap", ko: "김밥" }, { en: "Sushi", ko: "초밥" }, { en: "Snacks", ko: "스낵" }],
  "kombu": [{ en: "Stock", ko: "다시마 육수" }, { en: "Simmered Dishes", ko: "조림" }, { en: "Rice", ko: "밥" }],
  "bonito-flakes": [{ en: "Dashi", ko: "가쓰오 육수" }, { en: "Topping", ko: "오코노미야키" }, { en: "Topping", ko: "타코야키" }],
  "dried-anchovies": [{ en: "Stock", ko: "멸치 육수" }, { en: "Stir-fries", ko: "볶음" }, { en: "Snacks", ko: "스낵" }],
  "dried-pollack": [{ en: "Soups", ko: "황태국" }, { en: "Seasoned Veg", ko: "나물 무침" }, { en: "Grilled", ko: "구이" }],

  // Baking & Thickeners
  "egg-baking": [{ en: "Baking", ko: "베이킹" }, { en: "Custard", ko: "커스터드" }, { en: "Cooking", ko: "요리 전반" }],
  "cornstarch": [{ en: "Frying", ko: "튀김" }, { en: "Thickening", ko: "소스 걸쭉하게" }, { en: "Baking", ko: "베이킹" }],
  "baking-powder": [{ en: "Baking", ko: "케이크" }, { en: "Cookies", ko: "쿠키" }, { en: "Muffins", ko: "머핀" }],
  "cream-of-tartar": [{ en: "Meringue", ko: "머랭" }, { en: "Baking", ko: "베이킹" }, { en: "Syrup", ko: "시럽" }],
  "xanthan-gum": [{ en: "Baking", ko: "글루텐 프리 베이킹" }, { en: "Dressing", ko: "드레싱" }, { en: "Sauces", ko: "소스" }],
  "arrowroot-powder": [{ en: "Pudding", ko: "푸딩" }, { en: "Sauces", ko: "소스" }, { en: "Baking", ko: "베이킹" }],
  "gelatin": [{ en: "Jelly", ko: "젤리" }, { en: "Mousse", ko: "무스" }, { en: "Marshmallows", ko: "마시멜로" }],
  "agar-agar": [{ en: "Desserts", ko: "양갱" }, { en: "Jelly", ko: "젤리" }, { en: "Vegan Food", ko: "비건 푸드" }],
  "almond-flour": [{ en: "Macarons", ko: "마카롱" }, { en: "Baking", ko: "글루텐 프리 베이킹" }, { en: "Coating", ko: "코팅" }],
  "bread-flour": [{ en: "Bread", ko: "식빵" }, { en: "Pizza", ko: "피자 도우" }, { en: "Yeasted Bread", ko: "발효 빵" }],
  "cake-flour": [{ en: "Cakes", ko: "스펀지 케이크" }, { en: "Pastries", ko: "페이스트리" }, { en: "Biscuits", ko: "비스킷" }],
  "glutinous-rice-flour": [{ en: "Rice Cakes", ko: "떡" }, { en: "Porridge", ko: "김치 풀" }, { en: "Dumplings", ko: "만두피" }],
  "potato-starch": [{ en: "Frying", ko: "튀김" }, { en: "Soups", ko: "옹심이" }, { en: "Sauces", ko: "소스" }],
  "self-rising-flour": [{ en: "Quick Bread", ko: "퀵 브레드" }, { en: "Biscuits", ko: "비스킷" }, { en: "Pancakes", ko: "팬케이크" }],
  "tapioca-starch": [{ en: "Bubble Tea", ko: "버블티" }, { en: "Pão de Queijo", ko: "브라질 치즈빵" }, { en: "Pudding", ko: "푸딩" }],
  "yeast-dry": [{ en: "Bread", ko: "빵" }, { en: "Pizza", ko: "피자" }, { en: "Dough", ko: "발효 반죽" }],

  // Fats, Oils & Cheeses
  "butter-salted": [{ en: "Table use", ko: "식탁용" }, { en: "Bread", ko: "빵" }, { en: "General Cooking", ko: "요리 전반" }],
  "milk-whole": [{ en: "Drinks", ko: "음료" }, { en: "Cereal", ko: "시리얼" }, { en: "Baking", ko: "베이킹" }],
  "milk-skim": [{ en: "Diet", ko: "다이어트 식단" }, { en: "Smoothies", ko: "스무디" }, { en: "Cereal", ko: "시리얼" }],
  "olive-oil-evoo": [{ en: "Dressing", ko: "드레싱" }, { en: "Dipping", ko: "빵 찍어먹기" }, { en: "Pasta", ko: "파스타" }],
  "vegetable-oil": [{ en: "Frying", ko: "튀김" }, { en: "Stir-fries", ko: "볶음" }, { en: "Baking", ko: "베이킹" }],
  "sesame-oil-toasted": [{ en: "Seasoned Veg", ko: "나물 무침" }, { en: "Bibimbap", ko: "비빔밥" }, { en: "Finishing", ko: "마무리 향" }],
  "perilla-oil": [{ en: "Seasoned Veg", ko: "나물 무침" }, { en: "Soups", ko: "국" }, { en: "Stir-fries", ko: "볶음" }],
  "cream-cheese": [{ en: "Bagels", ko: "베이글" }, { en: "Cheesecake", ko: "치즈케이크" }, { en: "Dips", ko: "디핑 소스" }],
  "cheddar-cheese": [{ en: "Burgers", ko: "버거" }, { en: "Sandwiches", ko: "샌드위치" }, { en: "Mac & Cheese", ko: "맥앤치즈" }],
  "mozzarella-cheese": [{ en: "Pizza", ko: "피자" }, { en: "Salad", ko: "샐러드" }, { en: "Pasta", ko: "파스타" }],
  "parmesan-cheese": [{ en: "Pasta", ko: "파스타" }, { en: "Salad", ko: "샐러드" }, { en: "Risotto", ko: "리조또" }],
  "ricotta": [{ en: "Lasagna", ko: "라자냐" }, { en: "Salad", ko: "샐러드" }, { en: "Desserts", ko: "디저트" }],
  "mascarpone": [{ en: "Tiramisu", ko: "티라미수" }, { en: "Desserts", ko: "디저트" }, { en: "Sauces", ko: "크림 소스" }],
  "pecorino-romano": [{ en: "Carbonara", ko: "카르보나라" }, { en: "Pasta", ko: "파스타" }, { en: "Salad", ko: "샐러드" }],
  "truffle-oil": [{ en: "Pasta", ko: "파스타" }, { en: "Fries", ko: "감자튀김" }, { en: "Risotto", ko: "리조또" }],
  "gorgonzola": [{ en: "Pizza", ko: "피자" }, { en: "Sauce", ko: "스테이크 소스" }, { en: "Salad", ko: "샐러드" }],
  "shortening": [{ en: "Pie Crust", ko: "파이 크러스트" }, { en: "Cookies", ko: "쿠키" }, { en: "Frying", ko: "튀김" }],
  "lard": [{ en: "Baking", ko: "베이킹" }, { en: "Stir-fries", ko: "볶음" }, { en: "Tamales", ko: "타말레" }],
  "masa-harina": [{ en: "Tortillas", ko: "또띠아" }, { en: "Tamales", ko: "타말레" }, { en: "Sauces", ko: "소스" }],
  "tteok": [{ en: "Tteokbokki", ko: "떡볶이" }, { en: "Soup", ko: "떡국" }, { en: "Skewers", ko: "꼬치" }],
  "flax-seeds": [{ en: "Smoothies", ko: "스무디" }, { en: "Baking", ko: "베이킹" }, { en: "Cereal", ko: "시리얼" }],
  "rice-white": [{ en: "Rice Dishes", ko: "밥" }, { en: "Sushi", ko: "초밥" }, { en: "Risotto", ko: "리조또" }],
  "rice-brown": [{ en: "Healthy Rice", ko: "현미밥" }, { en: "Salad", ko: "샐러드" }, { en: "Bowls", ko: "볼" }]
};

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let data = JSON.parse(content);
  let count = 0;

  if (data.ingredients) {
    data.ingredients.forEach(ing => {
      const uses = USE_CASES[ing.id];
      if (uses && (!ing.best_use_cases || ing.best_use_cases.length === 0)) {
        ing.best_use_cases = uses;
        count++;
      }
    });
  }

  if (count > 0) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Added best_use_cases to ${count} ingredients in ${path.basename(filePath)}`);
  }
}

function run() {
  const files = fs.readdirSync(DATA_DIR);
  files.forEach(file => {
    if (file.endsWith('.json') && file !== 'schema.json') {
      processFile(path.join(DATA_DIR, file));
    }
  });
}

run();

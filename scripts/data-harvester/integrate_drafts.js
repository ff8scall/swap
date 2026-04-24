const fs = require('fs');
const path = require('path');

const draftsDir = path.resolve(__dirname, '../../.gravityBrain/drafts');
const ingredientsDir = path.resolve(__dirname, '../../src/lib/data/ingredients');

// 카테고리 매핑 (한국어 기준)
const categoryFileMap = {
  '소스 및 장류': 'sauces-condiments.json',
  '허브 및 향신료': 'herbs-spices.json',
  '기본 식재료 및 감미료': 'pantry-essentials-sweeteners.json',
  '베이킹 및 증점제': 'baking-thickeners.json',
  '유제품 및 유지류': 'dairy-fats.json',
  '절임 및 발효 식품': 'pickles-ferments.json',
  '건어물 및 해조류': 'seaweed-dried-seafood.json',
  '곡물 및 씨앗류': 'grains-seeds.json'
};

function integrateDrafts() {
  if (!fs.existsSync(draftsDir)) {
    console.error('❌ 드래프트 폴더가 존재하지 않습니다.');
    return;
  }

  const drafts = fs.readdirSync(draftsDir).filter(f => f.endsWith('_draft.json'));
  console.log(`📂 총 ${drafts.length}개의 드래프트를 발견했습니다.\n`);

  drafts.forEach(draftFile => {
    const draftPath = path.join(draftsDir, draftFile);
    const draftData = JSON.parse(fs.readFileSync(draftPath, 'utf8'));
    
    // 카테고리 확인
    const catKo = draftData.category.ko;
    const targetFileName = categoryFileMap[catKo];
    
    if (!targetFileName) {
      console.warn(`⚠️ [${draftData.id}] 알 수 없는 카테고리: ${catKo}. pantry-essentials-sweeteners.json 에 기본 저장합니다.`);
    }
    
    const targetPath = path.join(ingredientsDir, targetFileName || 'pantry-essentials-sweeteners.json');
    
    if (!fs.existsSync(targetPath)) {
      console.error(`❌ 대상 파일이 없습니다: ${targetPath}`);
      return;
    }

    const targetData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
    
    // 중복 확인
    const existingIndex = targetData.ingredients.findIndex(i => i.id === draftData.id);
    
    if (existingIndex !== -1) {
      console.log(`🔄 [${draftData.id}] 이미 존재합니다. 업데이트합니다.`);
      targetData.ingredients[existingIndex] = draftData;
    } else {
      console.log(`➕ [${draftData.id}] 새로 추가합니다. -> ${targetFileName}`);
      targetData.ingredients.push(draftData);
    }

    // 메타데이터 업데이트
    targetData.meta.count = targetData.ingredients.length;
    targetData.meta.generated_at = new Date().toISOString();

    fs.writeFileSync(targetPath, JSON.stringify(targetData, null, 2), 'utf8');
  });

  console.log('\n✅ 모든 데이터 통합이 완료되었습니다.');
}

integrateDrafts();

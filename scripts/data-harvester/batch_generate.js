const { execSync } = require('child_process');
const path = require('path');

const ingredients = [
  'myeolchi-yuksu', 'ssaltteumul', 'mul-yeot', 'kkaennip', 'saeu-jeot',
  'guk-ganjang', 'tteok', 'perilla-oil', 'maesil-cheong', 'cheongju',
  'cake-flour', 'bread-flour', 'self-rising-flour', 'yeast-dry', 'almond-flour',
  'tapioca-starch', 'potato-starch', 'glutinous-rice-flour', 'mirin-homemade', 'tahini'
];

const scriptPath = path.join(__dirname, 'generate_with_ollama.js');

console.log(`🎬 20종 식재료 배치 생성 시작... (총 ${ingredients.length}개)`);
console.log('--------------------------------------------------');

ingredients.forEach((item, index) => {
  console.log(`[${index + 1}/${ingredients.length}] '${item}' 생성 중...`);
  try {
    // 각 생성 작업을 동기적으로 실행 (Ollama 부하 조절)
    execSync(`node "${scriptPath}" ${item}`, { stdio: 'inherit' });
    console.log(`✅ '${item}' 완료\n`);
  } catch (error) {
    console.error(`❌ '${item}' 실패: ${error.message}\n`);
  }
});

console.log('--------------------------------------------------');
console.log('🎉 모든 배치 작업이 종료되었습니다. .gravityBrain/drafts 폴더를 확인하세요.');

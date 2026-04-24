const fs = require('fs');
const path = require('path');

// ==========================================
// ⚙️ Configuration (설정)
// ==========================================
const OLLAMA_URL = 'http://localhost:11434/api/generate';
const MODEL_NAME = 'qwen3.5:9b'; // 사용자가 설치한 로컬 모델명
const INGREDIENT_NAME = process.argv[2];

if (!INGREDIENT_NAME) {
  console.error('\n❌ 에러: 식재료 이름을 입력해주세요.');
  console.error('💡 사용법: node generate_with_ollama.js <재료이름(예: gochujang, buttermilk)>\n');
  process.exit(1);
}

// 스키마 경로 로드 (V2.1)
const schemaPath = path.resolve(__dirname, '../../src/lib/data/ingredients/schema.json');
let schemaString = '';

try {
  schemaString = fs.readFileSync(schemaPath, 'utf8');
} catch (err) {
  console.error(`\n❌ 스키마 파일을 찾을 수 없습니다: ${schemaPath}\n`);
  process.exit(1);
}

// ==========================================
// 📝 Prompt Engineering (프롬프트 구성)
// ==========================================
const prompt = `
당신은 세계 최고 수준의 요리 과학자(Culinary Scientist)이자 데이터 엔지니어입니다.
아래 제공된 JSON Schema(V2.1)를 엄격하게 준수하여 식재료 '${INGREDIENT_NAME}'에 대한 완벽한 JSON 데이터를 작성하십시오.

[핵심 요구사항]
1. 모든 필드는 영어와 한국어를 혼용하여 스키마에 맞게 작성할 것. (예: name.ko, name.en)
2. 'properties' (pH, 수분, 당도 등)와 'thermal_behavior' (발연점 등)는 실제 요리 과학 수치에 최대한 근접하게 작성할 것. 모르면 합리적인 추정치를 넣을 것.
3. 'substitutes' (대체제)는 최소 1개 이상 작성하며, 화학적 차이(chemical_impact)와 보완 행동(compensation_action)을 매우 과학적으로 상세히 적을 것.
4. 설명, 인사말, 마크다운 백틱(\`\`\`json 등)은 절대 쓰지 마십시오. **오직 순수한 JSON 문자열만** 출력해야 파싱 에러가 나지 않습니다.

[JSON Schema V2.1]
${schemaString}
`;

// ==========================================
// 🚀 Execution (생성 로직)
// ==========================================
async function generateData() {
  console.log(`\n🚀 [${MODEL_NAME}] 모델로 '${INGREDIENT_NAME}' 데이터 생성을 시작합니다...`);
  console.log(`📡 Local Ollama API 호출 중... (추론 속도에 따라 1~3분 소요)\n`);

  try {
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL_NAME,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.1 // JSON 출력의 안정성을 위해 온도를 낮춤
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API 응답 에러: ${response.statusText}`);
    }

    const data = await response.json();
    let resultText = data.response.trim();

    // 마크다운 블록이 섞여 나왔을 경우 클렌징 (예외 처리)
    if (resultText.startsWith('```json')) {
      resultText = resultText.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (resultText.startsWith('```')) {
      resultText = resultText.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    // JSON 문법 검증
    const parsedJson = JSON.parse(resultText);
    
    // 결과물 저장 (.gravityBrain/drafts 폴더)
    const outputDir = path.resolve(__dirname, '../../.gravityBrain/drafts');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, `${INGREDIENT_NAME}_draft.json`);
    fs.writeFileSync(outputPath, JSON.stringify(parsedJson, null, 2), 'utf8');
    
    console.log(`✅ 성공! JSON 데이터가 성공적으로 생성되었습니다.`);
    console.log(`📁 파일 저장 위치: ${outputPath}\n`);
    
  } catch (error) {
    console.error(`❌ 데이터 생성 실패: ${error.message}`);
    if (error instanceof SyntaxError) {
      console.error('💡 원인: 모델이 순수한 JSON 형태가 아닌 텍스트를 출력했습니다. 모델을 변경하거나 온도를 조절해 보세요.');
    }
  }
}

generateData();

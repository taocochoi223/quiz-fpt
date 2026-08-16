const fs = require('fs');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error('No GEMINI_API_KEY found in .env');
    process.exit(1);
}
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

async function generateExplanation(question, options, correctAnswer) {
    const optionsText = options.map(opt => `- ${opt.key}: ${opt.text}`).join('\n');
    let prompt = `Bạn là một giáo sư đại học nhiệt tình, vui tính và giỏi chuyên môn.
Một sinh viên đang ôn tập câu hỏi trắc nghiệm sau:

Câu hỏi: "${question}"
Các đáp án:
${optionsText}

Đáp án ĐÚNG là: ${correctAnswer}.

Nhiệm vụ của bạn:
1. Giải thích chi tiết, ngắn gọn (dưới 100 từ) và cực kỳ dễ hiểu tại sao đáp án ${correctAnswer} lại đúng. Giải thích bằng tiếng Việt.
2. Nêu nhanh tại sao các đáp án khác lại sai.
3. Không cần chào hỏi dài dòng, hãy đi thẳng vào vấn đề. Sử dụng text thuần túy, hạn chế xuống dòng không cần thiết để tránh lỗi JSON.`;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return text.replace(/\n/g, '\\n').replace(/"/g, '\\"');
    } catch (e) {
        console.error('API Error:', e.message);
        return 'Giải thích đang được cập nhật.';
    }
}

async function processFile(filePath) {
    console.log(`Processing ${filePath}...`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const qMatches = [...content.matchAll(/"id": (\d+),\s*"question": "((?:[^"\\]|\\.)*)",\s*"options": \[([\s\S]*?)\],\s*"correctAnswer": "([^"]+)"/g)];
    
    for (const match of qMatches) {
        const fullMatch = match[0];
        const id = parseInt(match[1]);
        const question = match[2].replace(/\\n/g, '\n').replace(/\\"/g, '"');
        const optionsRaw = match[3];
        const correctAnswer = match[4];
        
        const matchIndex = content.indexOf(fullMatch);
        const afterMatch = content.substring(matchIndex + fullMatch.length, matchIndex + fullMatch.length + 50);
        if (afterMatch.includes('"explanation"')) {
            console.log(`Question ${id} already has explanation, skipping.`);
            continue;
        }

        const optMatches = [...optionsRaw.matchAll(/"key": "([^"]+)",\s*"text": "((?:[^"\\]|\\.)*)"/g)];
        const options = optMatches.map(m => ({ key: m[1], text: m[2].replace(/\\n/g, '\n').replace(/\\"/g, '"') }));

        console.log(`Generating explanation for Q${id}...`);
        await new Promise(r => setTimeout(r, 1000)); // 1 sec delay to avoid rate limit
        
        const explanation = await generateExplanation(question, options, correctAnswer);
        
        const replaceString = `\n    "correctAnswer": "${correctAnswer}",\n    "explanation": "${explanation}"`;
        content = content.replace(`\n    "correctAnswer": "${correctAnswer}"`, replaceString);
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Finished ${filePath}`);
}

async function main() {
    const files = [
        'C:/Quiz/SRC/frontend/src/data/questions_ssl101c.ts',
        'C:/Quiz/SRC/frontend/src/data/questions_ssl101c_de2.ts',
        'C:/Quiz/SRC/frontend/src/data/questions_ssl101c_de3.ts'
    ];
    
    for (const file of files) {
        await processFile(file);
    }
    console.log('All done!');
}

main();

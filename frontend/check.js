const fs = require('fs');
const ts = require('typescript');
const content = fs.readFileSync('C:/Quiz/SRC/frontend/src/data/questions_prn232.ts', 'utf8');

const regex = /export const questions_paper2: Question\[\] = (\[[\s\S]*?\]);/;
const match = content.match(regex);

if (match) {
  // Use a safer eval or new Function since we know the format
  const arrayStr = match[1];
  try {
    const data = eval(arrayStr);
    data.forEach(q => {
      if (q.options.length !== 4) {
        console.log(`Question ${q.id} has ${q.options.length} options!`);
      }
    });
  } catch (e) {
    console.log("Error parsing:", e.message);
  }
} else {
  console.log("No match found");
}

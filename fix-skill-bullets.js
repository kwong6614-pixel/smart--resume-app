const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'app', 'api', 'generate-dynamic-resume-pdf', 'templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
for (const file of files) {
  const fp = path.join(dir, file);
  let text = fs.readFileSync(fp, 'utf8');
  text = text.replace(/\.replace\(\/\*\*\/g, ''\)/g, ".replace(/\\*\\*/g, '')");
  fs.writeFileSync(fp, text, 'utf8');
}
console.log('fixed malformed regex replacements');

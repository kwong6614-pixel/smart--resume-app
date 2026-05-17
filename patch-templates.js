const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'app', 'api', 'generate-dynamic-resume-pdf', 'templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
for (const file of files) {
  const fp = path.join(dir, file);
  let text = fs.readFileSync(fp, 'utf8');
  text = text.replace(/import\s*\{[^}]*\}\s*from '\.\.\/utils';/g,
    "import { TemplateContext, wrapText, wrapBulletText, formatDate, drawTextWithBold, COLORS, BULLET_CHAR } from '../utils';");
  text = text.replace(/PDF_BULLET_SIZE_MULTIPLIER/g, '1.2');
  text = text.replace(/PDF_BULLET/g, 'BULLET_CHAR');
  text = text.replace(/wrapTextWithIndent\(/g, 'wrapBulletText(');
  text = text.replace(/wrapSkillsAfterCategory\([\s\S]*?\)/g, 'wrapText(skillsText, font, bodySize, contentWidth - 20)');
  if (file === 'template10.ts') {
    text = text.replace(/export async function renderTemplate9\(context: TemplateContext\): Promise<Uint8Array>/g, 'export async function renderTemplate10(context: TemplateContext): Promise<Uint8Array>');
  }
  fs.writeFileSync(fp, text, 'utf8');
}

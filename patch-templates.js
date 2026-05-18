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
  text = text.replace("const lineWithoutBullet = line.trim().replace(/^[·•]\\s*/, '');",
    "const lineWithoutBullet = line.trim().replace(/^[·•]\\s*/, '').replace(/\*\*/g, '');");
  text = text.replace("const categoryName = lineWithoutBullet.substring(0, colonIndex + 1).trim();",
    "const categoryName = lineWithoutBullet.substring(0, colonIndex + 1).replace(/\*\*/g, '').trim();");
  text = text.replace("const wrappedSkills = wrapText(skillsText, font, bodySize, contentWidth - 20);",
    "const skillTextMaxWidth = contentWidth - 20 - bulletWidth - categoryWidth - spaceWidth;\n            const wrappedSkills = wrapText(skillsText, font, bodySize, skillTextMaxWidth > 0 ? skillTextMaxWidth : contentWidth - 20);");
  text = text.replace(/x: left \+ 15 \+ bulletWidth,/g, 'x: left + 15 + bulletWidth + categoryWidth + spaceWidth,');
  text = text.replace(/x: left \+ 20 \+ bulletWidth,/g, 'x: left + 20 + bulletWidth + categoryWidth + spaceWidth,');
  if (file === 'template10.ts') {
    text = text.replace(/export async function renderTemplate9\(context: TemplateContext\): Promise<Uint8Array>/g, 'export async function renderTemplate10(context: TemplateContext): Promise<Uint8Array>');
  }
  fs.writeFileSync(fp, text, 'utf8');
}

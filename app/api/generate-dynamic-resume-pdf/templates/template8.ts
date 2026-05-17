import { PDFPage, rgb } from 'pdf-lib';
import { TemplateContext, wrapText, wrapBulletText, formatDate, drawTextWithBold, COLORS, SPACING, BULLET_INDENT, BULLET_CHAR, SKILL_CONTINUATION_INDENT, parseEducationLine, isEducationSection, splitIntoBulletLines } from '../utils';

// TEMPLATE 8: PREMIUM TIMELINE - Vertical timeline-inspired experience flow with elegant date alignment
export async function renderTemplate8(context: TemplateContext): Promise<Uint8Array> {
  const { pdfDoc, font, fontBold, name, email, phone, location, linkedin, body, PAGE_WIDTH, PAGE_HEIGHT } = context;
  let { page } = context;
  
  const BLACK = COLORS.BLACK;
  const DARK_GRAY = rgb(0.2, 0.2, 0.2);
  const MEDIUM_GRAY = rgb(0.48, 0.48, 0.48);
  const ACCENT_BLUE = rgb(0.25, 0.45, 0.65);
  const LIGHT_GRAY = rgb(0.92, 0.92, 0.92);
  
  // Layout - accommodates timeline indent
  const MARGIN_LEFT = 50;
  const MARGIN_RIGHT = 50;
  const MARGIN_TOP = 54;
  const MARGIN_BOTTOM = 48;
  const TIMELINE_LEFT = MARGIN_LEFT + 8;
  const CONTENT_LEFT = TIMELINE_LEFT + 25;
  const CONTENT_WIDTH = PAGE_WIDTH - CONTENT_LEFT - MARGIN_RIGHT;
  
  // Typography
  const NAME_SIZE = 26;
  const CONTACT_SIZE = 8.5;
  const SECTION_SIZE = 10.5;
  const JOB_TITLE_SIZE = 10;
  const BODY_SIZE = 9.5;
  const LINE_HEIGHT = BODY_SIZE * SPACING.BULLET_LINE_HEIGHT;
  
  const TIMELINE_DOT_RADIUS = 4;
  const TIMELINE_LINE_THICKNESS = 1;
  
  let y = PAGE_HEIGHT - MARGIN_TOP;
  
  // === HEADER ===
  if (name) {
    page.drawText(name, { x: MARGIN_LEFT, y, size: NAME_SIZE, font: fontBold, color: BLACK });
    y -= NAME_SIZE + 8;
  }
  
  const contactParts = [location, phone, email, linkedin].filter(Boolean);
  if (contactParts.length > 0) {
    page.drawText(contactParts.join('   •   '), { x: MARGIN_LEFT, y, size: CONTACT_SIZE, font, color: MEDIUM_GRAY });
    y -= CONTACT_SIZE + 16;
  }
  
  // === BODY ===
  const bodyLines = body.split('\n');
  let isFirstJob = true;
  let isFirstBulletAfterJob = false;
  let currentSection = '';
  let isFirstEducation = true;
  let timelineJobCount = 0;

  const spaceWidthForSkills = font.widthOfTextAtSize(' ', BODY_SIZE);

  const wrapSkillsLine = (text: string, maxWidth: number): string[] => {
    const skillMatch = text.match(/^[\-\·•]\s*(\*\*[^*]+\*\*:?|[^:]+:)\s*(.*)$/);
    if (!skillMatch) return wrapText(text, font, BODY_SIZE, maxWidth);
    const category = skillMatch[1];
    const content = skillMatch[2];
    const categoryDisplayText = category.replace(/\*\*/g, '');
    const bulletWidth = font.widthOfTextAtSize(BULLET_CHAR + '   ', BODY_SIZE);
    const categoryWidth = fontBold.widthOfTextAtSize(categoryDisplayText + ' ', BODY_SIZE);
    const wrappedContent = wrapText(content, font, BODY_SIZE, maxWidth - categoryWidth - bulletWidth);
    const lines: string[] = [];
    const continuationSpaces = ' '.repeat(Math.max(0, Math.ceil(SKILL_CONTINUATION_INDENT / spaceWidthForSkills)));
    for (let i = 0; i < wrappedContent.length; i++) {
      if (i === 0) lines.push(BULLET_CHAR + '   ' + category + ' ' + wrappedContent[i]);
      else lines.push(continuationSpaces + wrappedContent[i]);
    }
    return lines;
  };

  for (let i = 0; i < bodyLines.length; i++) {
    const line = bodyLines[i].trim();
    
    if (!line) {
      y -= 3;
      continue;
    }
    
    // Section header
    if (line.endsWith(':')) {
      y -= SPACING.SECTION_GAP;
      
      if (y < MARGIN_BOTTOM + 50) {
        page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
        context.page = page;
        y = PAGE_HEIGHT - MARGIN_TOP;
      }
      
      currentSection = line.slice(0, -1).toLowerCase();
      const sectionName = line.slice(0, -1);
      
      // Section header with minimal styling
      page.drawText(sectionName, { x: MARGIN_LEFT, y, size: SECTION_SIZE, font: fontBold, color: DARK_GRAY });
      y -= SPACING.AFTER_SECTION_HEADER + 2;
      
      // Draw subtle underline
      page.drawLine({
        start: { x: MARGIN_LEFT, y },
        end: { x: PAGE_WIDTH - MARGIN_RIGHT, y },
        thickness: 0.5,
        color: LIGHT_GRAY
      });
      y -= 8;
      
      isFirstJob = true;
      isFirstBulletAfterJob = false;
      isFirstEducation = true;
      timelineJobCount = 0;
      continue;
    }
    
    // Education entry
    if (isEducationSection(currentSection)) {
      const eduParsed = parseEducationLine(line);
      if (eduParsed) {
        if (!isFirstEducation) y -= SPACING.EDUCATION_GAP;
        isFirstEducation = false;
        
        if (y < MARGIN_BOTTOM + 40) {
          page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
          context.page = page;
          y = PAGE_HEIGHT - MARGIN_TOP;
        }
        
        page.drawText(eduParsed.degree, { x: MARGIN_LEFT, y, size: JOB_TITLE_SIZE, font: fontBold, color: BLACK });
        y -= JOB_TITLE_SIZE + 2;
        
        page.drawText(`${eduParsed.institution}  •  ${eduParsed.year}`, { x: MARGIN_LEFT, y, size: BODY_SIZE, font, color: MEDIUM_GRAY });
        y -= BODY_SIZE + 6;
        continue;
      }
    }
    
    // Job line - with timeline dots
    const jobMatch = line.match(/^(.+?) at (.+?):\s*(.+)$/);
    if (jobMatch) {
      const [, jobTitle, company, period] = jobMatch;
      
      if (!isFirstJob) y -= SPACING.JOB_GAP;
      isFirstJob = false;
      timelineJobCount++;
      
      if (y < MARGIN_BOTTOM + 60) {
        page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
        context.page = page;
        y = PAGE_HEIGHT - MARGIN_TOP;
      }
      
      // Draw timeline dot
      page.drawCircle({
        x: TIMELINE_LEFT,
        y: y - (JOB_TITLE_SIZE / 2 - 2),
        size: TIMELINE_DOT_RADIUS,
        color: ACCENT_BLUE
      });
      
      // Draw connecting line to next job (if not first)
      if (!isFirstJob) {
        page.drawLine({
          start: { x: TIMELINE_LEFT, y: y + 10 },
          end: { x: TIMELINE_LEFT, y: y - 30 },
          thickness: TIMELINE_LINE_THICKNESS,
          color: LIGHT_GRAY
        });
      }
      
      page.drawText(jobTitle.trim(), { x: CONTENT_LEFT, y, size: JOB_TITLE_SIZE, font: fontBold, color: BLACK });
      y -= JOB_TITLE_SIZE + 2;
      
      const periodFormatted = formatDate(period.trim());
      page.drawText(`${company.trim()}  •  ${periodFormatted}`, { x: CONTENT_LEFT, y, size: BODY_SIZE, font, color: MEDIUM_GRAY });
      y -= SPACING.AFTER_JOB_HEADER;
      isFirstBulletAfterJob = true;
      continue;
    }

    const isSkillsSection = currentSection.includes('skill') || currentSection.includes('technologies');
    const isSkillLine = line.match(/^[\-\·•]\s*(\*\*[^*]+\*\*:?|[A-Za-z &\/]+:)\s*.+$/);
    if (isSkillsSection && isSkillLine) {
      const wrappedLines = wrapSkillsLine(line, CONTENT_WIDTH - BULLET_INDENT);
      for (let j = 0; j < wrappedLines.length; j++) {
        if (y < MARGIN_BOTTOM) {
          page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
          context.page = page;
          y = PAGE_HEIGHT - MARGIN_TOP;
        }
        const xPos = MARGIN_LEFT + BULLET_INDENT;
        drawTextWithBold(page, wrappedLines[j], xPos, y, font, fontBold, BODY_SIZE, BLACK);
        y -= LINE_HEIGHT;
      }
      y -= SPACING.BULLET_GAP;
      continue;
    }
    
    // Bullet or regular text
    const isExperienceSection = currentSection.includes('experience') || currentSection.includes('professional');
    let linesToRender = [line];
    if (isExperienceSection && !/^[\-\·•]\s/.test(line)) {
      const bulletLines = splitIntoBulletLines(line);
      if (bulletLines.length > 1) linesToRender = bulletLines;
    }
    
    for (const singleLine of linesToRender) {
      const wrapped = wrapBulletText(singleLine, font, BODY_SIZE, CONTENT_WIDTH - BULLET_INDENT);
      
      if (wrapped.hasBullet && isFirstBulletAfterJob) {
        y -= SPACING.BEFORE_FIRST_BULLET;
        isFirstBulletAfterJob = false;
      }
      
      for (const wline of wrapped.lines) {
        if (y < MARGIN_BOTTOM) {
          page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
          context.page = page;
          y = PAGE_HEIGHT - MARGIN_TOP;
        }
        
        const xPos = wrapped.hasBullet ? CONTENT_LEFT + BULLET_INDENT : CONTENT_LEFT;
        drawTextWithBold(page, wline, xPos, y, font, fontBold, BODY_SIZE, BLACK);
        y -= LINE_HEIGHT;
      }
      
      if (wrapped.hasBullet) y -= SPACING.BULLET_GAP;
    }
  }
  
  return await pdfDoc.save();
}

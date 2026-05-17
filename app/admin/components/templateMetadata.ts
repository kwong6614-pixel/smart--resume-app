// Template metadata with descriptions and visual characteristics
export interface TemplateMetadata {
  value: number;
  label: string;
  description: string;
  category: 'classic' | 'modern' | 'professional' | 'minimal';
  features: string[];
  bestFor: string;
  accentColor: string;
  marginSize: 'compact' | 'balanced' | 'generous';
}

export const PDF_TEMPLATES: TemplateMetadata[] = [
  {
    value: 1,
    label: 'Bold Header',
    description: 'Strong typography with horizontal separator',
    category: 'classic',
    features: ['Bold name', 'Horizontal rule', 'Clean layout'],
    bestFor: 'General professionals',
    accentColor: 'bg-gray-700',
    marginSize: 'balanced',
  },
  {
    value: 2,
    label: 'Accent Bar',
    description: 'Navy left accent bar with section underlines',
    category: 'modern',
    features: ['Left accent bar', 'Section dividers', 'Navy accent'],
    bestFor: 'Creative professionals',
    accentColor: 'bg-blue-900',
    marginSize: 'balanced',
  },
  {
    value: 3,
    label: 'Minimalist',
    description: 'Clean and elegant with subtle gray separators',
    category: 'minimal',
    features: ['Generous spacing', 'Subtle lines', 'Elegant typography'],
    bestFor: 'Consultants & executives',
    accentColor: 'bg-gray-400',
    marginSize: 'generous',
  },
  {
    value: 4,
    label: 'Classic Centered',
    description: 'Centered header with elegant spacing',
    category: 'classic',
    features: ['Centered layout', 'Underlined headers', 'Balanced spacing'],
    bestFor: 'Academic & traditional roles',
    accentColor: 'bg-gray-800',
    marginSize: 'balanced',
  },
  {
    value: 5,
    label: 'Modern Block',
    description: 'Large name with clean section dividers',
    category: 'modern',
    features: ['Large typography', 'Accent dividers', 'Modern feel'],
    bestFor: 'Tech professionals',
    accentColor: 'bg-blue-500',
    marginSize: 'balanced',
  },
  {
    value: 6,
    label: 'Executive Minimal',
    description: 'Luxurious whitespace with thin separators',
    category: 'professional',
    features: ['Large margins', 'Thin lines', 'Elegant spacing'],
    bestFor: 'C-level & executives',
    accentColor: 'bg-gray-600',
    marginSize: 'generous',
  },
  {
    value: 7,
    label: 'Modern Software Engineer',
    description: 'Optimized for tech with subtle background accents',
    category: 'modern',
    features: ['Background sections', 'Tech-optimized', 'Strong readability'],
    bestFor: 'Software engineers',
    accentColor: 'bg-gray-300',
    marginSize: 'balanced',
  },
  {
    value: 8,
    label: 'Premium Timeline',
    description: 'Vertical timeline flow with blue accent dots',
    category: 'professional',
    features: ['Timeline dots', 'Career flow', 'Visual progression'],
    bestFor: 'Career progression showcase',
    accentColor: 'bg-teal-500',
    marginSize: 'balanced',
  },
  {
    value: 9,
    label: 'Staff Engineer Pro',
    description: 'Enterprise aesthetic with premium section headers',
    category: 'professional',
    features: ['Accent bars', 'Premium styling', 'Leadership focused'],
    bestFor: 'Staff & principal engineers',
    accentColor: 'bg-teal-600',
    marginSize: 'balanced',
  },
  {
    value: 10,
    label: 'Ultra Clean ATS+',
    description: 'Minimal decoration, optimized for ATS parsing',
    category: 'minimal',
    features: ['No decorations', 'ATS-friendly', 'Maximum readability'],
    bestFor: 'ATS optimization',
    accentColor: 'bg-gray-800',
    marginSize: 'compact',
  },
];

export function getTemplateById(id: number): TemplateMetadata | undefined {
  return PDF_TEMPLATES.find(t => t.value === id);
}

export function getTemplatesByCategory(category: TemplateMetadata['category']): TemplateMetadata[] {
  return PDF_TEMPLATES.filter(t => t.category === category);
}

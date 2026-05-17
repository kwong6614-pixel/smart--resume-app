'use client';
import { PDF_TEMPLATES, TemplateMetadata } from './templateMetadata';
import TemplateCard from './TemplateCard';

interface TemplateSelectorGridProps {
  selectedTemplate: number;
  onSelect: (templateId: number) => void;
  onPreview: (templateId: number) => void;
}

export default function TemplateSelectorGrid({
  selectedTemplate,
  onSelect,
  onPreview,
}: TemplateSelectorGridProps) {
  // Group templates by category
  const categories: Array<{ name: string; label: string; templates: TemplateMetadata[] }> = [
    { name: 'classic', label: 'Classic Templates', templates: PDF_TEMPLATES.filter(t => t.category === 'classic') },
    { name: 'modern', label: 'Modern Templates', templates: PDF_TEMPLATES.filter(t => t.category === 'modern') },
    { name: 'professional', label: 'Professional Templates', templates: PDF_TEMPLATES.filter(t => t.category === 'professional') },
    { name: 'minimal', label: 'Minimal Templates', templates: PDF_TEMPLATES.filter(t => t.category === 'minimal') },
  ];

  return (
    <div className="space-y-10">
      {categories.map((category) => (
        <div key={category.name}>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">{category.label}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {category.templates.length} template{category.templates.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {category.templates.map((template) => (
              <TemplateCard
                key={template.value}
                template={template}
                isSelected={selectedTemplate === template.value}
                onSelect={onSelect}
                onPreview={onPreview}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Quick Stats */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{PDF_TEMPLATES.length}</div>
            <div className="text-sm text-gray-600">Total Templates</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {PDF_TEMPLATES.filter(t => t.category === 'modern').length}
            </div>
            <div className="text-sm text-gray-600">Modern Styles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {PDF_TEMPLATES.filter(t => t.category === 'professional').length}
            </div>
            <div className="text-sm text-gray-600">Professional</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {PDF_TEMPLATES.filter(t => t.category === 'minimal').length}
            </div>
            <div className="text-sm text-gray-600">Minimal/ATS</div>
          </div>
        </div>
      </div>
    </div>
  );
}

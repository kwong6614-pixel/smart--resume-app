'use client';
import { TemplateMetadata } from './templateMetadata';

interface TemplateCardProps {
  template: TemplateMetadata;
  isSelected: boolean;
  onSelect: (templateId: number) => void;
  onPreview: (templateId: number) => void;
}

export default function TemplateCard({
  template,
  isSelected,
  onSelect,
  onPreview,
}: TemplateCardProps) {
  return (
    <div
      onClick={() => onSelect(template.value)}
      className={`
        group relative rounded-xl border-2 transition-all duration-200 cursor-pointer
        ${
          isSelected
            ? 'border-blue-600 bg-blue-50 shadow-lg'
            : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
        }
      `}
    >
      {/* Selected Badge */}
      {isSelected && (
        <div className="absolute top-3 right-3 bg-blue-600 text-white rounded-full p-1">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      {/* Template Preview Area */}
      <div className={`p-6 ${template.accentColor} text-white rounded-t-[9px] h-24 flex flex-col justify-center items-center`}>
        <div className="text-center">
          <div className="text-sm font-semibold opacity-90 mb-1">{template.label}</div>
          <div className="text-xs opacity-75">Template {template.value}</div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{template.description}</p>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {template.features.slice(0, 2).map((feature, idx) => (
              <span
                key={idx}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {feature}
              </span>
            ))}
            {template.features.length > 2 && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                +{template.features.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Best For */}
        <div className="text-xs text-gray-500 mb-4 border-t pt-3">
          <span className="font-semibold text-gray-600">Best for: </span>
          {template.bestFor}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(template.value);
            }}
            className="flex-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 py-2 px-3 rounded transition-colors"
          >
            Preview
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(template.value);
            }}
            className={`flex-1 text-xs font-medium py-2 px-3 rounded transition-colors ${
              isSelected
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isSelected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  );
}

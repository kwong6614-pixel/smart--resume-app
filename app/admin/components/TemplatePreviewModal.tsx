'use client';
import { useState } from 'react';
import ResumeTemplatePreview from './ResumeTemplatePreview';
import { getTemplateById } from './templateMetadata';

interface TemplatePreviewModalProps {
  templateId: number | null;
  onClose: () => void;
}

export default function TemplatePreviewModal({
  templateId,
  onClose,
}: TemplatePreviewModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const template = templateId ? getTemplateById(templateId) : null;

  if (!templateId || !template) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ${
          isFullscreen
            ? 'w-full h-full'
            : 'w-full h-full max-w-5xl max-h-[90vh]'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
          <div>
            <h2 className="text-lg font-bold text-gray-800">{template.label}</h2>
            <p className="text-sm text-gray-600">{template.description}</p>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6v12h12v-4m4-6v10h-4"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              title="Close preview"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Content - Scrollable Preview */}
        <div className="flex-1 overflow-auto bg-gray-100 flex items-start justify-center p-4">
          <div className="bg-white shadow-lg">
            <ResumeTemplatePreview templateId={templateId} />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">Category:</span> {template.category}
            <span className="mx-2">•</span>
            <span className="font-semibold">Margin:</span> {template.marginSize}
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}

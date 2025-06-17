import React from 'react';
import { X } from 'lucide-react';
import { ExportOptions } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  exportOptions: ExportOptions;
  onExportOptionsChange: (updates: Partial<ExportOptions>) => void;
  onExport: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  exportOptions,
  onExportOptionsChange,
  onExport
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Export Options
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Format
            </label>
            <div className="flex space-x-2">
              {(['svg', 'png', 'jpg'] as const).map((format) => (
                <button
                  key={format}
                  onClick={() => onExportOptionsChange({ format })}
                  className={`px-3 py-2 rounded-lg text-sm font-medium uppercase transition-colors ${
                    exportOptions.format === format
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>

          {/* Price Options */}
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="withPrice"
                checked={exportOptions.withPrice}
                onChange={(e) => onExportOptionsChange({ withPrice: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="withPrice" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Include Price Information
              </label>
            </div>

            {exportOptions.withPrice && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price Position
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['left', 'right', 'both', 'none'] as const).map((position) => (
                      <button
                        key={position}
                        onClick={() => onExportOptionsChange({ pricePosition: position })}
                        className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                          exportOptions.pricePosition === position
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {position}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'showOpen', label: 'Show Open' },
                    { key: 'showHigh', label: 'Show High' },
                    { key: 'showLow', label: 'Show Low' },
                    { key: 'showClose', label: 'Show Close' }
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        id={key}
                        checked={exportOptions[key as keyof ExportOptions] as boolean}
                        onChange={(e) => onExportOptionsChange({ [key]: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={key} className="ml-2 text-xs text-gray-700 dark:text-gray-300">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Background Options */}
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="withBackground"
                checked={exportOptions.withBackground}
                onChange={(e) => onExportOptionsChange({ withBackground: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="withBackground" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Include Background
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="withGrid"
                checked={exportOptions.withGrid}
                onChange={(e) => onExportOptionsChange({ withGrid: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="withGrid" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Include Grid
              </label>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onExport();
                onClose();
              }}
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
import React from 'react';
import { predefinedPatterns } from '../data/patterns';
import { PredefinedPattern } from '../types';

interface PatternSelectorProps {
  onSelectPattern: (pattern: PredefinedPattern) => void;
}

const PatternSelector: React.FC<PatternSelectorProps> = ({ onSelectPattern }) => {
  const categories = {
    bullish: predefinedPatterns.filter(p => p.category === 'bullish'),
    bearish: predefinedPatterns.filter(p => p.category === 'bearish'),
    neutral: predefinedPatterns.filter(p => p.category === 'neutral')
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Predefined Patterns
      </h3>
      
      {Object.entries(categories).map(([category, patterns]) => (
        <div key={category} className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 capitalize flex items-center">
            {category === 'bullish' && '🔼'} 
            {category === 'bearish' && '🔽'} 
            {category === 'neutral' && '⚖️'} 
            <span className="ml-2">{category} Patterns</span>
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {patterns.map((pattern) => (
              <button
                key={pattern.name}
                onClick={() => onSelectPattern(pattern)}
                className="p-3 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{pattern.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      {pattern.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {pattern.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatternSelector;
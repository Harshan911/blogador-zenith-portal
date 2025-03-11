
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface KeywordsInputProps {
  keywords: string[];
  onChange: (keywords: string[]) => void;
}

const KeywordsInput: React.FC<KeywordsInputProps> = ({ keywords, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddKeyword = () => {
    if (inputValue.trim() && !keywords.includes(inputValue.trim())) {
      const newKeywords = [...keywords, inputValue.trim()];
      onChange(newKeywords);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const removeKeyword = (index: number) => {
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    onChange(newKeywords);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a keyword and press Enter"
        />
        <Button type="button" onClick={handleAddKeyword} size="sm">
          Add
        </Button>
      </div>
      
      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {keywords.map((keyword, index) => (
            <div 
              key={index} 
              className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm"
            >
              {keyword}
              <button
                type="button"
                onClick={() => removeKeyword(index)}
                className="text-primary/60 hover:text-primary transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KeywordsInput;

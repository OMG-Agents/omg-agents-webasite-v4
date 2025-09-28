'use client';
import { useTranslation } from '@/contexts/TranslationContext';

interface LanguageToggleProps {
  variant?: 'default' | 'footer';
}

export default function LanguageToggle({ variant = 'default' }: LanguageToggleProps) {
  const { language, setLanguage } = useTranslation();

  const setLanguageToEn = () => {
    setLanguage('en');
  };

  const setLanguageToJa = () => {
    setLanguage('ja');
  };

  // Footer variant uses the same segmented control but with dark theme
  if (variant === 'footer') {
    return (
      <div className="flex bg-gray-800 rounded-md shadow-sm border border-gray-700 overflow-hidden">
        <button
          onClick={setLanguageToJa}
          className={`px-2 py-1 text-xs font-medium transition-colors ${
            language === 'ja' 
              ? 'text-white' 
              : 'text-gray-400 hover:text-gray-200'
          }`}
          style={{
            backgroundColor: language === 'ja' ? '#733CFF' : 'transparent'
          }}
        >
          JP
        </button>
        <button
          onClick={setLanguageToEn}
          className={`px-2 py-1 text-xs font-medium transition-colors ${
            language === 'en' 
              ? 'text-white' 
              : 'text-gray-400 hover:text-gray-200'
          }`}
          style={{
            backgroundColor: language === 'en' ? '#733CFF' : 'transparent'
          }}
        >
          EN
        </button>
      </div>
    );
  }

  // Default variant uses the segmented control
  return (
    <div className="flex bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={setLanguageToJa}
        className={`px-2 py-1 text-xs font-medium transition-colors ${
          language === 'ja' 
            ? 'text-white' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
        style={{
          backgroundColor: language === 'ja' ? '#733CFF' : 'transparent'
        }}
      >
        JP
      </button>
      <button
        onClick={setLanguageToEn}
        className={`px-2 py-1 text-xs font-medium transition-colors ${
          language === 'en' 
            ? 'text-white' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
        style={{
          backgroundColor: language === 'en' ? '#733CFF' : 'transparent'
        }}
      >
        EN
      </button>
    </div>
  );
}






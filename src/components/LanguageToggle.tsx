'use client';
import { useTranslation } from '@/contexts/TranslationContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ja' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200 border border-gray-300 rounded-md hover:border-indigo-300"
    >
      {language === 'en' ? '日本語' : 'English'}
    </button>
  );
}






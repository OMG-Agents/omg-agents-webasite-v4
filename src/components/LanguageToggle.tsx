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
      className="text-sm font-medium text-black hover:text-gray-600 hover:underline transition-colors"
    >
      {language === 'en' ? '日本語' : 'English'}
    </button>
  );
}






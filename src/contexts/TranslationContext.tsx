'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ja';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tObject: (key: string) => unknown;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [language, setLanguage] = useState<Language>('ja');
  const [translations, setTranslations] = useState<Record<string, unknown>>({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`../translations/${language}.json`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to English if loading fails
        if (language !== 'en') {
          const enModule = await import('../translations/en.json');
          setTranslations(enModule.default);
        }
      }
    };

    loadTranslations();
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return the key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const tObject = (key: string): unknown => {
    const keys = key.split('.');
    let value: unknown = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return null; // Return null if translation not found
      }
    }
    
    return value;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, tObject }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}






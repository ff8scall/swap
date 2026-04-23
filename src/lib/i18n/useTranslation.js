"use client";
import en from './en.json';
import ko from './ko.json';
import { useLanguage } from './LanguageContext';

const dictionaries = { en, ko };

export default function useTranslation() {
  const { lang } = useLanguage();
  const dict = dictionaries[lang] || en;

  const t = (path) => {
    return path.split('.').reduce((obj, key) => obj?.[key], dict) || path;
  };

  return { t, lang };
}

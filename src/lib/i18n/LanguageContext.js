"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  // 브라우저 언어 설정 확인 (초기 1회)
  useEffect(() => {
    const savedLang = localStorage.getItem('preferred_lang');
    if (savedLang) {
      setLang(savedLang);
    } else if (navigator.language.startsWith('ko')) {
      setLang('ko');
    }
  }, []);

  const toggleLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('preferred_lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

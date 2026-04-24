'use client';

import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    if (!navigator.onLine) setIsOffline(true);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-[9999] animate-in slide-in-from-top duration-300">
      <div className="bg-amber-500/90 backdrop-blur-md text-white px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium shadow-lg">
        <WifiOff size={16} />
        <span>오프라인 모드입니다. 캐싱된 데이터를 표시합니다.</span>
      </div>
    </div>
  );
}

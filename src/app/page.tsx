'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dancing_Script } from 'next/font/google';
import GoogleAd from '@/components/GoogleAd';

const dancingScript = Dancing_Script({
  subsets: ['latin']
});

interface Question {
  id: string;
  question_text: string;
  options: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  point: number;
}

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [counters, setCounters] = useState({ participants: 0, certificates: 0 });

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const response = await fetch('/api/counters');
        if (!response.ok) throw new Error('Failed to fetch counters');
        const data = await response.json();
        setCounters(data);
      } catch (error) {
        console.error('Error fetching counters:', error);
      }
    };

    fetchCounters();
    // Her 30 saniyede bir sayaçları güncelle
    const interval = setInterval(fetchCounters, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Katılımcı sayacını artır
      await fetch('/api/counters/increment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'participants' })
      });
      
      // Quiz sayfasına yönlendir
      router.push('/quiz');
    } catch (error) {
      console.error('Error:', error);
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <Image
        src="/images/blue.jpg"
        alt="Background"
        fill
        className="object-cover z-0"
        priority
        quality={100}
      />

      {/* Sayaçlar - Sol Üst Köşe */}
      <div className="absolute top-6 left-6 z-20 flex gap-4">
        <div className="backdrop-blur-md bg-white/80 rounded-xl border border-white/20 shadow-lg px-4 py-2 text-center">
          <div className="text-2xl font-bold text-gray-900">{counters.participants}</div>
          <div className="text-xs text-gray-600">Katılımcı</div>
        </div>
        <div className="backdrop-blur-md bg-white/80 rounded-xl border border-white/20 shadow-lg px-4 py-2 text-center">
          <div className="text-2xl font-bold text-gray-900">{counters.certificates}</div>
          <div className="text-xs text-gray-600">Sertifika</div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen relative z-10">
        {/* Mobil için üst boşluk */}
        <div className="h-16 md:hidden"></div>
        
        {/* Logo */}
        <div className="w-auto h-16 relative inline-flex items-center gap-2 mb-8">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🎬</span>
            </div>
          </div>
          <span className={`text-3xl font-bold text-gray-800 ${dancingScript.className}`}>CineMotto</span>
        </div>

        {/* Description Container */}
        <div className="max-w-3xl w-full text-center mb-12">
          <div className="backdrop-blur-md bg-white/80 rounded-2xl border border-white/20 shadow-xl p-8">
            <p className="text-lg md:text-xl text-gray-900 leading-relaxed">
              Filmlerin en ikonik repliklerini hatırlıyor musunuz? Unutulmaz
              cümleleri hangi filmle eşleştirebileceğinizi tahmin edin ve film
              bilginizi test edin! Eğer sınavı başarılı bir şekilde
              tamamlarsanız, size özel bir sertifika ile ödüllendirileceksiniz.
              Sadece en iyi film tutkunları bu testi geçebilir! Ne kadar film
              bilgisine sahipsiniz? Hadi başlayın ve keşfedin!
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-500/20">
            <p className="text-white">{error}</p>
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          <button 
            onClick={handleStart}
            className="mt-6 w-full bg-gradient-to-r from-blue-500/50 via-cyan-400/50 to-emerald-400/50 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            {loading ? 'Yükleniyor...' : 'Hadi Başlayalım'}
          </button>
        </div>

        {/* Reklam Container */}
        <div className="w-full max-w-4xl mx-auto mt-12">
          <div className="flex justify-center">
            <div className="hidden md:block">
              {/* Desktop Reklam */}
              <GoogleAd 
                adSlot="3335682767"
                style={{ display: 'inline-block', width: '728px', height: '90px' }}
              />
            </div>
            <div className="md:hidden">
              {/* Mobil Reklam */}
              <GoogleAd 
                adSlot="3335682767"
                style={{ display: 'inline-block', width: '320px', height: '100px' }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

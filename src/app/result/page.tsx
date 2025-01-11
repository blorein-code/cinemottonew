'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');
  const score = searchParams.get('score');
  const correctAnswers = searchParams.get('correct');

  const handleRetry = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen relative">
      <Image
        src="/images/blue.jpg"
        alt="Background"
        fill
        className="object-cover"
        priority
        quality={100}
      />

      <main className="relative h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="backdrop-blur-md bg-white/80 rounded-2xl border border-white/20 shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-rose-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {reason === 'timeout' ? 'Süreniz Doldu!' : 'Başarısız Oldunuz!'}
                </h1>
                {reason === 'timeout' ? (
                  <p className="text-gray-600">
                    Maalesef soruları belirlenen süre içinde tamamlayamadınız.
                  </p>
                ) : (
                  <p className="text-gray-600">
                    {correctAnswers} doğru cevap ile {score} puan aldınız. Sertifika almak için en az 7 doğru cevap veya 75 puan almanız gerekiyor.
                  </p>
                )}
              </div>

              <button
                onClick={handleRetry}
                className="w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                Tekrar Dene
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
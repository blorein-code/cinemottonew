'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function CertificatePage() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score');
  const correct = searchParams.get('correct');

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/certificates/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          surname,
          score,
          correct,
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push(data.redirectUrl);
      } else {
        throw new Error(data.error || 'Bir hata oluştu');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!score || !correct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Geçersiz Sertifika İsteği</h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

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
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Tebrikler! 🎉
                </h1>
                <p className="text-gray-600">
                  {correct} doğru cevap ile {score} puan aldınız.
                </p>
                <p className="text-gray-600 mt-2">
                  Sertifikanızı Almak için son bir adım kaldı!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Adınız
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-900/10 border border-white/20 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Adınızı girin"
                  />
                </div>

                <div>
                  <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
                    Soyadınız
                  </label>
                  <input
                    type="text"
                    id="surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-900/10 border border-white/20 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Soyadınızı girin"
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm text-center">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !name || !surname}
                  className="w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Sertifika Oluşturuluyor...' : 'Sertifika Oluştur'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
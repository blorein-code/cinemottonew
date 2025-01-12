'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaXTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa6';
import { SiBluesky } from 'react-icons/si';
import { Dancing_Script, Playfair_Display } from 'next/font/google';

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

const dancingScript = Dancing_Script({
  subsets: ['latin']
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['italic']
});

interface Certificate {
  name: string;
  surname: string;
  score: string;
  correct: string;
  createdAt: string;
}

export default function CertificateViewPage() {
  const params = useParams();
  const router = useRouter();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sertifika verilerini getir
  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await fetch(`/api/certificates/${params.id}`);
        if (!response.ok) {
          throw new Error('Certificate not found');
        }
        const data = await response.json();
        setCertificate(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load certificate');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCertificate();
    }
  }, [params.id]);

  // Loading ve error durumlarını kontrol et
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error || !certificate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Sertifika Bulunamadı</h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors shadow-lg font-medium border-2 border-white/20"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  const shareOnTwitter = () => {
    const shareUrl = `${window.location.origin}/certificate/view/${params.id}`;
    const text = `Film Replikleri Testini ${certificate.score} puan ile tamamladım! 🎬 Sertifikamı görüntüle: ${shareUrl} #CineMotto`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnFacebook = () => {
    const shareUrl = `${window.location.origin}/certificate/view/${params.id}`;
    const text = `Film Replikleri Testini ${certificate.score} puan ile tamamladım! 🎬 Sertifikamı görüntüle: ${shareUrl} #CineMotto`;
    navigator.clipboard.writeText(text).then(() => {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl), '_blank');
      alert('Paylaşım metni kopyalandı! Facebook paylaşım alanına yapıştırabilirsiniz.');
    });
  };

  const shareOnInstagramStory = () => {
    const shareUrl = `${window.location.origin}/certificate/view/${params.id}`;
    const text = `Film Replikleri Testini ${certificate.score} puan ile tamamladım! 🎬\n\nSertifikamı görüntüle: ${shareUrl}\n\n#CineMotto`;
    navigator.clipboard.writeText(text).then(() => {
      window.open('https://www.instagram.com/create/story/', '_blank');
      alert('Sertifika bilgileri kopyalandı! Instagram Story\'de paylaşabilirsiniz.');
    });
  };

  const shareOnBluesky = () => {
    const shareUrl = `${window.location.origin}/certificate/view/${params.id}`;
    const text = `Film Replikleri Testini ${certificate.score} puan ile tamamladım! 🎬 Sertifikamı görüntüle: ${shareUrl} #CineMotto`;
    window.open(`https://bsky.app/intent/compose?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-2 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Sertifika */}
        <div className="relative bg-white p-10 rounded-lg shadow-2xl mb-2 overflow-hidden">
          {/* Arka Plan */}
          <div className="absolute inset-0 bg-white"></div>
         
          {/* Ana Çerçeve */}
          <div className="absolute inset-0 border-[28px] border-double border-sky-200 rounded-lg"></div>
          <div className="absolute inset-[30px] border-2 border-sky-100 rounded-lg"></div>
          <div className="absolute inset-[34px] border border-sky-50 rounded-lg"></div>
         
          {/* İç Çerçeve Süslemeleri */}
          <div className="absolute inset-[40px] border border-sky-100/50 rounded-lg"></div>
          <div className="absolute inset-[44px] border-[0.5px] border-sky-50/30 rounded-lg"></div>

          {/* İçerik Alanı */}
          <div className="relative z-10 bg-white">
            {/* Köşe Süslemeleri - Sol Üst */}
            <div className="absolute top-0 left-0 w-52 h-52">
              <div className="absolute top-6 left-6 w-36 h-36 border-t-[3px] border-l-[3px] border-sky-200 rounded-tl-2xl"></div>
              <div className="absolute top-8 left-8 w-32 h-32 border-t-2 border-l-2 border-sky-300 rounded-tl-xl"></div>
              <div className="absolute top-10 left-10 w-28 h-28 border-t border-l border-sky-400/30 rounded-tl-lg"></div>
              {/* Dekoratif Çizgiler */}
              <div className="absolute top-[26px] left-[70px] w-[140px] h-[3px] bg-gradient-to-r from-sky-200 via-sky-300 to-transparent transform rotate-45"></div>
              <div className="absolute top-[40px] left-[60px] w-[120px] h-[2px] bg-gradient-to-r from-sky-100 via-sky-200 to-transparent transform rotate-45"></div>
              <div className="absolute top-[54px] left-[50px] w-[100px] h-[1px] bg-gradient-to-r from-sky-50 via-sky-100 to-transparent transform rotate-45"></div>
              {/* Süslü Nokta ve Halkası */}
              <div className="absolute top-12 left-12 w-4 h-4 rounded-full bg-sky-100/50"></div>
              <div className="absolute top-[46px] left-[46px] w-5 h-5 border border-sky-200/30 rounded-full"></div>
            </div>

            {/* Köşe Süslemeleri - Sağ Üst */}
            <div className="absolute top-0 right-0 w-52 h-52">
              <div className="absolute top-6 right-6 w-36 h-36 border-t-[3px] border-r-[3px] border-sky-200 rounded-tr-2xl"></div>
              <div className="absolute top-8 right-8 w-32 h-32 border-t-2 border-r-2 border-sky-300 rounded-tr-xl"></div>
              <div className="absolute top-10 right-10 w-28 h-28 border-t border-r border-sky-400/30 rounded-tr-lg"></div>
              {/* Dekoratif Çizgiler */}
              <div className="absolute top-[26px] right-[70px] w-[140px] h-[3px] bg-gradient-to-l from-sky-200 via-sky-300 to-transparent transform -rotate-45"></div>
              <div className="absolute top-[40px] right-[60px] w-[120px] h-[2px] bg-gradient-to-l from-sky-100 via-sky-200 to-transparent transform -rotate-45"></div>
              <div className="absolute top-[54px] right-[50px] w-[100px] h-[1px] bg-gradient-to-l from-sky-50 via-sky-100 to-transparent transform -rotate-45"></div>
              {/* Süslü Nokta ve Halkası */}
              <div className="absolute top-12 right-12 w-4 h-4 rounded-full bg-sky-100/50"></div>
              <div className="absolute top-[46px] right-[46px] w-5 h-5 border border-sky-200/30 rounded-full"></div>
            </div>

            {/* Köşe Süslemeleri - Sol Alt */}
            <div className="absolute bottom-0 left-0 w-52 h-52">
              <div className="absolute bottom-6 left-6 w-36 h-36 border-b-[3px] border-l-[3px] border-sky-200 rounded-bl-2xl"></div>
              <div className="absolute bottom-8 left-8 w-32 h-32 border-b-2 border-l-2 border-sky-300 rounded-bl-xl"></div>
              <div className="absolute bottom-10 left-10 w-28 h-28 border-b border-l border-sky-400/30 rounded-bl-lg"></div>
              {/* Dekoratif Çizgiler */}
              <div className="absolute bottom-[26px] left-[70px] w-[140px] h-[3px] bg-gradient-to-r from-sky-200 via-sky-300 to-transparent transform -rotate-45"></div>
              <div className="absolute bottom-[40px] left-[60px] w-[120px] h-[2px] bg-gradient-to-r from-sky-100 via-sky-200 to-transparent transform -rotate-45"></div>
              <div className="absolute bottom-[54px] left-[50px] w-[100px] h-[1px] bg-gradient-to-r from-sky-50 via-sky-100 to-transparent transform -rotate-45"></div>
              {/* Süslü Nokta ve Halkası */}
              <div className="absolute bottom-12 left-12 w-4 h-4 rounded-full bg-sky-100/50"></div>
              <div className="absolute bottom-[46px] left-[46px] w-5 h-5 border border-sky-200/30 rounded-full"></div>
            </div>

            {/* Köşe Süslemeleri - Sağ Alt */}
            <div className="absolute bottom-0 right-0 w-52 h-52">
              <div className="absolute bottom-6 right-6 w-36 h-36 border-b-[3px] border-r-[3px] border-sky-200 rounded-br-2xl"></div>
              <div className="absolute bottom-8 right-8 w-32 h-32 border-b-2 border-r-2 border-sky-300 rounded-br-xl"></div>
              <div className="absolute bottom-10 right-10 w-28 h-28 border-b border-r border-sky-400/30 rounded-br-lg"></div>
              {/* Dekoratif Çizgiler */}
              <div className="absolute bottom-[26px] right-[70px] w-[140px] h-[3px] bg-gradient-to-l from-sky-200 via-sky-300 to-transparent transform rotate-45"></div>
              <div className="absolute bottom-[40px] right-[60px] w-[120px] h-[2px] bg-gradient-to-l from-sky-100 via-sky-200 to-transparent transform rotate-45"></div>
              <div className="absolute bottom-[54px] right-[50px] w-[100px] h-[1px] bg-gradient-to-l from-sky-50 via-sky-100 to-transparent transform rotate-45"></div>
              {/* Süslü Nokta ve Halkası */}
              <div className="absolute bottom-12 right-12 w-4 h-4 rounded-full bg-sky-100/50"></div>
              <div className="absolute bottom-[46px] right-[46px] w-5 h-5 border border-sky-200/30 rounded-full"></div>
            </div>

            {/* Dekoratif Kenar Çizgileri */}
            <div className="absolute top-[90px] left-[90px] right-[90px] h-[2px] bg-gradient-to-r from-transparent via-sky-200 to-transparent"></div>
            <div className="absolute bottom-[90px] left-[90px] right-[90px] h-[2px] bg-gradient-to-r from-transparent via-sky-200 to-transparent"></div>
            <div className="absolute left-[90px] top-[90px] bottom-[90px] w-[2px] bg-gradient-to-b from-transparent via-sky-200 to-transparent"></div>
            <div className="absolute right-[90px] top-[90px] bottom-[90px] w-[2px] bg-gradient-to-b from-transparent via-sky-200 to-transparent"></div>

            {/* İç Köşe Süslemeleri */}
            <div className="absolute top-[110px] left-[110px] w-[50px] h-[50px] border-t-2 border-l-2 border-sky-100 rounded-tl-xl"></div>
            <div className="absolute top-[110px] right-[110px] w-[50px] h-[50px] border-t-2 border-r-2 border-sky-100 rounded-tr-xl"></div>
            <div className="absolute bottom-[110px] left-[110px] w-[50px] h-[50px] border-b-2 border-l-2 border-sky-100 rounded-bl-xl"></div>
            <div className="absolute bottom-[110px] right-[110px] w-[50px] h-[50px] border-b-2 border-r-2 border-sky-100 rounded-br-xl"></div>

            {/* İç Süsleme Çizgileri */}
            <div className="absolute top-[130px] left-[130px] w-[30px] h-[30px] border-t border-l border-sky-50 rounded-tl-lg"></div>
            <div className="absolute top-[130px] right-[130px] w-[30px] h-[30px] border-t border-r border-sky-50 rounded-tr-lg"></div>
            <div className="absolute bottom-[130px] left-[130px] w-[30px] h-[30px] border-b border-l border-sky-50 rounded-bl-lg"></div>
            <div className="absolute bottom-[130px] right-[130px] w-[30px] h-[30px] border-b border-r border-sky-50 rounded-br-lg"></div>

            <div className="relative space-y-4 py-4 text-center">
              {/* Başlık */}
              <div className="relative">
                {/* Logo veya İkon */}
                <div className="w-auto h-16 mx-auto mb-3 relative inline-flex items-center gap-2">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full opacity-10 animate-pulse"></div>
                    <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎬</span>
                    </div>
                  </div>
                  <span className={`text-3xl font-bold text-gray-800 ${dancingScript.className}`}>CineMotto</span>
                </div>
                <h1 className={`text-6xl font-bold text-gray-800 mb-3 ${playfair.className}`}>
                  Başarı Sertifikası
                </h1>
                <div className="w-40 h-px mx-auto bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
              </div>

              {/* İçerik */}
              <div className="space-y-4 my-10">
                <p className={`text-6xl text-gray-800 my-3 ${dancingScript.className} tracking-wide bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-transparent bg-clip-text`}>
                  {certificate.name} {certificate.surname}
                </p>
               
                <div className="my-6">
                  {/* Motivasyon Paragrafı */}
                  <div className="max-w-2xl mx-auto mt-6 text-gray-700 leading-relaxed space-y-2">
                    <p>Bu sertifikayı alarak sinema dünyamızın unutulmaz repliklerine ne kadar hakim olduğunu kanıtladın!</p>
                    <p>
                      Senin gibi bir sinema tutkunu için bu başarı,
                      <span className="italic"> Yaşhi Batı'da Aziz Vefa'nın "Bu ne cüret?"</span> diye sorması kadar şaşırtıcı,
                      <span className="italic"> G.O.R.A'da Kimsin Sen'in "Komutan Logar, bir cisim yaklaşıyor efendim!"</span> demesi kadar heyecan verici!
                    </p>
                    <p>Belki sen de bir gün, <span className="italic">"Zeki Müren de bizi görecek mi?"</span> diye sorduracak kadar büyük bir yıldız olursun, kim bilir?</p>
                    <p className="font-medium text-gray-800">Film gibi bir hayatın olsun! ✨</p>
                  </div>
                </div>

                <div className="text-base font-medium text-gray-900 mt-6">
                  {new Date(certificate.createdAt).toLocaleDateString('tr-TR')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Butonlar Container */}
        <div className="p-2 space-y-3">
          {/* Sosyal Medya Paylaşım Butonları */}
          <div className="flex justify-center gap-4">
            <button
              onClick={shareOnTwitter}
              className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-900 transition-colors shadow-md"
              aria-label="X'te Paylaş"
            >
              <FaXTwitter className="w-5 h-5" />
            </button>
            <button
              onClick={shareOnFacebook}
              className="w-10 h-10 flex items-center justify-center bg-[#4267B2] text-white rounded-full hover:bg-[#365899] transition-colors shadow-md"
              aria-label="Facebook'ta Paylaş"
            >
              <FaFacebookF className="w-5 h-5" />
            </button>
            <button
              onClick={shareOnInstagramStory}
              className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white rounded-full hover:opacity-90 transition-opacity shadow-md"
              aria-label="Instagram Story'de Paylaş"
            >
              <FaInstagram className="w-5 h-5" />
            </button>
            <button
              onClick={shareOnBluesky}
              className="w-10 h-10 flex items-center justify-center bg-[#0085FF] text-white rounded-full hover:bg-[#0066CC] transition-colors shadow-md"
              aria-label="Bluesky'da Paylaş"
            >
              <SiBluesky className="w-5 h-5" />
            </button>
          </div>

          {/* Ana Sayfa Butonu */}
          <div className="flex justify-center">
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2.5 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-colors shadow-md"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
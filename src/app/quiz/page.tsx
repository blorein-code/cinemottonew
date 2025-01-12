'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Option {
  option_text: string;
  is_correct: boolean;
}

interface Question {
  id: string;
  question_text: string;
  options: Option[];
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  point: number;
}

export default function QuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(90); // 90 saniye
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [hasIncrementedCounter, setHasIncrementedCounter] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions/random');
        if (!response.ok) {
          throw new Error('Sorular yüklenirken bir hata oluştu');
        }
        const data = await response.json();
        console.log('Gelen sorular:', data.questions);
        console.log('İlk sorunun puanı:', data.questions[0]?.point);
        setQuestions(data.questions);

        // Increment participants counter if not already done
        if (!hasIncrementedCounter) {
          await fetch('/api/counters/increment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'participants' })
          });
          setHasIncrementedCounter(true);
        }
      } catch (error) {
        console.error('Hata:', error);
        router.push('/'); // Hata durumunda ana sayfaya yönlendir
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [router, hasIncrementedCounter]);

  // Sayaç için useEffect
  useEffect(() => {
    if (loading) return; // Sorular yüklenene kadar sayacı başlatma

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // Süre bittiğinde sonuç sayfasına yönlendir
          const finalScore = score;
          const finalCorrectCount = correctAnswersCount;
          console.log('Süre bitti! Toplam puan:', finalScore);
          router.push(`/result?reason=timeout&score=${finalScore}&correct=${finalCorrectCount}`);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, score, correctAnswersCount, router]);

  useEffect(() => {
    if (!loading && timeLeft === 0) {
      const finalScore = score;
      const finalCorrectCount = correctAnswersCount;
      router.push(`/result?reason=timeout&score=${finalScore}&correct=${finalCorrectCount}`);
    }
  }, [timeLeft, loading, score, correctAnswersCount, router]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (optionText: string) => {
    if (showResult) return; // Sonuç gösteriliyorken yeni seçime izin verme
    setSelectedAnswer(optionText);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    // Doğru cevabı kontrol et
    const selectedOption = currentQuestion.options.find(
      opt => opt.option_text === selectedAnswer
    );
    const isAnswerCorrect = selectedOption?.is_correct ?? false;

    // Sonucu göster
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);

    // Mevcut puanı ve doğru sayısını al
    const currentScore = score;
    const currentCorrectCount = correctAnswersCount;
    
    // Debug için log ekle
    console.log('Current Question:', currentQuestion);
    console.log('Current Question Point:', currentQuestion.point);
    console.log('Is Answer Correct:', isAnswerCorrect);
    console.log('Current Score:', currentScore);
    console.log('Current Correct Count:', currentCorrectCount);
    
    // Yeni puanı ve doğru sayısını hesapla
    const questionPoint = Number(currentQuestion.point) || 10; // Eğer point undefined ise 10 puan ver
    const newScore = isAnswerCorrect ? currentScore + questionPoint : currentScore;
    const newCorrectCount = isAnswerCorrect ? currentCorrectCount + 1 : currentCorrectCount;

    // Debug için log ekle
    console.log('Question Point:', questionPoint);
    console.log('New Score:', newScore);
    console.log('New Correct Count:', newCorrectCount);

    // State'leri güncelle
    setScore(newScore);
    setCorrectAnswersCount(newCorrectCount);

    // 0.5 saniye sonra sonraki soruya geç veya testi bitir
    setTimeout(() => {
      if (currentQuestionIndex === questions.length - 1) {
        // Quiz bitti, sonuçları kontrol et
        console.log('Final Score:', newScore);
        console.log('Final Correct Count:', newCorrectCount);
        
        if (newScore >= 75 || newCorrectCount >= 7) {
          router.push(`/certificate?score=${newScore}&correct=${newCorrectCount}`);
        } else {
          router.push(`/result?reason=failed&score=${newScore}&correct=${newCorrectCount}`);
        }
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 500);
  };

  if (loading) {
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
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-4 text-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-white animate-pulse"></div>
              <div className="w-4 h-4 rounded-full bg-white animate-pulse delay-100"></div>
              <div className="w-4 h-4 rounded-full bg-white animate-pulse delay-200"></div>
            </div>
            <p className="text-white text-lg">Sorular Yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  // Sayacı dakika:saniye formatına çevir
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

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

      <main className="h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto h-full">
            {/* Timer */}
            <div className="flex justify-center mb-4">
              <div className="bg-gray-900/50 backdrop-blur-sm px-6 py-2 rounded-xl border border-white/10">
                <span className="text-2xl font-bold text-white">{formattedTime}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="h-2.5 bg-gray-900/50 backdrop-blur-sm rounded-full overflow-hidden border border-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-white/90 text-sm font-medium">
                Soru {currentQuestionIndex + 1} / {questions.length}
              </div>
            </div>

            {/* Question Card */}
            <div className="backdrop-blur-md bg-white/80 rounded-2xl border border-white/20 shadow-xl">
              <div className="p-6">
                {/* Question Text */}
                <p className="text-xl md:text-2xl text-gray-900 font-medium mb-6 leading-relaxed">
                  {currentQuestion.question_text}
                </p>

                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    let buttonClass = 'w-full p-4 rounded-xl text-left transition-all duration-300 backdrop-blur-sm font-medium ';
                    
                    if (showResult) {
                      if (option.is_correct) {
                        buttonClass += 'bg-emerald-500/30 text-gray-900 border-2 border-emerald-400/50 shadow-lg shadow-emerald-500/30';
                      } else if (selectedAnswer === option.option_text && !option.is_correct) {
                        buttonClass += 'bg-rose-500/30 text-gray-900 border-2 border-rose-400/50 shadow-lg shadow-rose-500/30';
                      } else {
                        buttonClass += 'bg-gray-900/10 text-gray-500 border border-white/10 opacity-50';
                      }
                    } else {
                      buttonClass += selectedAnswer === option.option_text
                        ? 'bg-blue-500/30 text-gray-900 border-2 border-blue-400/50 shadow-lg shadow-blue-500/30'
                        : 'bg-gray-900/10 text-gray-900 border border-white/20 hover:bg-gray-800/20 hover:border-white/30 hover:shadow-lg hover:scale-[1.02]';
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(option.option_text)}
                        disabled={showResult}
                        className={buttonClass}
                      >
                        <div className="flex items-center">
                          <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-900/10 mr-3 font-semibold text-gray-900">
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option.option_text}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer || showResult}
                  className="mt-6 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Testi Bitir' : 'Sonraki Soru'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
import React, { useState, useEffect } from 'react';
import { BeforeAfterSlider, FilmMode } from './BeforeAfterSlider';
import { BRAND_INFO } from '../data/mockData';
import { ShieldCheck, Sparkles, Sun, Flame, Award, ChevronRight, Phone, MessageCircle, CheckCircle2, Snowflake, EyeOff } from 'lucide-react';

interface HeroSliderProps {
  onOpenConsultation: () => void;
  onOpenKakaoChat: () => void;
  onOpenEstimator: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onOpenConsultation,
  onOpenKakaoChat,
  onOpenEstimator,
}) => {
  const [activeTab, setActiveTab] = useState<FilmMode>('cooling');
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Single base building image for the interactive comparison
  const singleBuildingBaseImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop';

  // 5 specific landmark building types for background ambiance
  const heroBackgrounds = [
    {
      label: '판교 테크노밸리 첨단 유리빌딩',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2400&auto=format&fit=crop',
    },
    {
      label: '도곡동 타워팰리스 초고층 랜드마크',
      url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2400&auto=format&fit=crop',
    },
    {
      label: '한남동 하이엔드 고급 단독주택',
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2400&auto=format&fit=crop',
    },
    {
      label: '대기업 본사 스마트 사옥 & R&D 센터',
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400&auto=format&fit=crop',
    },
    {
      label: '대학종합병원 & 의료 메디컬 센터',
      url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2400&auto=format&fit=crop',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [heroBackgrounds.length]);

  const tabDetails = {
    cooling: {
      title: '🌡️ 열차단 효과 (여름철 쿨링)',
      tag: '적외선 97% 차단 · 시원하고 쾌적한 실내 온도 유지',
    },
    privacy: {
      title: '🔒 사생활 보호 (프라이버시)',
      tag: '외부 시선 100% 차단 · 밖에서는 안 보이고 안에서는 선명한 뷰',
    },
    warming: {
      title: '♨️ 단열 효과 (겨울철 보온)',
      tag: '창가 냉기 완벽 차단 · 따뜻한 난방열 40% 보존',
    },
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#101216] text-zinc-100">
      {/* 3-Second Smooth Sliding Backgrounds: Glass Skyscrapers, Luxury Residences, Apartments, Factories */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {heroBackgrounds.map((bg, idx) => (
          <img
            key={idx}
            src={bg.url}
            alt={bg.label}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-110 saturate-[1.2] contrast-[1.02] transition-opacity duration-700 ease-in-out ${
              idx === currentBgIndex ? 'opacity-55 scale-105 transition-transform duration-[4000ms]' : 'opacity-0 scale-100'
            }`}
          />
        ))}

        {/* Softened depth gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f14]/85 via-[#0d0f14]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101216] via-transparent to-[#101216]/60" />
        
        {/* Luminous Architectural Ambient Glow */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-10 -left-10 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[130px]" />
        <div className="absolute top-10 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />

        {/* Current Background Type Live Tag & Indicator */}
        <div className="absolute bottom-4 left-6 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-zinc-300 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-medium text-white">{heroBackgrounds[currentBgIndex].label}</span>
          <div className="flex gap-1 ml-1.5">
            {heroBackgrounds.map((_, i) => (
              <span
                key={i}
                className={`w-3.5 h-1 rounded-full transition-all duration-300 ${
                  i === currentBgIndex ? 'bg-amber-400 w-5' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Core Value Proposition & Headings */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            {/* Top Verified Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-amber-500/30 text-xs font-semibold text-amber-300 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>3M · 넥스필 · 솔라메이트 100% 본사 정품 인증 마스터 직영 시공</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
                빛을 담고, 열은 막아 <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                  완벽한 사계절 실내 환경
                </span>
                을 완성합니다
              </h1>
              <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-xl">
                뜨거운 태양열과 창가 냉기, 외부 시선 노출로 인한 스트레스는 이제 그만. 
                <strong className="text-white font-semibold"> 빛담건물썬팅</strong>은 정품 필름과 10년 품질 보증, 
                숙련된 마스터의 무결점 시공으로 시원하고 따뜻한 안심 공간을 선사합니다.
              </p>
            </div>

            {/* Quick Benefits Bullet List */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>적외선 열차단 최대 <strong>97%</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>유해 자외선 <strong>99.9%</strong> 완벽차단</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>냉난방비 연간 <strong>최대 30%</strong> 절감</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>본사 전자보증서 <strong>10년 무상 AS</strong></span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xl shadow-amber-500/25 hover:shadow-2xl transition-all duration-200 cursor-pointer active:scale-98"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>무료 방문 실측 & 견적 신청</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenEstimator}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-base font-semibold bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 border border-zinc-700/80 hover:border-zinc-600 backdrop-blur-md transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI 맞춤 필름 추천 & 진단</span>
              </button>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-4">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">1,480건+</div>
                <div className="text-xs text-zinc-400 mt-0.5">전국 시공 완료</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-amber-400">4.98 / 5.0</div>
                <div className="text-xs text-zinc-400 mt-0.5">고객 평점 만족도</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-sky-400">10년</div>
                <div className="text-xs text-zinc-400 mt-0.5">정품 전자보증서</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Before / After Split Showcase with 1 Single Building Image */}
          <div className="lg:col-span-6 space-y-4">
            {/* Interactive Mode Tabs (3 Items: 열차단효과, 사생활보호, 단열효과) */}
            <div className="flex items-center justify-between bg-zinc-900/90 p-1.5 rounded-2xl border border-zinc-800 backdrop-blur-md shadow-xl">
              <div className="grid grid-cols-3 gap-1.5 w-full">
                <button
                  type="button"
                  onClick={() => setActiveTab('cooling')}
                  className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'cooling'
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 border border-sky-400/40'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/70'
                  }`}
                >
                  <Snowflake className="w-3.5 h-3.5" />
                  <span>열차단 효과</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('privacy')}
                  className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'privacy'
                      ? 'bg-gradient-to-r from-zinc-800 to-zinc-700 text-amber-400 shadow-lg shadow-black/40 border border-amber-500/40'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/70'
                  }`}
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>사생활 보호</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('warming')}
                  className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'warming'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black shadow-lg shadow-amber-500/25 border border-amber-400/40'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/70'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>단열 효과</span>
                </button>
              </div>
            </div>

            {/* The Before/After Interactive Slider with Single Base Building */}
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl">
              <BeforeAfterSlider
                mode={activeTab}
                baseImage={singleBuildingBaseImage}
                buildingName="파노라마 통창 랜드마크 뷰"
                aspectRatio="aspect-[16/11]"
              />
            </div>

            {/* Slider Drag Hint & Live Mode Tag */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-zinc-400 px-2">
              <span className="flex items-center gap-1 text-zinc-300 font-medium">
                <span className="text-amber-400 font-bold">TIP</span>
                왼쪽 슬라이스를 오른쪽으로 밀어 썬팅 시공 효과를 확인하세요
              </span>
              <span className="text-amber-400 font-semibold">{tabDetails[activeTab].tag}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


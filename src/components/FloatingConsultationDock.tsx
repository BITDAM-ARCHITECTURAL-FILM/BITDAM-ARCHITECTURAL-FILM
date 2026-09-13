import React, { useState, useEffect } from 'react';
import { BRAND_INFO } from '../data/mockData';
import { Phone, MessageCircle, Calculator, ShieldCheck, ChevronUp, ChevronDown, X, Sparkles, Flame } from 'lucide-react';

interface FloatingConsultationDockProps {
  onOpenConsultation: () => void;
  onOpenKakaoChat: () => void;
  onOpenEstimator: () => void;
}

export const FloatingConsultationDock: React.FC<FloatingConsultationDockProps> = ({
  onOpenConsultation,
  onOpenKakaoChat,
  onOpenEstimator,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Today Consultation Live Counter (increases by 1 every 30 mins, resets every 24h at midnight)
  const [todayConsultationCount, setTodayConsultationCount] = useState<number>(() => {
    const now = new Date();
    const currentMinutesFromMidnight = now.getHours() * 60 + now.getMinutes();
    const baseInitialCount = 5;
    const computedCount = baseInitialCount + Math.floor(currentMinutesFromMidnight / 30);
    return computedCount;
  });

  useEffect(() => {
    const updateCounter = () => {
      const now = new Date();
      const currentMinutesFromMidnight = now.getHours() * 60 + now.getMinutes();
      const baseInitialCount = 5;
      const count = baseInitialCount + Math.floor(currentMinutesFromMidnight / 30);
      setTodayConsultationCount(count);
    };

    updateCounter();
    const interval = setInterval(updateCounter, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll to Top Button (Fixed Bottom Right) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-4 sm:right-6 z-40 p-3 rounded-full bg-[#121214] text-white shadow-xl hover:bg-zinc-800 transition-all border border-zinc-800 backdrop-blur-md active:scale-95 cursor-pointer"
          aria-label="맨 위로 이동"
          title="상단으로 이동"
        >
          <ChevronUp className="w-5 h-5 text-amber-400" />
        </button>
      )}

      {/* Desktop Persistent Floating Consultation Dock (Fixed at Middle Right: 화면 우측 중간) */}
      <div className="fixed top-1/2 -translate-y-1/2 right-4 sm:right-6 z-40 hidden md:block select-none transition-all duration-300">
        {/* Today Consultation Real-time Live Badge Indicator */}
        <div className="mb-2.5 flex items-center justify-end">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121214]/95 border border-amber-500/50 shadow-2xl backdrop-blur-md text-zinc-200">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <div className="flex items-center gap-1.5 text-[11px] font-bold">
              <span className="text-zinc-400">오늘 상담</span>
              <span className="text-amber-400 font-extrabold text-xs px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/30">
                {todayConsultationCount}건
              </span>
              <span className="text-emerald-400 font-semibold text-[10px]">진행중</span>
            </div>
          </div>
        </div>

        {isExpanded ? (
          <div className="bg-[#121214]/95 text-zinc-100 rounded-3xl p-4 shadow-2xl border border-amber-500/40 backdrop-blur-xl w-80 space-y-3 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-black tracking-tight text-white">실시간 전문 상담 센터</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                title="접기"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Today's Live Counter summary bar inside expanded dock */}
            <div className="p-2.5 bg-gradient-to-r from-amber-500/10 via-zinc-900 to-amber-500/10 rounded-2xl border border-amber-500/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                <span className="text-zinc-300 font-bold text-[11px]">오늘 실시간 접수</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-amber-400 text-xs">{todayConsultationCount}건 완료</span>
                <span className="text-[9px] text-zinc-500 font-normal">(자정 리셋)</span>
              </div>
            </div>

            {/* Quick Actions List */}
            <div className="space-y-2">
              {/* 1. Naver TalkTalk Bizform Direct Link */}
              <a
                href={BRAND_INFO.naverBizFormUrl || 'https://talk.naver.com/profile/wo2piug/form/1'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-3.5 rounded-2xl bg-[#03C75A] hover:bg-[#02b351] text-white font-bold text-xs shadow-md flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-white text-[#03C75A] flex items-center justify-center font-black">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                      <path d="M16.273 12.845 7.376 0H0v24h7.726V11.155L16.624 24H24V0h-7.727v12.845z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="block font-black text-xs leading-none">네이버 톡톡 비즈폼 바로가기</span>
                    <span className="text-[10px] text-white/90">1초 간편 신청 & 실시간 톡톡 저장</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-100 group-hover:translate-x-1 transition-transform">작성 →</span>
              </a>

              {/* 2. KakaoTalk 1:1 Live Chat */}
              <a
                href={BRAND_INFO.kakaoChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3.5 rounded-2xl bg-[#FEE500] hover:bg-[#FDD835] text-[#371D1E] font-bold text-xs shadow-sm flex items-center justify-between transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-[#371D1E] text-[#FEE500] flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </div>
                  <div className="text-left">
                    <span className="block font-black text-xs leading-none">카카오톡 1:1 빠른 상담</span>
                    <span className="text-[10px] text-[#371D1E]/70">사진 전송 & 실시간 견적</span>
                  </div>
                </div>
                <span className="text-xs font-bold">열기 →</span>
              </a>

              {/* 3. Direct Phone Call */}
              <a
                href={`tel:${BRAND_INFO.phone}`}
                className="w-full py-2.5 px-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs flex items-center justify-between transition-all border border-zinc-800"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-zinc-800 text-amber-400 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block font-black text-xs leading-none">대표 전화 {BRAND_INFO.phone}</span>
                    <span className="text-[10px] text-zinc-400">통화 연결 즉시 가능</span>
                  </div>
                </div>
                <span className="text-xs text-amber-400 font-bold">통화 →</span>
              </a>
            </div>

            {/* Quick Estimator Link */}
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 px-1">
              <button
                onClick={onOpenEstimator}
                className="hover:text-amber-400 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>1분 간편 견적 시뮬레이터</span>
              </button>
              <span className="text-zinc-500 text-[10px]">10년 무상보증</span>
            </div>
          </div>
        ) : (
          /* Minimized Floating Quick Menu (Side Dock Style at Middle Right) */
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-3 px-4 py-3 bg-[#121214] text-white rounded-2xl shadow-2xl border-2 border-amber-500 hover:bg-zinc-800 transition-all cursor-pointer group hover:scale-105"
            >
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-extrabold text-white">빛담 실시간 빠른 상담</span>
              <div className="w-7 h-7 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center font-bold text-xs shadow-md">
                💬
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Persistent Floating Bottom Bar (Sticky at Bottom on small screens) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#121214]/95 border-t border-zinc-800 backdrop-blur-xl p-2.5 shadow-2xl">
        {/* Mobile Top Live Indicator */}
        <div className="flex items-center justify-between px-1.5 pb-2 text-[10px]">
          <div className="flex items-center gap-1.5 text-zinc-300 font-bold">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span>오늘 실시간 상담 현황:</span>
            <span className="text-amber-400 font-black">{todayConsultationCount}건 진행</span>
          </div>
          <span className="text-zinc-500 text-[9px]">자정(24h) 자동 리셋</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Kakao Talk */}
          <a
            href={BRAND_INFO.kakaoChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 rounded-xl bg-[#FEE500] text-[#371D1E] font-bold text-xs flex flex-col items-center justify-center gap-0.5 shadow-sm active:scale-95 transition-transform cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>카톡상담</span>
          </a>

          {/* Call Phone */}
          <a
            href={`tel:${BRAND_INFO.phone}`}
            className="py-3 rounded-xl bg-zinc-900 text-white font-bold text-xs flex flex-col items-center justify-center gap-0.5 border border-zinc-800 active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>전화상담</span>
          </a>

          {/* Naver TalkTalk Bizform */}
          <a
            href={BRAND_INFO.naverBizFormUrl || 'https://talk.naver.com/profile/wo2piug/form/1'}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 rounded-xl bg-[#03C75A] text-white font-bold text-xs flex flex-col items-center justify-center gap-0.5 shadow-md active:scale-95 transition-transform cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M16.273 12.845 7.376 0H0v24h7.726V11.155L16.624 24H24V0h-7.727v12.845z" />
            </svg>
            <span>톡톡 비즈폼</span>
          </a>
        </div>
      </div>
    </>
  );
};

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { AdvantagesSection } from './components/AdvantagesSection';
import { FilmProductSection } from './components/FilmProductSection';
import { PortfolioSection } from './components/PortfolioSection';
import { NaverBlogSection } from './components/NaverBlogSection';
import { QuickEstimator } from './components/QuickEstimator';
import { ReviewsSection } from './components/ReviewsSection';
import { ConsultationSection } from './components/ConsultationSection';
import { FAQSection } from './components/FAQSection';
import { FloatingConsultationDock } from './components/FloatingConsultationDock';
import { Footer } from './components/Footer';
import { KakaoChatModal } from './components/KakaoChatModal';
import { AllReviewsModal } from './components/AllReviewsModal';
import { NationwideReviewItem } from './data/nationwideReviews';
import { FilmSpec, PortfolioCase } from './types';
import { ShieldCheck, X, ExternalLink, MessageCircle, Phone, Copy, Check, Sparkles } from 'lucide-react';
import { BRAND_INFO } from './data/mockData';

export default function App() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isKakaoModalOpen, setIsKakaoModalOpen] = useState(false);
  const [isAllReviewsModalOpen, setIsAllReviewsModalOpen] = useState(false);
  const [consultationPreFillMessage, setConsultationPreFillMessage] = useState('');

  const handleOpenConsultation = (customMessage = '') => {
    setConsultationPreFillMessage(customMessage);
    setIsConsultationModalOpen(true);
  };

  const handleSelectFilmForConsultation = (film: FilmSpec) => {
    const msg = `[선택 필름 견적 문의] 브랜드: ${film.brand} / 제품명: ${film.seriesName} (적외선차단율: ${film.irr}%, 보증기간: ${film.warrantyYears}년)`;
    handleOpenConsultation(msg);
  };

  const handleSelectCaseForConsultation = (caseItem: PortfolioCase) => {
    const msg = `[시공사례 참조 견적 문의] 참조 사례: ${caseItem.title} (${caseItem.location}, ${caseItem.areaPyeong}평) / 적용 필름: ${caseItem.filmUsed}`;
    handleOpenConsultation(msg);
  };

  const handleSelectReviewForConsultation = (review: NationwideReviewItem) => {
    const msg = `[전국 시공후기 참조 견적 문의] 고객후기: ${review.author} (${review.location}) / 적용 필름: ${review.filmApplied} / 시공 효과: ${review.metrics.tempDrop}, ${review.metrics.billSaving}`;
    handleOpenConsultation(msg);
  };

  const handleApplyEstimate = (estimateSummary: string) => {
    handleOpenConsultation(estimateSummary);
  };

  const scrollToEstimator = () => {
    const el = document.getElementById('estimator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-100 flex flex-col selection:bg-amber-500 selection:text-white">
      {/* 1. Global Navigation Bar */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenKakaoChat={() => setIsKakaoModalOpen(true)}
        onOpenEstimator={scrollToEstimator}
      />

      {/* 2. Hero Section with Live Before/After Thermal Comparison */}
      <HeroSlider
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenKakaoChat={() => setIsKakaoModalOpen(true)}
        onOpenEstimator={scrollToEstimator}
      />

      {/* 3. Core Advantages & 5-in-1 Window Film Benefits */}
      <AdvantagesSection
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* 4. Authentic Premium Film Lineup & Specs */}
      <FilmProductSection
        onSelectFilmForConsultation={handleSelectFilmForConsultation}
      />

      {/* 5. Architectural Portfolio & Case Studies Gallery */}
      <PortfolioSection
        onSelectCaseForConsultation={handleSelectCaseForConsultation}
      />

      {/* 6. Naver Blog Realtime Auto-Sync Section */}
      <NaverBlogSection />

      {/* 7. Instant Cost & Energy Savings Simulator */}
      <QuickEstimator
        onApplyEstimateToConsultation={handleApplyEstimate}
      />

      {/* 8. Verified Real Customer Reviews */}
      <ReviewsSection
        onOpenAllReviews={() => setIsAllReviewsModalOpen(true)}
      />

      {/* 9. Architectural Film Q&A (SEO & AI Search Optimized) */}
      <FAQSection
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* 10. Free Onsite Consultation Booking Form */}
      <ConsultationSection
        initialSummary={consultationPreFillMessage}
        onOpenKakaoChat={() => setIsKakaoModalOpen(true)}
      />

      {/* 11. Footer */}
      <Footer
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenKakaoChat={() => setIsKakaoModalOpen(true)}
      />

      {/* 12. Persistent Floating Consultation Dock (Fixed as user scrolls) */}
      <FloatingConsultationDock
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenKakaoChat={() => setIsKakaoModalOpen(true)}
        onOpenEstimator={scrollToEstimator}
      />

      {/* 13. KakaoTalk 1:1 Live Chat Simulated Modal */}
      <KakaoChatModal
        isOpen={isKakaoModalOpen}
        onClose={() => setIsKakaoModalOpen(false)}
        onOpenConsultation={() => {
          setIsKakaoModalOpen(false);
          handleOpenConsultation();
        }}
      />

      {/* 14. Nationwide Real Customer Reviews Full Modal (Weekly 7-Day Auto Sync) */}
      <AllReviewsModal
        isOpen={isAllReviewsModalOpen}
        onClose={() => setIsAllReviewsModalOpen(false)}
        onSelectReviewForConsultation={handleSelectReviewForConsultation}
      />

      {/* 16. Quick Consultation Channel Popup Modal (When triggered from buttons) */}
      {isConsultationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-[#121214] text-zinc-100 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-zinc-800 my-auto relative">
            <div className="px-6 py-4.5 bg-zinc-900/90 text-white flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#03C75A]" />
                <h3 className="font-extrabold text-base">실시간 상담 & 맞춤 견적 채널</h3>
              </div>
              <button
                onClick={() => setIsConsultationModalOpen(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Pre-filled Message if triggered from calculator/film */}
              {consultationPreFillMessage && (
                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-amber-500/30 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      선택된 문의 정보
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(consultationPreFillMessage);
                        alert('문의 내용이 클립보드에 복사되었습니다. 상담창에 붙여넣어 문의하세요!');
                      }}
                      className="px-2 py-0.5 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>내용 복사</span>
                    </button>
                  </div>
                  <p className="text-zinc-300 line-clamp-2">{consultationPreFillMessage}</p>
                </div>
              )}

              <p className="text-xs text-zinc-400">
                원하시는 상담 채널을 선택해 주세요. 작성하신 내용은 네이버 톡톡 또는 카카오톡에 안전하게 연동 및 보관됩니다.
              </p>

              {/* Direct Channel Buttons */}
              <div className="space-y-3 pt-1">
                {/* 1. Naver TalkTalk BizForm */}
                <a
                  href={BRAND_INFO.naverBizFormUrl || 'https://talk.naver.com/profile/wo2piug/form/1'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#03C75A] hover:bg-[#02b351] text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white text-[#03C75A] flex items-center justify-center font-black shrink-0">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                        <path d="M16.273 12.845 7.376 0H0v24h7.726V11.155L16.624 24H24V0h-7.727v12.845z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <span className="block text-xs text-white/80 font-normal">네이버 공식 저장 폼</span>
                      <strong className="block text-sm font-black">네이버 톡톡 비즈폼 바로 작성</strong>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* 2. KakaoTalk 1:1 Live Chat */}
                <a
                  href={BRAND_INFO.kakaoChatUrl || 'http://pf.kakao.com/_xixcqlX/chat'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#FEE500] hover:bg-[#FDD835] text-[#371D1E] font-bold text-sm shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#371D1E] text-[#FEE500] flex items-center justify-center font-black shrink-0">
                      <MessageCircle className="w-4 h-4 fill-current" />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs text-[#371D1E]/70 font-normal">사진 전송 & 실시간 대화</span>
                      <strong className="block text-sm font-black text-[#371D1E]">카카오톡 1:1 채팅 문의</strong>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#371D1E] group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* 3. Direct Phone Call */}
                <a
                  href={`tel:${BRAND_INFO.phone}`}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm border border-zinc-700 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center font-black shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs text-zinc-400 font-normal">즉시 연결 빠른 상담</span>
                      <strong className="block text-sm font-black">{BRAND_INFO.phone}</strong>
                    </div>
                  </div>
                  <span className="text-xs text-amber-400 group-hover:translate-x-0.5 transition-transform">전화 통화 →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

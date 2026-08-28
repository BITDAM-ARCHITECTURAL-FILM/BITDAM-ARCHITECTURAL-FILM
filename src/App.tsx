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
import { FloatingConsultationDock } from './components/FloatingConsultationDock';
import { Footer } from './components/Footer';
import { KakaoChatModal } from './components/KakaoChatModal';
import { AllReviewsModal } from './components/AllReviewsModal';
import { WarrantyLookupModal } from './components/WarrantyLookupModal';
import { NationwideReviewItem } from './data/nationwideReviews';
import { FilmSpec, PortfolioCase } from './types';
import { ShieldCheck, X } from 'lucide-react';

export default function App() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isKakaoModalOpen, setIsKakaoModalOpen] = useState(false);
  const [isAllReviewsModalOpen, setIsAllReviewsModalOpen] = useState(false);
  const [isWarrantyLookupOpen, setIsWarrantyLookupOpen] = useState(false);
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
        onOpenWarrantyLookup={() => setIsWarrantyLookupOpen(true)}
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

      {/* 9. Free Onsite Consultation Booking Form */}
      <ConsultationSection
        initialSummary={consultationPreFillMessage}
        onOpenKakaoChat={() => setIsKakaoModalOpen(true)}
      />

      {/* 10. Footer */}
      <Footer
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenKakaoChat={() => setIsKakaoModalOpen(true)}
      />

      {/* 11. Persistent Floating Consultation Dock (Fixed as user scrolls) */}
      <FloatingConsultationDock
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenKakaoChat={() => setIsKakaoModalOpen(true)}
        onOpenEstimator={scrollToEstimator}
      />

      {/* 12. KakaoTalk 1:1 Live Chat Simulated Modal */}
      <KakaoChatModal
        isOpen={isKakaoModalOpen}
        onClose={() => setIsKakaoModalOpen(false)}
        onOpenConsultation={() => {
          setIsKakaoModalOpen(false);
          handleOpenConsultation();
        }}
      />

      {/* 13. Nationwide Real Customer Reviews Full Modal (Weekly 7-Day Auto Sync) */}
      <AllReviewsModal
        isOpen={isAllReviewsModalOpen}
        onClose={() => setIsAllReviewsModalOpen(false)}
        onSelectReviewForConsultation={handleSelectReviewForConsultation}
      />

      {/* 15. Electronic Quality Warranty Lookup Modal */}
      <WarrantyLookupModal
        isOpen={isWarrantyLookupOpen}
        onClose={() => setIsWarrantyLookupOpen(false)}
        onOpenConsultation={() => handleOpenConsultation('[정품 10년 품질보증 시공 문의]')}
      />

      {/* 16. Quick Free Consultation Popup Modal (When triggered from buttons) */}
      {isConsultationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-[#121214] text-zinc-100 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-zinc-800 my-auto relative">
            <div className="px-6 py-4 bg-zinc-900/90 text-white flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-base">무료 방문 실측 & 정품 샘플 견적 신청</h3>
              </div>
              <button
                onClick={() => setIsConsultationModalOpen(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
              <ConsultationSection
                initialSummary={consultationPreFillMessage}
                onOpenKakaoChat={() => {
                  setIsConsultationModalOpen(false);
                  setIsKakaoModalOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

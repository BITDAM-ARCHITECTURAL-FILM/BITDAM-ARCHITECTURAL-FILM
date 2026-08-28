import React, { useState } from 'react';
import { PORTFOLIO_CASES, BRAND_INFO } from '../data/mockData';
import { PortfolioCase } from '../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Thermometer, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  X, 
  ChevronRight, 
  AlertCircle, 
  ArrowRight,
  Eye,
  Flame,
  Layers,
  Building2,
  Check
} from 'lucide-react';

interface PortfolioSectionProps {
  onSelectCaseForConsultation: (caseItem: PortfolioCase) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectCaseForConsultation }) => {
  const [activeModalCase, setActiveModalCase] = useState<PortfolioCase | null>(null);
  const [modalTab, setModalTab] = useState<'solution' | 'slider' | 'specs'>('solution');

  // Loop cases for continuous smooth infinite scrolling
  const marqueeCases = [...PORTFOLIO_CASES, ...PORTFOLIO_CASES];

  return (
    <section id="portfolio" className="py-20 sm:py-24 bg-[#0A0A0B] relative text-zinc-200 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>현장 리얼 스토리 • REAL PROBLEM & SOLUTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              실제 겪으시던 현장의 고민, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
                빛담이 이렇게 명쾌하게 해결해 드렸습니다
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              남서향 찜통더위, 모니터 반사 눈부심, 사생활 노출, 곰팡이 결로까지 — 
              화려한 사진보다 값진 <strong>현장의 실제 문제와 빛담의 맞춤 필름 처방 솔루션</strong>을 확인해 보세요.
            </p>
          </div>

          {/* Quick Indicator Banner */}
          <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 p-3 rounded-2xl shrink-0 self-start md:self-auto">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-zinc-300 font-medium">
              마우스를 올리면 슬라이드가 <strong>일시 정지</strong>됩니다
            </span>
          </div>
        </div>
      </div>

      {/* 🚀 Horizontal Smooth Moving Real Story Banner Stream (Right to Left) */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right Smooth Fade Edges for Premium Look */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#0A0A0B] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#0A0A0B] to-transparent z-20 pointer-events-none" />

        <div className="animate-marquee gap-6 px-4">
          {marqueeCases.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => {
                setActiveModalCase(item);
                setModalTab('solution');
              }}
              className="w-[340px] sm:w-[420px] shrink-0 bg-[#121214] hover:bg-[#161619] rounded-3xl p-5 sm:p-6 border border-white/10 hover:border-amber-500/60 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between cursor-pointer group select-none"
            >
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-800/80">
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate max-w-[150px]">{item.location}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Title & Core Problem vs Solution Body */}
              <div className="py-4 space-y-3.5 flex-1">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium mt-0.5 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>

                {/* 🔴 Pain Point (실제 고민) */}
                <div className="p-3.5 rounded-2xl bg-red-950/25 border border-red-500/25 space-y-1">
                  <div className="flex items-center gap-1.5 text-red-400 font-black text-xs">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>실제 현장의 고질적 고민</span>
                  </div>
                  <p className="text-xs text-zinc-200 leading-relaxed font-normal">
                    "{item.customerPainPoint || item.summary}"
                  </p>
                </div>

                {/* 🟢 Solution & Result (빛담 해결책) */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/15 via-emerald-500/10 to-transparent border border-amber-500/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-300 font-black text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>빛담 맞춤 솔루션 & 해결 결과</span>
                  </div>
                  <p className="text-xs text-zinc-200 leading-relaxed font-medium">
                    {item.whyChoseBitdam || item.detailStory[1]}
                  </p>
                </div>

                {/* Key Spec Badges */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {item.thermalBeforeTemp && item.thermalAfterTemp && (
                    <div className="p-2 rounded-xl bg-black/40 border border-white/5 text-center">
                      <span className="text-[10px] text-zinc-400 block font-medium">창문온도</span>
                      <strong className="text-xs font-black text-amber-400">
                        -{(item.thermalBeforeTemp - item.thermalAfterTemp).toFixed(1)}℃
                      </strong>
                    </div>
                  )}
                  <div className="p-2 rounded-xl bg-black/40 border border-white/5 text-center">
                    <span className="text-[10px] text-zinc-400 block font-medium">눈부심완화</span>
                    <strong className="text-xs font-black text-sky-400">
                      {item.glareReductionPercent}%
                    </strong>
                  </div>
                  <div className="p-2 rounded-xl bg-black/40 border border-white/5 text-center">
                    <span className="text-[10px] text-zinc-400 block font-medium">자외선차단</span>
                    <strong className="text-xs font-black text-emerald-400">
                      {item.uvProtectionPercent}%
                    </strong>
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <span className="text-zinc-400 text-[11px] truncate max-w-[190px]">
                  적용: <strong className="text-zinc-200 font-semibold">{item.filmUsed}</strong>
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>상세해결 스토리</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Summary & Naver Blog Link Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#121214] via-[#17181c] to-[#121214] rounded-3xl border border-amber-500/25 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#03C75A] text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
              N
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-extrabold text-white">
                우리 집/사옥과 비슷한 현장 고민이 있으신가요?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                빛담건물썬팅 공식 네이버 블로그에서 200건 이상의 현장별 열화상 실측 데이터와 고객 인터뷰를 직접 확인해 보세요.
              </p>
            </div>
          </div>
          <a
            href={BRAND_INFO.naverBlogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#03C75A] hover:bg-[#02b350] text-black font-extrabold text-xs whitespace-nowrap shadow-lg shadow-[#03C75A]/20 transition-all shrink-0 cursor-pointer"
          >
            <span>네이버 블로그 현장스토리 전체보기</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Detail Case Study Modal */}
      {activeModalCase && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-[#121214] text-zinc-100 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-zinc-800 my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/90">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white">
                  {activeModalCase.categoryLabel}
                </span>
                <span className="text-xs text-zinc-400 font-medium">{activeModalCase.location}</span>
              </div>
              <button
                onClick={() => setActiveModalCase(null)}
                className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  {activeModalCase.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
                  {activeModalCase.subtitle}
                </p>
              </div>

              {/* Modal Tabs */}
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                <button
                  onClick={() => setModalTab('solution')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    modalTab === 'solution'
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                  }`}
                >
                  현장 고민 & 해결 스토리
                </button>
                <button
                  onClick={() => setModalTab('slider')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    modalTab === 'slider'
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                  }`}
                >
                  비포 / 애프터 뷰 비교
                </button>
                <button
                  onClick={() => setModalTab('specs')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    modalTab === 'specs'
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                  }`}
                >
                  시공 스펙 & 고객 후기
                </button>
              </div>

              {/* Tab 1: Solution */}
              {modalTab === 'solution' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-red-950/20 border border-red-500/25 rounded-2xl space-y-1.5">
                      <h5 className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" />
                        <span>시공 전 현장의 실제 고민</span>
                      </h5>
                      <p className="text-xs text-zinc-200 leading-relaxed">
                        {activeModalCase.customerPainPoint}
                      </p>
                    </div>

                    <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-2xl space-y-1.5">
                      <h5 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>빛담을 선택하신 이유</span>
                      </h5>
                      <p className="text-xs text-zinc-200 leading-relaxed">
                        {activeModalCase.whyChoseBitdam}
                      </p>
                    </div>
                  </div>

                  <div className="bg-zinc-900/90 p-5 rounded-2xl border border-zinc-800 space-y-3">
                    <h4 className="font-bold text-white text-sm">빛담 마스터팀 현장 진단 & 맞춤 솔루션</h4>
                    <p className="text-zinc-400 text-xs">{activeModalCase.summary}</p>
                    <div className="space-y-2 pt-1">
                      {activeModalCase.detailStory.map((paragraph, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{paragraph}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Slider */}
              {modalTab === 'slider' && (
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden border border-zinc-800">
                    <BeforeAfterSlider
                      beforeImage={activeModalCase.beforeImage}
                      afterImage={activeModalCase.afterImage}
                      beforeLabel="시공 전 (열기 & 눈부심)"
                      afterLabel="시공 후 (빛담 정품 단열필름)"
                      beforeTemp={activeModalCase.thermalBeforeTemp}
                      afterTemp={activeModalCase.thermalAfterTemp}
                      aspectRatio="aspect-[16/10]"
                    />
                  </div>
                </div>
              )}

              {/* Tab 3: Specs */}
              {modalTab === 'specs' && (
                <div className="space-y-4">
                  <div className="p-4 bg-zinc-900/90 rounded-2xl border border-zinc-800 text-xs space-y-2 text-zinc-300">
                    <div><strong>시공 위치:</strong> {activeModalCase.location}</div>
                    <div><strong>건물 형태:</strong> {activeModalCase.buildingType}</div>
                    <div><strong>적용 필름:</strong> {activeModalCase.filmUsed}</div>
                    <div><strong>시공 면적:</strong> {activeModalCase.areaPyeong}평 ({activeModalCase.glassAreaSqm}㎡)</div>
                    <div><strong>완공 일자:</strong> {activeModalCase.completionDate}</div>
                  </div>

                  {activeModalCase.clientReview && (
                    <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-amber-300">고객 자필 리뷰</h4>
                        <span className="text-amber-400 text-xs">★★★★★</span>
                      </div>
                      <p className="text-xs text-amber-200/90 italic leading-relaxed">
                        "{activeModalCase.clientReview.comment}"
                      </p>
                      <div className="text-[11px] font-bold text-amber-300 text-right">
                        - {activeModalCase.clientReview.author}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Modal Footer CTA */}
              <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-zinc-400 text-center sm:text-left">
                  유사한 조건의 건물이신가요? <strong className="text-zinc-200">동일 필름 맞춤 견적</strong>을 받아보세요.
                </div>
                <button
                  onClick={() => {
                    const current = activeModalCase;
                    setActiveModalCase(null);
                    onSelectCaseForConsultation(current);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>이 사례와 동일 필름 무료 견적 상담</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

import React, { useState } from 'react';
import { FILM_PRODUCTS } from '../data/mockData';
import { FilmSpec } from '../types';
import { ShieldCheck, Award, Zap, Sun, Thermometer, CheckCircle2, ChevronRight, HelpCircle, FileCheck, Sparkles, Flame, Shield, ArrowRight, Eye, Layers, Palette } from 'lucide-react';

interface FilmProductSectionProps {
  onSelectFilmForConsultation: (film: FilmSpec) => void;
}

export const FilmProductSection: React.FC<FilmProductSectionProps> = ({ onSelectFilmForConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const flagshipSputterFilm = FILM_PRODUCTS.find((f) => f.id === 'film-bd-st-2598') || FILM_PRODUCTS[0];

  const filterTabs = [
    { id: 'all', label: '전체 정품 필름' },
    { id: 'multi_sputter', label: '멀티레이어스퍼터' },
    { id: 'deposit_sputter', label: '증착스퍼터' },
    { id: 'nano_ceramic', label: '나노세라믹' },
    { id: 'design', label: '디자인(글라데이션, 암막, 엠보)' },
  ];

  const filteredFilms = FILM_PRODUCTS.filter((film) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'multi_sputter') return film.filmTypeGroup === 'multi_sputter';
    if (selectedCategory === 'deposit_sputter') return film.filmTypeGroup === 'deposit_sputter';
    if (selectedCategory === 'nano_ceramic') return film.filmTypeGroup === 'nano_ceramic';
    if (selectedCategory === 'design') return film.filmTypeGroup === 'design';
    return true;
  });

  return (
    <section id="products" className="py-24 bg-[#0A0A0B] relative text-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>빛담 건축용 프리미엄 윈도우 필름 라인업</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            공간의 품격과 쾌적함을 완성하는 <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
              맞춤형 실내 창호 단열·디자인 필름
            </span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            멀티레이어 스퍼터, 증착스퍼터, 비금속 나노세라믹부터 인테리어 디자인 필름까지 
            실제 실내 창문 시공 시의 뛰어난 채광 밸런스와 확실한 단열·인테리어 효과를 직접 확인해 보세요.
          </p>
        </div>

        {/* 🌟 High-End Masterpiece Spotlight: BD ST 2598 */}
        <div className="mb-16 relative rounded-3xl p-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 shadow-2xl shadow-amber-500/10">
          <div className="bg-[#121316] rounded-[22px] p-6 sm:p-10 relative overflow-hidden">
            {/* Background luxury ambient lighting */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-md bg-amber-500 text-black text-xs font-black tracking-wider uppercase shadow-md flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 fill-black" />
                    멀티레이어 스퍼터 플래그십
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-amber-300 text-xs font-bold">
                    PREMIUM SPUTTER SERIES
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
                    BD ST <span className="text-amber-400">2598</span>
                  </h3>
                  <p className="text-sm font-semibold text-zinc-400 mt-1">
                    Multi-layer Magnetron Sputtered Heat-Reflective High-End Film
                  </p>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed">
                  일반 필름처럼 태양열을 유리에 흡수하는 방식이 아닌, <strong className="text-amber-300 font-bold">귀금속 원자 다층막(Multi-layer Sputter)</strong>으로 복사열을 실외로 즉시 튕겨내는 최고 등급 <strong className="text-white">순수 열반사(Heat Reflection)</strong> 테크놀로지입니다. 유리의 열 파손 위험과 실내 재방사 열기를 원천 차단합니다.
                </p>

                {/* Core Key Advantages 2-Column */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <div className="flex items-start gap-2 bg-black/40 border border-white/5 p-3 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-white block font-bold">적외선(열) 98% 원천 반사 차단</strong>
                      <span className="text-zinc-400 text-[11px]">체감 온도 즉각 하강 & 사계절 고효율</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-black/40 border border-white/5 p-3 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-white block font-bold">One-Way 완벽 시선차단 (VLT 25%)</strong>
                      <span className="text-zinc-400 text-[11px]">커튼 없이 밖에서는 미러, 안에서는 선명</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-black/40 border border-white/5 p-3 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-white block font-bold">총태양에너지 차단율(TSER) 78%</strong>
                      <span className="text-zinc-400 text-[11px]">업계 최상위권의 압도적인 단열 성능</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-black/40 border border-white/5 p-3 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-white block font-bold">10년 무상 AS & 정품 전자보증서</strong>
                      <span className="text-zinc-400 text-[11px]">변색·박리 0% 내구성 보증</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectFilmForConsultation(flagshipSputterFilm)}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/25 flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 fill-black" />
                    <span>BD ST 2598 하이엔드 견적 신청하기</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-zinc-400">
                    추천: 하이엔드 펜트하우스, 남서향 거실 대형 통창, 고급 단독주택
                  </span>
                </div>
              </div>

              {/* Right Gauge Spec Matrix & Window Render Preview */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-amber-500/40 shadow-xl group">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                    alt="BD ST 2598 실내 창문 시공 연출"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4">
                    <span className="text-[11px] font-black text-amber-300 uppercase tracking-wider flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> 실내 창문 시공 뷰 연출
                    </span>
                    <p className="text-xs text-zinc-200 mt-0.5 line-clamp-2">
                      탁 트인 파노라마 한강 뷰를 선명하게 유지하며 눈부심과 찜통더위를 완벽 차단
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-b from-[#1c1d22] to-[#141518] p-5 rounded-2xl border border-amber-500/30 shadow-inner">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <span className="text-xs font-bold text-zinc-300">BD ST 2598 핵심 성능 지표</span>
                    <span className="text-[11px] font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      공인 시험성적 완료
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-3">
                    <div className="bg-black/50 p-2.5 rounded-xl border border-white/5 text-center">
                      <span className="text-[10px] text-zinc-400 block font-medium">적외선(열) 차단 (IRR)</span>
                      <div className="text-xl font-black text-amber-400 mt-0.5">98%</div>
                      <span className="text-[10px] text-amber-300/80 font-bold">초고효율 순수 열반사</span>
                    </div>
                    <div className="bg-black/50 p-2.5 rounded-xl border border-white/5 text-center">
                      <span className="text-[10px] text-zinc-400 block font-medium">총태양에너지 차단 (TSER)</span>
                      <div className="text-xl font-black text-emerald-400 mt-0.5">78%</div>
                      <span className="text-[10px] text-emerald-300/80 font-bold">최상급 에너지 절감</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology & Design Filter Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <h3 className="text-lg font-bold text-white">빛담 공식 정품 필름 테크놀로지 라인업</h3>
            <p className="text-xs text-zinc-400">원하시는 제조 공법 및 용도별 필름 스펙을 확인해 보세요</p>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black shadow-lg shadow-amber-500/25 border border-amber-400/50'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Film Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFilms.map((film) => {
            const isFlagship = film.id === 'film-bd-st-2598';
            return (
              <div
                key={film.id}
                className={`rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group ${
                  isFlagship
                    ? 'bg-gradient-to-b from-[#19191d] to-[#121214] border-2 border-amber-500/80 shadow-amber-500/10'
                    : 'bg-[#121214] border border-white/5 hover:border-amber-500/40'
                }`}
              >
                <div>
                  {/* Window Simulation Image Header */}
                  {film.previewImage && (
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-900">
                      <img
                        src={film.previewImage}
                        alt={`${film.seriesName} 실내 창문 시공 연출`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/40 to-transparent" />
                      
                      {/* Top Overlay Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-zinc-200">
                          {film.colorTone}
                        </span>
                        <span
                          className={`text-[11px] font-extrabold px-2.5 py-1 rounded-lg shadow-md ${
                            film.gradeBadge === 'ULTRA FLAGSHIP'
                              ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black'
                              : film.gradeBadge === 'FLAGSHIP'
                              ? 'bg-amber-500 text-white'
                              : film.gradeBadge === 'PREMIUM'
                              ? 'bg-sky-600 text-white'
                              : 'bg-zinc-800 text-zinc-200'
                          }`}
                        >
                          {film.gradeBadge}
                        </span>
                      </div>

                      {/* Bottom Image Label */}
                      <div className="absolute bottom-2 left-4 right-4 text-[11px] text-amber-300/90 font-medium flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>실내 창문 시공 뷰 연출</span>
                      </div>
                    </div>
                  )}

                  <div className="p-6 sm:p-7 pt-3">
                    <h3 className="text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {film.seriesName}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 font-medium">
                      두께: {film.thickness} • VLT: {film.vlt}%
                    </p>

                    {/* Interior Effect Highlight Box */}
                    {film.interiorEffect && (
                      <div className="mt-3.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 leading-relaxed">
                        <span className="font-bold text-amber-300 block mb-0.5 flex items-center gap-1">
                          <Palette className="w-3.5 h-3.5" /> 실내 인테리어 연출 효과
                        </span>
                        {film.interiorEffect}
                      </div>
                    )}

                    {/* Key Spec Gauges Matrix */}
                    <div className="mt-5 pt-4 border-t border-zinc-800/80 grid grid-cols-3 gap-2 text-center bg-zinc-900/90 p-3 rounded-2xl border border-zinc-800">
                      <div>
                        <span className="text-[10px] text-zinc-500 block font-semibold">적외선(열)차단</span>
                        <strong className="text-base font-extrabold text-amber-400">{film.irr}%</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 block font-semibold">자외선차단</span>
                        <strong className="text-base font-extrabold text-sky-400">{film.uvr}%</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 block font-semibold">총에너지(TSER)</span>
                        <strong className="text-base font-extrabold text-emerald-400">{film.tser}%</strong>
                      </div>
                    </div>

                    {/* Key Advantages Checklist */}
                    <div className="mt-5 space-y-2">
                      <span className="text-xs font-bold text-zinc-300 block">핵심 장점 및 스펙</span>
                      {(film.keyAdvantages || film.features.slice(0, 4)).map((adv, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{adv}</span>
                        </div>
                      ))}
                    </div>

                    {/* Recommended For */}
                    <div className="mt-4 p-2.5 bg-zinc-900 rounded-xl border border-zinc-800 text-[11px] text-zinc-300 leading-tight">
                      <strong className="text-amber-300">추천 공간:</strong> {film.recommendedFor}
                    </div>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="p-6 sm:p-7 pt-0">
                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                    <div className="text-[11px] text-zinc-500 font-medium">
                      품질보증: <strong className="text-zinc-300">{film.warrantyYears}년 무상 AS</strong>
                    </div>
                    <button
                      onClick={() => onSelectFilmForConsultation(film)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-sm ${
                        isFlagship
                          ? 'bg-amber-500 hover:bg-amber-400 text-black font-extrabold shadow-amber-500/20'
                          : 'bg-zinc-900 hover:bg-amber-500 text-zinc-100 hover:text-white border border-zinc-700 hover:border-amber-500'
                      }`}
                    >
                      <span>이 필름 견적 신청</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Authenticity Guarantee Banner */}
        <div className="mt-16 bg-[#121214] rounded-3xl p-8 border border-zinc-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 shadow-md">
              <FileCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white">
                100% 정품 필름 감별 & 모바일 전자보증서 발급 시스템
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                빛담건물썬팅은 시공 후 필름 표면의 정품 로고 마킹을 고객님께 직접 확인시켜 드리며, 
                본사 전산에 등록되는 고유 시리얼 넘버의 공식 모바일 품질보증서를 100% 즉시 발급해 드립니다.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              10년 무상 품질보증서
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};


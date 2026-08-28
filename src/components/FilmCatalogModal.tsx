import React, { useState } from 'react';
import { FILM_PRODUCTS } from '../data/mockData';
import { FilmSpec } from '../types';
import { 
  X, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  Eye, 
  Palette, 
  ArrowRight,
  ExternalLink,
  Layers,
  Sun,
  Flame,
  Thermometer,
  Shield,
  FileCheck
} from 'lucide-react';

interface FilmCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  onSelectFilmForConsultation: (film: FilmSpec) => void;
}

export const FilmCatalogModal: React.FC<FilmCatalogModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'all',
  onSelectFilmForConsultation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  // Sync category when modal opens or initialCategory changes
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory, isOpen]);

  if (!isOpen) return null;

  const filterTabs = [
    { id: 'all', label: '전체 정품 필름 (6종)' },
    { id: 'multi_sputter', label: '멀티레이어스퍼터 (열반사)' },
    { id: 'deposit_sputter', label: '증착스퍼터 (사계절 Low-E)' },
    { id: 'nano_ceramic', label: '나노세라믹 (비금속)' },
    { id: 'design', label: '디자인 (글라데이션/암막/엠보)' },
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
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-[#101012] text-zinc-100 w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden border border-zinc-800 my-auto flex flex-col max-h-[92vh]">
        {/* Modal Top Header Bar */}
        <div className="px-6 py-4.5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  빛담 정품 필름 전체 라인업 & 상세 스펙북
                </h3>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  공식 10년 정품 전자보증
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-medium">
                멀티레이어 스퍼터, 사계절 Low-E, 비금속 나노세라믹, 인테리어 디자인 필름 규격 상세 안내
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filter Navigation Bar */}
        <div className="px-6 py-3.5 bg-black/40 border-b border-zinc-800/80 flex items-center justify-between flex-wrap gap-2 shrink-0">
          <div className="flex items-center flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-amber-500 text-black font-extrabold shadow-md shadow-amber-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-[11px] text-zinc-400 font-medium hidden md:flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>원하시는 모델의 <strong>[견적 신청]</strong>을 누르시면 상담서에 자동 기재됩니다.</span>
          </div>
        </div>

        {/* Scrollable Film Cards Grid Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFilms.map((film) => {
              const isFlagship = film.id === 'film-bd-st-2598';
              return (
                <div
                  key={film.id}
                  className={`rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group ${
                    isFlagship
                      ? 'bg-gradient-to-b from-[#18181c] to-[#121214] border-2 border-amber-500/80 shadow-amber-500/10'
                      : 'bg-[#141416] border border-white/10 hover:border-amber-500/50'
                  }`}
                >
                  <div>
                    {/* Window Simulation Preview Image */}
                    {film.previewImage && (
                      <div className="relative h-44 w-full overflow-hidden bg-zinc-900">
                        <img
                          src={film.previewImage}
                          alt={`${film.seriesName} 실내 창문 시공 연출`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-[#141416]/40 to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10 text-zinc-200">
                            {film.colorTone}
                          </span>
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded shadow-sm ${
                              film.gradeBadge === 'ULTRA FLAGSHIP'
                                ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black'
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

                        {/* Bottom Label */}
                        <div className="absolute bottom-2 left-3 text-[10px] text-amber-300 font-bold flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>실내 창문 시공 뷰 연출</span>
                        </div>
                      </div>
                    )}

                    {/* Card Content Body */}
                    <div className="p-5 space-y-3.5">
                      <div>
                        <h4 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors leading-snug">
                          {film.seriesName}
                        </h4>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          두께: {film.thickness} • VLT(가시광선): {film.vlt}%
                        </p>
                      </div>

                      {/* Interior Effect Highlight */}
                      {film.interiorEffect && (
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 leading-relaxed">
                          <span className="font-bold text-amber-300 block mb-0.5 flex items-center gap-1">
                            <Palette className="w-3.5 h-3.5" /> 인테리어 연출 효과
                          </span>
                          {film.interiorEffect}
                        </div>
                      )}

                      {/* 4-Spec Matrix */}
                      <div className="grid grid-cols-3 gap-1.5 text-center bg-black/50 p-2.5 rounded-xl border border-white/5">
                        <div>
                          <span className="text-[9px] text-zinc-400 block font-medium">열차단(IRR)</span>
                          <strong className="text-sm font-black text-amber-400">{film.irr}%</strong>
                        </div>
                        <div>
                          <span className="text-[9px] text-zinc-400 block font-medium">자외선차단</span>
                          <strong className="text-sm font-black text-sky-400">{film.uvr}%</strong>
                        </div>
                        <div>
                          <span className="text-[9px] text-zinc-400 block font-medium">총에너지(TSER)</span>
                          <strong className="text-sm font-black text-emerald-400">{film.tser}%</strong>
                        </div>
                      </div>

                      {/* Key Advantages List */}
                      <div className="space-y-1.5 pt-1">
                        {(film.keyAdvantages || film.features.slice(0, 3)).map((adv, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span className="leading-tight">{adv}</span>
                          </div>
                        ))}
                      </div>

                      {/* Recommended For */}
                      <div className="p-2 bg-zinc-900 rounded-xl border border-zinc-800 text-[10px] text-zinc-300 leading-tight">
                        <strong className="text-amber-300">추천 장소:</strong> {film.recommendedFor}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-zinc-400">
                        보증: <strong className="text-zinc-200">{film.warrantyYears}년 무상 AS</strong>
                      </span>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectFilmForConsultation(film);
                        }}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-500/20 transition-all flex items-center gap-1 cursor-pointer active:scale-95"
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

          {/* Genuine Certificate Notice Banner */}
          <div className="p-5 bg-gradient-to-r from-[#17181c] via-[#1c1d22] to-[#17181c] rounded-2xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileCheck className="w-8 h-8 text-amber-400 shrink-0" />
              <div className="text-xs">
                <h5 className="font-bold text-white">모든 필름은 시공 후 본사 고유 시리얼 넘버 품질보증서가 발급됩니다.</h5>
                <p className="text-zinc-400 mt-0.5">정품 로고 마킹 확인 및 10년 무상 AS 전자보증서로 끝까지 안심하실 수 있습니다.</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 transition-colors shrink-0 cursor-pointer"
            >
              창 닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

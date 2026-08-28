import React, { useState, useEffect } from 'react';
import { FilmSpec } from '../types';
import { FilmCatalogModal } from './FilmCatalogModal';
import { 
  Sun, 
  Sparkles, 
  Thermometer, 
  ShieldCheck, 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowUpRight, 
  CheckCircle2, 
  Layers, 
  ExternalLink,
  Flame,
  Snowflake,
  Eye,
  ChevronRight,
  ZoomIn,
  ArrowRight,
  Activity,
  Maximize2,
  Gauge,
  Cpu
} from 'lucide-react';

interface FilmProductSectionProps {
  onSelectFilmForConsultation: (film: FilmSpec) => void;
}

export const FilmProductSection: React.FC<FilmProductSectionProps> = ({ onSelectFilmForConsultation }) => {
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState('all');

  // Simulation State: 'applied' (빛담 필름 시공 후) vs 'unapplied' (일반 유리 미시공)
  const [isFilmApplied, setIsFilmApplied] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  // Dynamic Solar Energy Figures
  // When Film Applied (반사 극대화): 반사 80%, 흡수 10%, 투과 10%
  // When Unapplied (일반 유리): 반사 8%, 흡수 12%, 투과 80%
  const currentMetrics = isFilmApplied
    ? {
        reflection: 80,
        absorption: 10,
        transmission: 10,
        irr: '98%',
        uvr: '99.9%',
        tser: '78%',
        roomTemp: '23.5℃ 쾌적',
        glassTemp: '26.1℃ 안정',
        thermalStress: '열파손 위험 0% (열축적 없음)',
        statusBadge: '귀금속 멀티스퍼터 고반사 모드',
        energySaving: '에어컨 소비전력 최대 30% 절감',
      }
    : {
        reflection: 8,
        absorption: 12,
        transmission: 80,
        irr: '0%',
        uvr: '15%',
        tser: '18%',
        roomTemp: '42.8℃ 찜통',
        glassTemp: '51.4℃ 과열',
        thermalStress: '열파손 및 실내 복사열 방출 위험',
        statusBadge: '일반 유리 미시공 (온열 관통)',
        energySaving: '냉방비 누진세 과다 발생',
      };

  const handleOpenCatalog = (category = 'all') => {
    setSelectedCatalogCategory(category);
    setIsCatalogModalOpen(true);
  };

  return (
    <section id="products" className="py-24 bg-[#0A0A0C] relative text-zinc-200 overflow-hidden">
      {/* Dynamic ambient lighting glow */}
      <div 
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 ${
          isFilmApplied ? 'bg-amber-500/10' : 'bg-red-600/10'
        }`} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-black">
              <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
              <span>SINGLE PANE MACRO OPTICS • 창호 1장 확대 일사열 3대 거동(반사·흡수·투과) 분석</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              열차단필름의 강력한 열반사효과
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              좌측의 <strong>광학 수치 배분표와 정밀 스펙</strong>을 확인하시고, 
              우측 영상에서 <strong>태양열의 80%가 실외로 즉시 튕겨 나가는 시뮬레이션</strong>을 관찰하세요.
            </p>
          </div>

          {/* Primary Action Button: Open Full Lineup Modal */}
          <button
            onClick={() => handleOpenCatalog('all')}
            className="px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs sm:text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2.5 cursor-pointer transition-all shrink-0 active:scale-95 group"
          >
            <Layers className="w-4 h-4 text-black" />
            <span>빛담 정품 필름 전체 라인업 & 상세 스펙북 열기</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 🔬 Main Stage: Left Side [수치배분 & 스펙] vs Right Side [단면 시뮬레이션 영상] */}
        <div className="bg-[#121215] border-2 border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative">
          
          {/* Top Control Header Bar */}
          <div className="bg-[#17171c] px-5 sm:px-8 py-4 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-black text-white uppercase tracking-wider">
                  창호 1장 확대 단면 광학 시험기 (10X MACRO SIMULATOR)
                </span>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono hidden md:inline">
                | SOLAR RADIATION ENERGY CONSERVATION (반사 80% 극대화)
              </span>
            </div>

            {/* Mode Switcher: Before vs After */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-400 hidden sm:inline">시공 비교:</span>
              <div className="inline-flex p-1 bg-black/60 rounded-xl border border-white/10">
                <button
                  onClick={() => setIsFilmApplied(false)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    !isFilmApplied
                      ? 'bg-red-500 text-white shadow-md shadow-red-500/30'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  일반유리 (투과 80% 찜통)
                </button>
                <button
                  onClick={() => setIsFilmApplied(true)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    isFilmApplied
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md shadow-amber-500/30'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 fill-black" />
                  <span>빛담 필름 (반사 80% 극대화)</span>
                </button>
              </div>

              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className="p-2 ml-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                title={isAnimating ? '광선 모션 일시정지' : '광선 모션 재생'}
              >
                {isAnimating ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            </div>
          </div>

          {/* 📐 2-Column Split: [LEFT: 수치배분 & 스펙 (6 cols)] + [RIGHT: 단면 시뮬레이션 영상 (6 cols)] */}
          <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start bg-[#08080a]">
            
            {/* ⬅️ LEFT COLUMN: 수치 배분 & 정밀 스펙 패널 (6/12) */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* 1. 수치 배분 헤더 카드 */}
              <div className="bg-[#151519] border border-white/10 p-5 rounded-2xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-white">
                        태양열 광학 3대 거동 수치 배분표
                      </h3>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        입사 태양열 100% (1,000 W/㎡) = 반사 + 흡수 + 투과
                      </span>
                    </div>
                  </div>
                  <span className={`text-[11px] font-black px-2.5 py-1 rounded-full border ${
                    isFilmApplied 
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-red-500/20 text-red-300 border-red-500/40'
                  }`}>
                    {currentMetrics.statusBadge}
                  </span>
                </div>

                {/* 3대 수치 배분 게이지 (반사 80% 대폭 강조) */}
                <div className="space-y-3">
                  
                  {/* [1] 태양열 반사율 (Reflection 80%) */}
                  <div className={`p-3.5 rounded-xl border transition-all ${
                    isFilmApplied 
                      ? 'bg-amber-500/15 border-amber-500/50 shadow-lg shadow-amber-500/10' 
                      : 'bg-zinc-900/90 border-zinc-800'
                  }`}>
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="flex items-center gap-1.5 text-white">
                        <Flame className="w-4 h-4 text-amber-400" />
                        <span>태양열 반사율 (Solar Reflection)</span>
                        {isFilmApplied && (
                          <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500 text-black">
                            고반사 극대화
                          </span>
                        )}
                      </span>
                      <strong className="text-xl font-black text-amber-400">
                        {currentMetrics.reflection}%
                      </strong>
                    </div>
                    <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/5">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
                        style={{ width: `${currentMetrics.reflection}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-1.5">
                      <span>{isFilmApplied ? '★ 귀금속 스퍼터층이 실외로 즉시 튕겨냄 (열축적 0)' : '일반 유리의 미약한 자연반사'}</span>
                      <span className="font-mono font-bold text-amber-300">{currentMetrics.reflection * 10} W/㎡ 반사</span>
                    </div>
                  </div>

                  {/* [2] 태양열 흡수율 (Absorption 10%) */}
                  <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="flex items-center gap-1.5 text-purple-300">
                        <Layers className="w-4 h-4 text-purple-400" />
                        <span>태양열 흡수율 (Solar Absorption)</span>
                      </span>
                      <strong className="text-lg font-black text-purple-400">
                        {currentMetrics.absorption}%
                      </strong>
                    </div>
                    <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/5">
                      <div 
                        className="h-full bg-purple-500 rounded-full transition-all duration-700"
                        style={{ width: `${currentMetrics.absorption}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-1.5">
                      <span>{isFilmApplied ? '유리 열축적이 없어 열파손(크랙) 위험 원천 차단' : '유리가 열을 흡수하여 실내로 2차 복사열 방출'}</span>
                      <span className="font-mono text-zinc-500">{currentMetrics.absorption * 10} W/㎡ 흡수</span>
                    </div>
                  </div>

                  {/* [3] 태양열 투과율 (Transmission 10%) */}
                  <div className={`p-3.5 rounded-xl border transition-all ${
                    !isFilmApplied 
                      ? 'bg-red-500/15 border-red-500/40' 
                      : 'bg-zinc-900/90 border-zinc-800'
                  }`}>
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className={`flex items-center gap-1.5 ${isFilmApplied ? 'text-sky-300' : 'text-red-300'}`}>
                        <Eye className="w-4 h-4 text-sky-400" />
                        <span>자연광/열선 투과율 (Solar Transmission)</span>
                      </span>
                      <strong className={`text-lg font-black ${isFilmApplied ? 'text-sky-400' : 'text-red-400'}`}>
                        {currentMetrics.transmission}%
                      </strong>
                    </div>
                    <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/5">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${
                          isFilmApplied ? 'bg-sky-400' : 'bg-red-500'
                        }`}
                        style={{ width: `${currentMetrics.transmission}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-1.5">
                      <span>{isFilmApplied ? '눈부심을 억제한 은은한 자연 채광 & 선명한 조망' : '⚠️ 뜨거운 태양 복사열이 실내로 80% 그대로 쏟아짐'}</span>
                      <span className="font-mono text-zinc-500">{currentMetrics.transmission * 10} W/㎡ 투과</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. 핵심 광학 스펙 & 실내 환경 지표 그리드 (6개 타일) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="bg-[#151519] p-3 rounded-xl border border-zinc-800 text-center">
                  <span className="text-[10px] text-zinc-400 block font-medium">적외선(열차단) 차단율</span>
                  <strong className={`text-sm font-black ${isFilmApplied ? 'text-amber-400' : 'text-zinc-500'}`}>
                    IRR {currentMetrics.irr}
                  </strong>
                  <span className="text-[9px] text-zinc-500 block mt-0.5">열선 원천 반사</span>
                </div>

                <div className="bg-[#151519] p-3 rounded-xl border border-zinc-800 text-center">
                  <span className="text-[10px] text-zinc-400 block font-medium">자외선 차단율</span>
                  <strong className={`text-sm font-black ${isFilmApplied ? 'text-sky-400' : 'text-zinc-500'}`}>
                    UV {currentMetrics.uvr}
                  </strong>
                  <span className="text-[9px] text-zinc-500 block mt-0.5">가구·마루 변색 방지</span>
                </div>

                <div className="bg-[#151519] p-3 rounded-xl border border-zinc-800 text-center">
                  <span className="text-[10px] text-zinc-400 block font-medium">총태양에너지차단율</span>
                  <strong className={`text-sm font-black ${isFilmApplied ? 'text-amber-300' : 'text-zinc-500'}`}>
                    TSER {currentMetrics.tser}
                  </strong>
                  <span className="text-[9px] text-zinc-500 block mt-0.5">국제 표준 기준</span>
                </div>

                <div className="bg-[#151519] p-3 rounded-xl border border-zinc-800 text-center">
                  <span className="text-[10px] text-zinc-400 block font-medium">실내 체감 온도</span>
                  <strong className={`text-sm font-black ${isFilmApplied ? 'text-emerald-400' : 'text-red-400'}`}>
                    {currentMetrics.roomTemp}
                  </strong>
                  <span className="text-[9px] text-zinc-500 block mt-0.5">{isFilmApplied ? '미시공 대비 -19.3℃' : '찜통 온실 효과'}</span>
                </div>

                <div className="bg-[#151519] p-3 rounded-xl border border-zinc-800 text-center">
                  <span className="text-[10px] text-zinc-400 block font-medium">유리 표면 온도</span>
                  <strong className={`text-sm font-black ${isFilmApplied ? 'text-emerald-400' : 'text-red-400'}`}>
                    {currentMetrics.glassTemp}
                  </strong>
                  <span className="text-[9px] text-zinc-500 block mt-0.5">{isFilmApplied ? '열파손 위험 0%' : '유리 표면 과열'}</span>
                </div>

                <div className="bg-[#151519] p-3 rounded-xl border border-zinc-800 text-center">
                  <span className="text-[10px] text-zinc-400 block font-medium">에너지 절감 효과</span>
                  <strong className={`text-sm font-black ${isFilmApplied ? 'text-sky-400' : 'text-red-400'}`}>
                    {isFilmApplied ? '최대 30% 절감' : '누진세 과다'}
                  </strong>
                  <span className="text-[9px] text-zinc-500 block mt-0.5">냉난방비 대폭 절약</span>
                </div>
              </div>
            </div>

            {/* ➡️ RIGHT COLUMN: 창호 1장 확대 단면 시뮬레이션 영상/캔버스 (6/12) */}
            <div className="lg:col-span-6 bg-[#131317] border border-white/10 rounded-2xl p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between shadow-xl">
              
              {/* Simulation Header Badge */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-black text-zinc-200">
                    광학 단면 영상 시뮬레이터 (10X MACRO)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 bg-black/60 px-2 py-0.5 rounded border border-white/5">
                  입사: 1,000 W/㎡
                </span>
              </div>

              {/* 📽️ Compact SVG Ray Tracing Simulation Canvas */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center bg-[#070709] rounded-xl border border-zinc-800/80 overflow-hidden p-2">
                
                {/* Background Crosshair & Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                <svg className="w-full h-full overflow-visible" viewBox="0 0 460 300">
                  <defs>
                    {/* Incoming Ray Gradient */}
                    <linearGradient id="inRayCompact" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>

                    {/* Massive High-Power Reflected Beam (80% 반사) */}
                    <linearGradient id="reflectRayCompact" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>

                    {/* Absorption Heat Gradient */}
                    <linearGradient id="absorbRayCompact" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.2" />
                    </linearGradient>

                    {/* Transmission Ray Gradient */}
                    <linearGradient id="transRayCompact" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>

                    {/* Glass Body Texture */}
                    <linearGradient id="glassBodyCompact" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#0f172a" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
                    </linearGradient>

                    {/* Multi-Sputter Nano Metal Coating */}
                    <linearGradient id="nanoSputterFilmCompact" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#fef08a" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                  </defs>

                  {/* Outdoor / Indoor Backdrop Shading */}
                  <rect x="0" y="0" width="190" height="300" fill="transparent" />
                  <rect x="250" y="0" width="210" height="300" fill="#000000" fillOpacity="0.5" rx="12" />

                  {/* 1. Left Sun Emitter */}
                  <g className="animate-pulse" transform="translate(15, 120)">
                    <circle cx="20" cy="30" r="18" fill="url(#inRayCompact)" />
                    <circle cx="20" cy="30" r="24" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
                  </g>

                  {/* 2. Zoomed Single Pane Glass Pillar (창호 1장 확대 단면) */}
                  <g>
                    {/* Glass Pane */}
                    <rect
                      x="200"
                      y="15"
                      width="40"
                      height="270"
                      rx="6"
                      fill="url(#glassBodyCompact)"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      strokeOpacity="0.7"
                    />
                    <text x="220" y="150" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle" transform="rotate(-90 220 150)">
                      창호 유리 단면 (6mm)
                    </text>

                    {/* ✨ Film Coating Layer on Outdoor Side */}
                    {isFilmApplied && (
                      <g>
                        <rect
                          x="193"
                          y="15"
                          width="7"
                          height="270"
                          rx="3.5"
                          fill="url(#nanoSputterFilmCompact)"
                          stroke="#fbbf24"
                          strokeWidth="1.2"
                          className="animate-pulse"
                        />
                        <text x="184" y="150" fill="#fbbf24" fontSize="8" fontWeight="900" textAnchor="middle" transform="rotate(-90 184 150)">
                          빛담 멀티스퍼터 필름
                        </text>
                      </g>
                    )}
                  </g>

                  {/* 3. Incoming Solar Beam (입사광선 100%) */}
                  <g className="animate-pulse">
                    <path
                      d="M 50 150 L 192 150"
                      stroke="url(#inRayCompact)"
                      strokeWidth="7"
                      strokeLinecap="round"
                    />
                    <polygon points="186,144 198,150 186,156" fill="#ef4444" />
                    <text x="110" y="138" fill="#f59e0b" fontSize="10" fontWeight="900" textAnchor="middle">
                      입사 태양열 100%
                    </text>
                  </g>

                  {/* 4. Active Energy Trajectories (반사 · 흡수 · 투과) */}
                  {isFilmApplied ? (
                    // ✨ [FILM APPLIED] Hero 80% Reflection + 10% Absorption + 10% Transmission
                    <g>
                      {/* [A] SOLAR REFLECTION (반사 80% - HERO BOUNCE ARROW) */}
                      <path
                        d="M 193 150 L 65 35"
                        stroke="url(#reflectRayCompact)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        className="animate-pulse"
                      />
                      <polygon points="58,30 76,32 68,46" fill="#fbbf24" />
                      
                      {/* Sparkle Impacts */}
                      <circle cx="193" cy="150" r="7" fill="#fef08a" className="animate-ping" />
                      <circle cx="193" cy="150" r="4" fill="#f59e0b" />

                      <rect x="35" y="12" width="120" height="26" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.2" />
                      <text x="95" y="29" fill="#fbbf24" fontSize="11" fontWeight="900" textAnchor="middle">
                        ⚡ 태양열 반사: 80%
                      </text>

                      {/* [B] SOLAR ABSORPTION (흡수 10%) */}
                      <path
                        d="M 210 150 L 210 260"
                        stroke="url(#absorbRayCompact)"
                        strokeWidth="3.5"
                        strokeDasharray="3 3"
                        strokeLinecap="round"
                      />
                      <rect x="155" y="265" width="110" height="22" rx="5" fill="#18181b" stroke="#a855f7" strokeWidth="1" />
                      <text x="210" y="280" fill="#c084fc" fontSize="9" fontWeight="bold" textAnchor="middle">
                        태양열 흡수: 10%
                      </text>

                      {/* [C] SOLAR TRANSMISSION (투과 10%) */}
                      <path
                        d="M 240 150 L 420 150"
                        stroke="url(#transRayCompact)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <polygon points="415,146 426,150 415,154" fill="#38bdf8" />
                      <rect x="290" y="136" width="115" height="26" rx="6" fill="#18181b" stroke="#38bdf8" strokeWidth="1.2" />
                      <text x="347" y="153" fill="#38bdf8" fontSize="10" fontWeight="900" textAnchor="middle">
                        자연광 투과: 10%
                      </text>
                    </g>
                  ) : (
                    // ❌ [UNAPPLIED GLASS] Weak 8% Reflection + 12% Absorption + 80% Massive Transmission
                    <g>
                      {/* Weak Reflection */}
                      <path
                        d="M 200 150 L 105 75"
                        stroke="#94a3b8"
                        strokeWidth="2"
                        strokeDasharray="3 3"
                      />
                      <text x="110" y="65" fill="#94a3b8" fontSize="9" fontWeight="bold">
                        반사: 8%
                      </text>

                      {/* Absorption */}
                      <path
                        d="M 220 150 L 220 260"
                        stroke="#ef4444"
                        strokeWidth="3"
                        strokeDasharray="3 3"
                      />
                      <text x="220" y="278" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">
                        흡수열: 12% (과열)
                      </text>

                      {/* Massive Heat Transmission (80% 찜통) */}
                      <path
                        d="M 240 150 L 420 150"
                        stroke="#ef4444"
                        strokeWidth="12"
                        strokeLinecap="round"
                        className="animate-pulse"
                      />
                      <polygon points="410,142 426,150 410,158" fill="#dc2626" />
                      <rect x="285" y="132" width="125" height="32" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                      <text x="347" y="152" fill="#fca5a5" fontSize="11" fontWeight="900" textAnchor="middle">
                        ⚠️ 열선 투과: 80%
                      </text>
                    </g>
                  )}
                </svg>

                {/* Boundary Floating Text */}
                <div className="absolute bottom-2 left-4 text-[10px] font-bold text-amber-400 bg-black/70 px-2 py-0.5 rounded border border-amber-500/20">
                  ◀ 실외 (태양열 방출)
                </div>
                <div className="absolute bottom-2 right-4 text-[10px] font-bold text-sky-400 bg-black/70 px-2 py-0.5 rounded border border-sky-500/20">
                  실내 (쾌적 조망) ▶
                </div>
              </div>

              {/* Bottom Quick Caption */}
              <div className="mt-3 text-[11px] text-zinc-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Cpu className="w-3.5 h-3.5 text-amber-400" />
                  스퍼터링 나노 원자막 반사 광학 기술
                </span>
                <span className="text-amber-400 font-bold">10년 품질 전자보증</span>
              </div>
            </div>

          </div>
        </div>

        {/* 🌟 4 Genuine Film Series Shortcut Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              category: 'multi_sputter',
              title: 'BD ST 시리즈 (멀티스퍼터)',
              tag: '최상위 플래그십',
              desc: '귀금속 원자 다층 증착 순수 열반사',
              spec: '반사율 80% / IRR 98%',
            },
            {
              category: 'deposit_sputter',
              title: 'BD AP 시리즈 (증착스퍼터)',
              tag: '사계절 Low-E 단열',
              desc: '진공 고온 금속증착 사계절 보온',
              spec: 'IRR 89% / TSER 67%',
            },
            {
              category: 'nano_ceramic',
              title: 'BD IR 시리즈 (나노세라믹)',
              tag: '비금속 무반사',
              desc: '초미립자 나노세라믹 전파장애 0%',
              spec: 'IRR 95% / UVR 99.9%',
            },
            {
              category: 'design',
              title: '디자인 라인업 (인테리어)',
              tag: '글라데이션 / 엠보',
              desc: '오피스 회의실 & 주거 프라이버시',
              spec: '시선차단 100% / 화이트 엠보',
            },
          ].map((item, i) => (
            <div
              key={i}
              onClick={() => handleOpenCatalog(item.category)}
              className="bg-[#121214] hover:bg-[#18181c] p-4.5 rounded-2xl border border-white/10 hover:border-amber-500/60 transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    {item.tag}
                  </span>
                  <span className="text-[11px] font-bold text-amber-400 group-hover:translate-x-1 transition-transform flex items-center">
                    스펙 확인 <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h4 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-400 mt-1">{item.desc}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
                <span className="text-zinc-500 font-medium">대표 스펙:</span>
                <strong className="text-zinc-200">{item.spec}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🚀 Popup Modal for Full Film Catalog & Specs */}
      <FilmCatalogModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
        initialCategory={selectedCatalogCategory}
        onSelectFilmForConsultation={onSelectFilmForConsultation}
      />
    </section>
  );
};

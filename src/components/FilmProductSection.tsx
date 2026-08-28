import React, { useState, useEffect } from 'react';
import { FilmSpec } from '../types';
import { FilmCatalogModal } from './FilmCatalogModal';
import { 
  Sun, 
  Sparkles, 
  Building2, 
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
  Sliders,
  ChevronRight,
  TrendingDown
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
  const [sunIntensity, setSunIntensity] = useState<number>(85); // %
  const [activeRayFilter, setActiveRayFilter] = useState<'all' | 'infrared' | 'uv' | 'visible'>('all');

  // Auto-pulse animation ticker
  const [ticker, setTicker] = useState(0);
  useEffect(() => {
    let timer: any;
    if (isAnimating) {
      timer = setInterval(() => {
        setTicker((t) => (t + 1) % 100);
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isAnimating]);

  const handleOpenCatalog = (category = 'all') => {
    setSelectedCatalogCategory(category);
    setIsCatalogModalOpen(true);
  };

  return (
    <section id="products" className="py-24 bg-[#0A0A0C] relative text-zinc-200 overflow-hidden">
      {/* Dynamic ambient lighting */}
      <div 
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 ${
          isFilmApplied ? 'bg-amber-500/10' : 'bg-red-600/10'
        }`} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-black">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>ARCHITECTURAL SOLAR REFLECTION • 대형 통창·창호 건물 일사열 반사 시뮬레이션</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              창호가 많은 건물에 필름을 시공했을 때, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
                뜨거운 태양열과 자외선이 튕겨 나가는 순수 반사 원리
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              유리면적이 넓은 아파트, 통창 오피스 빌딩, 커튼월 사옥에 빛담 정품 필름이 시공되면 
              <strong> 유리가 열을 흡수하기 전 실외로 즉각 튕겨내어</strong> 건물 전체를 시원하고 쾌적하게 유지합니다.
            </p>
          </div>

          {/* Primary Action Button: Open Full Lineup Modal in New Window */}
          <button
            onClick={() => handleOpenCatalog('all')}
            className="px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs sm:text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2.5 cursor-pointer transition-all shrink-0 active:scale-95 group"
          >
            <Layers className="w-4 h-4 text-black" />
            <span>빛담 정품 필름 전체 라인업 & 상세 스펙북 열기</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 🏢 Main Interactive Architectural Glass Building Solar Ray Reflection Simulator */}
        <div className="bg-[#121215] border-2 border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative">
          {/* Top Simulation Control Bar */}
          <div className="bg-[#17171c] px-5 sm:px-8 py-4 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4">
            {/* Live Status & Mode Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-zinc-400 hidden sm:inline">시뮬레이션 모드:</span>
              <div className="inline-flex p-1 bg-black/60 rounded-xl border border-white/10">
                <button
                  onClick={() => setIsFilmApplied(false)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    !isFilmApplied
                      ? 'bg-red-500 text-white shadow-md shadow-red-500/30'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  미시공 일반유리 (온열투과)
                </button>
                <button
                  onClick={() => setIsFilmApplied(true)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    isFilmApplied
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md shadow-amber-500/30'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 fill-black" />
                  <span>빛담 정품필름 시공 (열선반사)</span>
                </button>
              </div>
            </div>

            {/* Ray Spectrum Filter Tabs */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-zinc-500 font-medium hidden md:inline mr-1">광선 제어:</span>
              {[
                { id: 'all', label: '전체 태양광 (통합)' },
                { id: 'infrared', label: '적외선(열선 98% 반사)' },
                { id: 'uv', label: '자외선(UV 99.9% 차단)' },
                { id: 'visible', label: '가시광선(자연채광)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveRayFilter(tab.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    activeRayFilter === tab.id
                      ? 'bg-zinc-700 text-amber-300 border border-amber-500/40'
                      : 'bg-zinc-800/60 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className="p-1.5 ml-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                title={isAnimating ? '모션 일시정지' : '모션 재생'}
              >
                {isAnimating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            </div>
          </div>

          {/* 📽️ Simulation Graphic Stage (Sun -> Solar Ray Trajectory -> Multi-Window Building Facade -> Reflection Bounce) */}
          <div className="p-6 sm:p-10 relative bg-[#09090b] overflow-hidden min-h-[460px] flex flex-col justify-between">
            {/* Background grid markings */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            {/* Dynamic Solar Ray Canvas Illustration */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* 1. Left Source: Intense Sun (강렬한 태양 광원) */}
              <div className="lg:col-span-3 flex flex-col items-center justify-center text-center space-y-3">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-300 flex items-center justify-center shadow-[0_0_60px_rgba(245,158,11,0.6)] animate-pulse">
                    <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </div>
                  {/* Glowing corona rings */}
                  <div className="absolute -inset-3 rounded-full border border-amber-500/30 animate-ping pointer-events-none" />
                  <div className="absolute -inset-6 rounded-full border border-orange-500/15 pointer-events-none" />
                </div>

                <div>
                  <h4 className="text-sm font-black text-white">직사 일사광선 방출</h4>
                  <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                    적외선(열) 53% • 가시광선 44% • 자외선 3%
                  </p>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 text-[10px] font-bold border border-orange-500/30">
                    일사 에너지: 1,000 W/㎡
                  </span>
                </div>
              </div>

              {/* 2. Center: Ray Tracing Trajectory & Reflection Physics SVG */}
              <div className="lg:col-span-4 relative flex items-center justify-center min-h-[220px]">
                <svg className="w-full h-56 overflow-visible" viewBox="0 0 300 200">
                  <defs>
                    {/* Linear Gradient for Incident Solar Heat Ray */}
                    <linearGradient id="incidentHeatRay" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="1" />
                    </linearGradient>

                    {/* Gradient for Reflected Ray (빛담 필름에 튕겨 나가는 반사광) */}
                    <linearGradient id="reflectedRay" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
                    </linearGradient>

                    {/* Gradient for Penetrated Ray (미시공 시 실내 관통광) */}
                    <linearGradient id="penetratedRay" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
                      <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.8" />
                    </linearGradient>

                    {/* Soft Filtered Visible Light (필름 시공 후 유입되는 은은한 채광) */}
                    <linearGradient id="softLightRay" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>

                  {/* Incoming Solar Rays (3 Multi-Trajectories targeting windows) */}
                  <g className="animate-pulse">
                    <path
                      d="M 10 50 L 220 70"
                      stroke="url(#incidentHeatRay)"
                      strokeWidth={activeRayFilter === 'infrared' || activeRayFilter === 'all' ? 4 : 1.5}
                      strokeDasharray="6 3"
                    />
                    <path
                      d="M 10 100 L 220 100"
                      stroke="url(#incidentHeatRay)"
                      strokeWidth={activeRayFilter === 'uv' || activeRayFilter === 'all' ? 4.5 : 1.5}
                      strokeDasharray="8 4"
                    />
                    <path
                      d="M 10 150 L 220 130"
                      stroke="url(#incidentHeatRay)"
                      strokeWidth={activeRayFilter === 'visible' || activeRayFilter === 'all' ? 3.5 : 1.5}
                      strokeDasharray="5 2"
                    />
                  </g>

                  {/* Interactive Reflection / Penetration Physics */}
                  {isFilmApplied ? (
                    // ✨ [FILM APPLIED] Bounces rays away back into sky
                    <g>
                      {/* Reflected Ray 1 */}
                      <path
                        d="M 220 70 L 140 10"
                        stroke="url(#reflectedRay)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="animate-pulse"
                      />
                      <circle cx="140" cy="10" r="3" fill="#fbbf24" />

                      {/* Reflected Ray 2 (Main Heat Rejection) */}
                      <path
                        d="M 220 100 L 120 20"
                        stroke="url(#reflectedRay)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        className="animate-pulse"
                      />
                      <circle cx="120" cy="20" r="4" fill="#f59e0b" />

                      {/* Reflected Ray 3 */}
                      <path
                        d="M 220 130 L 150 190"
                        stroke="url(#reflectedRay)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="animate-pulse"
                      />

                      {/* Sparkle Impact Points on Building Glass Surface */}
                      <circle cx="220" cy="70" r="5" fill="#fef08a" className="animate-ping" />
                      <circle cx="220" cy="100" r="6" fill="#fef08a" className="animate-ping" />
                      <circle cx="220" cy="130" r="5" fill="#fef08a" className="animate-ping" />

                      {/* Gentle Soft Light passing through */}
                      <path
                        d="M 220 100 L 290 100"
                        stroke="url(#softLightRay)"
                        strokeWidth="2"
                        strokeDasharray="3 3"
                      />
                    </g>
                  ) : (
                    // ❌ [UNAPPLIED GLASS] Heavy rays pierce straight through windows
                    <g className="animate-pulse">
                      <path
                        d="M 220 70 L 295 75"
                        stroke="url(#penetratedRay)"
                        strokeWidth="5"
                      />
                      <path
                        d="M 220 100 L 295 100"
                        stroke="url(#penetratedRay)"
                        strokeWidth="6"
                      />
                      <path
                        d="M 220 130 L 295 125"
                        stroke="url(#penetratedRay)"
                        strokeWidth="5"
                      />
                    </g>
                  )}
                </svg>

                {/* Real-time Status Floating Badge */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-black tracking-tight border shadow-lg ${
                      isFilmApplied
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/20'
                        : 'bg-red-500/20 text-red-300 border-red-500/40 shadow-red-500/20'
                    }`}
                  >
                    {isFilmApplied
                      ? '⚡ 적외선 98% 실외 즉시 반사 튕김'
                      : '⚠️ 일사열 100% 실내로 관통 유입'}
                  </span>
                </div>
              </div>

              {/* 3. Right: Multi-Window Architectural Building Facade (창호가 많은 대형 건물) */}
              <div className="lg:col-span-5 bg-[#17181c] p-4.5 sm:p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className={`w-4 h-4 ${isFilmApplied ? 'text-amber-400' : 'text-red-400'}`} />
                    <h4 className="text-xs sm:text-sm font-extrabold text-white">
                      창호 특화 대형 건물 단면 시뮬레이션
                    </h4>
                  </div>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded ${
                      isFilmApplied
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}
                  >
                    {isFilmApplied ? '빛담 10년 품질보증' : '미시공 일반유리'}
                  </span>
                </div>

                {/* 3x3 Architectural Glass Grid Panes (통창/커튼월 창호 그리드) */}
                <div className="grid grid-cols-3 gap-2 bg-black/60 p-3 rounded-xl border border-white/5 relative">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((pane) => (
                    <div
                      key={pane}
                      className={`h-14 sm:h-16 rounded-lg relative overflow-hidden transition-all duration-500 flex flex-col justify-between p-1.5 ${
                        isFilmApplied
                          ? 'bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] border border-amber-400/50 shadow-inner'
                          : 'bg-gradient-to-br from-red-900/60 via-red-950 to-orange-950/80 border border-red-500/50'
                      }`}
                    >
                      {/* Film Coating Surface Layer Line */}
                      {isFilmApplied && (
                        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 shadow-sm" />
                      )}

                      <span className="text-[9px] font-mono text-zinc-400">창호 #{pane}</span>
                      
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className={isFilmApplied ? 'text-emerald-400' : 'text-red-400'}>
                          {isFilmApplied ? '23.8℃' : '43.5℃'}
                        </span>
                        <span className="text-[8px] text-zinc-400 font-normal">
                          {isFilmApplied ? '쾌적조망' : '눈부심'}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Overlay scan indicator */}
                  <div className="absolute top-2 right-2 text-[9px] font-mono text-zinc-400 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm">
                    {isFilmApplied ? '● 99% 열차단 코팅 활성' : '▲ 실내 온실화 과열'}
                  </div>
                </div>

                {/* Building Interior Climate Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="bg-zinc-900/90 p-2.5 rounded-xl border border-zinc-800">
                    <span className="text-[9px] text-zinc-400 block">실내 체감 온도</span>
                    <strong className={`text-xs sm:text-sm font-black ${isFilmApplied ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isFilmApplied ? '24.0℃ 쾌적' : '43.2℃ 찜통'}
                    </strong>
                  </div>
                  <div className="bg-zinc-900/90 p-2.5 rounded-xl border border-zinc-800">
                    <span className="text-[9px] text-zinc-400 block">태양열 반사율</span>
                    <strong className={`text-xs sm:text-sm font-black ${isFilmApplied ? 'text-amber-400' : 'text-zinc-500'}`}>
                      {isFilmApplied ? 'IRR 98% 반사' : '0% (전부 유입)'}
                    </strong>
                  </div>
                  <div className="bg-zinc-900/90 p-2.5 rounded-xl border border-zinc-800">
                    <span className="text-[9px] text-zinc-400 block">냉방 에너지 절감</span>
                    <strong className={`text-xs sm:text-sm font-black ${isFilmApplied ? 'text-sky-400' : 'text-red-400'}`}>
                      {isFilmApplied ? '최대 30% 절감' : '냉방비 과다'}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Bottom 3-Point Scientific Principle Cards (햇빛 반사 3대 메커니즘) */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs">
                  <Flame className="w-4 h-4" />
                  <span>1. 적외선(열선) 98% 즉시 실외 반사</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  유리가 열을 머금는 흡수형 방식이 아닌, 귀금속 스퍼터 다층막이 복사열을 실외로 즉각 튕겨내어 유리의 열파손 위험이 없습니다.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1.5">
                <div className="flex items-center gap-2 text-sky-400 font-extrabold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>2. 유해 자외선(UV-A/B) 99.9% 영구 차단</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  가구·마루·소파의 변색과 피부 트러블을 일으키는 유해 자외선을 원천 차단하여 실내 인테리어 자산을 완벽하게 보호합니다.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs">
                  <Eye className="w-4 h-4" />
                  <span>3. 눈부심 제어 & 선명한 파노라마 뷰</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  과도한 햇빛 눈부심만 차분하게 억제하고 자연 채광과 선명한 야외 조망은 그대로 유지하여 블라인드 없이 쾌적한 뷰를 선사합니다.
                </p>
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
              spec: 'IRR 98% / TSER 78%',
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

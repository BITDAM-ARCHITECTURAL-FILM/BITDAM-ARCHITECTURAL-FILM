import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, Sun, ShieldCheck, Snowflake, Flame, EyeOff, CheckCircle2 } from 'lucide-react';

export type FilmMode = 'cooling' | 'privacy' | 'warming';

interface BeforeAfterSliderProps {
  mode: FilmMode;
  baseImage: string;
  buildingName?: string;
  className?: string;
  aspectRatio?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  mode,
  baseImage,
  buildingName = '초고층 랜드마크 윈도우 뷰',
  className = '',
  aspectRatio = 'aspect-[16/11]',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  // Mode specific configurations
  const modeConfigs = {
    cooling: {
      filmTag: '빛담 고단열 열차단 필름',
      filmDesc: '적외선 97% 반사 차단 (시원하고 쾌적한 실내)',
      filmTemp: '24.1℃',
      filmTempColor: 'text-sky-300 border-sky-400/40 bg-sky-950/80',
      filmIcon: Snowflake,
      rawTag: '미시공 일반 유리',
      rawDesc: '뜨거운 태양 복사열 유입 (온실효과 & 냉방과부하)',
      rawTemp: '38.6℃',
      rawTempColor: 'text-rose-300 border-rose-400/40 bg-rose-950/80',
      rawIcon: Sun,
      centerMetric: '체감온도 14.5℃ 하강',
      centerIcon: Snowflake,
      centerBadgeBg: 'bg-sky-950/90 text-sky-200 border-sky-400/40',
    },
    privacy: {
      filmTag: '빛담 원웨이 사생활보호 필름',
      filmDesc: '외부 시선 100% 완벽 차단 (내부 노출 방지)',
      filmTemp: '시선차단 100%',
      filmTempColor: 'text-amber-300 border-amber-400/40 bg-zinc-950/90',
      filmIcon: EyeOff,
      rawTag: '미시공 일반 유리',
      rawDesc: '외부에서 실내 훤히 노출 (사생활 침해 우려)',
      rawTemp: '내부 100% 노출',
      rawTempColor: 'text-rose-300 border-rose-400/40 bg-rose-950/80',
      rawIcon: Sun,
      centerMetric: '외부시선 완벽 차단 & 밖은 선명한 뷰',
      centerIcon: ShieldCheck,
      centerBadgeBg: 'bg-zinc-950/90 text-amber-300 border-amber-500/40',
    },
    warming: {
      filmTag: '빛담 Low-E 단열보온 필름',
      filmDesc: '난방열 방출 방지 & 유리창 냉기 완벽 차단',
      filmTemp: '23.8℃ (훈훈함 유지)',
      filmTempColor: 'text-amber-300 border-amber-400/40 bg-amber-950/80',
      filmIcon: Flame,
      rawTag: '미시공 일반 유리',
      rawDesc: '창문 냉기 유입 & 실내 난방열 40% 유출',
      rawTemp: '15.4℃ (창가 냉기)',
      rawTempColor: 'text-cyan-300 border-cyan-400/40 bg-cyan-950/80',
      rawIcon: Snowflake,
      centerMetric: '난방열 40% 보존 · 온기 유지',
      centerIcon: Flame,
      centerBadgeBg: 'bg-amber-950/90 text-amber-200 border-amber-400/40',
    },
  };

  const current = modeConfigs[mode];

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-3xl bg-[#0b0c10] shadow-2xl border-2 border-zinc-800 cursor-ew-resize group ${aspectRatio} ${className}`}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* 1. BASE BACKGROUND: RIGHT SIDE (Raw Untreated Glass / 미시공 일반유리) */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={baseImage}
          alt={current.rawTag}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover pointer-events-none"
        />

        {/* Dynamic Overlays depending on mode for Right (Uncoated) Side */}
        {mode === 'cooling' && (
          /* Scorching Hot Sun Flare & Reddish Heatwave Haze */
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/25 via-orange-600/30 to-red-500/35 mix-blend-color-burn" />
            <div className="absolute inset-0 bg-amber-400/15 mix-blend-overlay" />
            {/* Blinding Sun Flare Top-Right */}
            <div className="absolute top-2 right-4 w-44 h-44 bg-yellow-300/40 rounded-full blur-3xl" />
          </div>
        )}

        {mode === 'privacy' && (
          /* Completely clear / visible interior look with warning */
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-white/5" />
          </div>
        )}

        {mode === 'warming' && (
          /* Freezing Winter Cold Draft Overlay on raw window */
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/20 via-blue-700/25 to-slate-900/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-cyan-300/10 mix-blend-screen" />
          </div>
        )}
      </div>

      {/* Right Side Info Badge (Raw Glass / 미시공) */}
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1.5 pointer-events-none transition-opacity duration-200"
           style={{ opacity: sliderPosition < 85 ? 1 : 0.2 }}>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-rose-600/90 text-white backdrop-blur-md shadow-lg border border-rose-400/40">
          <current.rawIcon className="w-3.5 h-3.5" />
          {current.rawTag}
        </span>
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xl text-[11px] font-bold backdrop-blur-md border shadow-md ${current.rawTempColor}`}>
          {current.rawTemp}
        </span>
      </div>

      {/* 2. LEFT SLICE: (FILM APPLIED SIDE / 빛담 썬팅 필름 적용) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-10"
        style={{ width: `${sliderPosition}%` }}
      >
        <div
          className="relative h-full"
          style={{ width: containerWidth ? `${containerWidth}px` : (containerRef.current ? `${containerRef.current.clientWidth}px` : '100%') }}
        >
          {/* Same exact base image */}
          <img
            src={baseImage}
            alt={current.filmTag}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* FILM VISUAL SHADER: COOLING MODE (Refreshing, Heat-Blocked, Ultra Crisp & Cool) */}
          {mode === 'cooling' && (
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-150">
              {/* Premium Nano-Ceramic Cool Crisp Cyan/Sky Tint */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0284c7]/25 via-[#0369a1]/20 to-[#0c4a6e]/30 mix-blend-multiply" />
              <div className="absolute inset-0 bg-sky-950/20 backdrop-brightness-[0.95] backdrop-contrast-[1.1]" />
              {/* Polarized Crystal Clarity Glare-Reduction Finish */}
              <div className="absolute inset-0 bg-gradient-to-b from-sky-400/10 via-transparent to-sky-900/20" />
            </div>
          )}

          {/* FILM VISUAL SHADER: PRIVACY MODE (Outdoor Garden, Pool, Green Lawn Reflection & 100% Interior Privacy Mirroring) */}
          {mode === 'privacy' && (
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-150 overflow-hidden">
              {/* 1. Base Deep Titanium Shading to Block 100% of Interior View */}
              <div className="absolute inset-0 bg-[#070a10]/80 z-[1]" />

              {/* 2. Realistic Outdoor Courtyard Reflection (Pool, Green Lawn & Sky) */}
              <img
                src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1600&auto=format&fit=crop"
                alt="사생활보호 외부 마당 잔디밭 수영장 반사 뷰"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center mix-blend-screen opacity-90 scale-105 z-[2]"
              />

              {/* 3. Architectural Glass Mirror Lustre & Sky Glaze Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/70 via-sky-950/30 to-blue-900/40 mix-blend-multiply z-[3]" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/30 via-transparent to-sky-400/20 mix-blend-overlay z-[4]" />

              {/* 4. One-Way Architectural Mirror Reflection Sheen Highlight */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-200/25 via-transparent to-black/30 z-[5]" />

              {/* 5. Visual Privacy Guarantee Badge */}
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-[6] opacity-90 flex flex-col items-center gap-1.5 text-center">
                <div className="w-11 h-11 rounded-2xl bg-zinc-950/80 border border-amber-400/70 flex items-center justify-center text-amber-400 shadow-2xl backdrop-blur-md">
                  <EyeOff className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-black text-amber-300 bg-zinc-950/90 px-3 py-1 rounded-full border border-amber-400/40 whitespace-nowrap shadow-xl">
                  외부 정원·수영장 반사 (실내 100% 완벽 보호)
                </span>
              </div>
            </div>
          )}

          {/* FILM VISUAL SHADER: WARMING MODE (Winter Low-E Cozy Warmth Retention) */}
          {mode === 'warming' && (
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-150">
              {/* Cozy Radiant Warm Amber & Low-E Heat Retaining Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/30 via-orange-500/25 to-amber-700/30 mix-blend-color-burn" />
              <div className="absolute inset-0 bg-amber-950/20 backdrop-brightness-[1.03] backdrop-contrast-[1.05]" />
              {/* Warm radiant glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-amber-300/15" />
            </div>
          )}
        </div>
      </div>

      {/* Left Side Info Badge (Film Applied / 빛담 썬팅) */}
      <div
        className="absolute top-4 left-4 z-20 flex flex-col items-start gap-1.5 pointer-events-none transition-opacity duration-200"
        style={{ opacity: sliderPosition > 15 ? 1 : 0.2 }}
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-black backdrop-blur-md shadow-lg border border-amber-300/40">
          <current.filmIcon className="w-3.5 h-3.5 text-black" />
          {current.filmTag}
        </span>
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xl text-[11px] font-bold backdrop-blur-md border shadow-md ${current.filmTempColor}`}>
          <CheckCircle2 className="w-3 h-3" />
          {current.filmTemp}
        </span>
      </div>

      {/* Center Key Metric Pill */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none w-max max-w-[90%]">
        <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-2xl border text-xs font-black tracking-tight ${current.centerBadgeBg}`}>
          <current.centerIcon className="w-4 h-4 shrink-0 text-amber-400" />
          <span>{current.centerMetric}</span>
        </div>
      </div>

      {/* Vertical Slider Bar and Drag Controller */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 z-30 pointer-events-none shadow-[0_0_15px_rgba(245,158,11,0.8)]"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Glow halo */}
        <div className="absolute -inset-1 bg-amber-400/30 blur-sm pointer-events-none" />

        {/* Drag Pill */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-zinc-950 text-amber-400 shadow-2xl flex items-center justify-center border-2 border-amber-400 transition-transform group-hover:scale-110">
          <div className="flex items-center gap-0.5 text-xs font-black tracking-tighter text-amber-400">
            <span className="text-[10px]">◀</span>
            <span className="text-[9px] text-zinc-500 font-normal">|</span>
            <span className="text-[10px]">▶</span>
          </div>
        </div>

        {/* Top/Bottom Micro Labels */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase shadow">
          FILM
        </div>
      </div>
    </div>
  );
};

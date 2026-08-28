import React, { useState } from 'react';
import { QuickEstimateState, FilmSpec } from '../types';
import { FILM_PRODUCTS } from '../data/mockData';
import { Calculator, Sparkles, TrendingDown, Sun, ShieldCheck, ArrowRight, Zap, CheckCircle2, Eye, Palette, Layers, Award } from 'lucide-react';

interface QuickEstimatorProps {
  onApplyEstimateToConsultation: (estimateSummary: string) => void;
}

export const QuickEstimator: React.FC<QuickEstimatorProps> = ({ onApplyEstimateToConsultation }) => {
  const [params, setParams] = useState<QuickEstimateState>({
    buildingType: '아파트 / 주거공간',
    pyeongSize: 34,
    windowExposure: 'south',
    primaryGoal: 'heat_reduction',
    preferredGrade: 'flagship',
  });

  const buildingTypes = ['아파트 / 주거공간', '단독주택 / 타운하우스', '상가 / 카페', '오피스 / 사옥', '기타 관공서'];

  const goals = [
    { id: 'heat_reduction', label: '🔥 여름철 찜통열기 차단', tag: '열차단 98%' },
    { id: 'privacy', label: '🔒 외부 시선차단 (사생활)', tag: 'One-Way 미러' },
    { id: 'glare', label: '☀️ 눈부심 완화 & 맑은 조망', tag: '선명한 뷰' },
    { id: 'winter_insulation', label: '❄️ 겨울철 단열 & 결로방지', tag: '사계절 Low-E' },
    { id: 'safety', label: '🛡️ 초고투명 & 전파간섭 0%', tag: '비금속 세라믹' },
  ];

  // Dynamic film matcher referring strictly to BITDAM official lineup
  const getMatchedFilm = (): FilmSpec => {
    if (params.primaryGoal === 'privacy') {
      if (params.preferredGrade === 'flagship') {
        return FILM_PRODUCTS.find((f) => f.id === 'film-bd-st-2598') || FILM_PRODUCTS[0];
      }
      return FILM_PRODUCTS.find((f) => f.id === 'film-bd-ap-35') || FILM_PRODUCTS[2];
    }
    if (params.primaryGoal === 'winter_insulation') {
      if (params.preferredGrade === 'flagship') {
        return FILM_PRODUCTS.find((f) => f.id === 'film-bd-st-2598') || FILM_PRODUCTS[0];
      }
      return FILM_PRODUCTS.find((f) => f.id === 'film-bd-ap-35') || FILM_PRODUCTS[2];
    }
    if (params.primaryGoal === 'safety') {
      // Non-metal pure ceramic or high transparency
      return FILM_PRODUCTS.find((f) => f.id === 'film-bd-ir-series-95') || FILM_PRODUCTS[4];
    }
    if (params.primaryGoal === 'glare') {
      if (params.preferredGrade === 'standard') {
        return FILM_PRODUCTS.find((f) => f.id === 'film-bd-ir-series-95') || FILM_PRODUCTS[4];
      }
      return FILM_PRODUCTS.find((f) => f.id === 'film-bd-st-2598') || FILM_PRODUCTS[0];
    }

    // By preferred grade
    if (params.preferredGrade === 'flagship') {
      return FILM_PRODUCTS.find((f) => f.id === 'film-bd-st-2598') || FILM_PRODUCTS[0];
    }
    if (params.preferredGrade === 'premium') {
      return FILM_PRODUCTS.find((f) => f.id === 'film-bd-ap-35') || FILM_PRODUCTS[2];
    }
    return FILM_PRODUCTS.find((f) => f.id === 'film-bd-ir-series-95') || FILM_PRODUCTS[4];
  };

  const matchedFilm = getMatchedFilm();

  // Dynamic calculations reflecting: 최고사양 ~40만원대, 고사양 ~30만원대, 세라믹 ~20만원대 절약 (34평 기준)
  const calculateResult = () => {
    let baseAnnualSaving = 220000; // 세라믹 기본 (약 20만원대)
    if (params.preferredGrade === 'flagship') {
      baseAnnualSaving = 430000; // 최고사양 (약 40만원대)
    } else if (params.preferredGrade === 'premium') {
      baseAnnualSaving = 320000; // 고사양 (약 30만원대)
    } else {
      baseAnnualSaving = 220000; // 세라믹 (약 20만원대)
    }

    // 평수 비례 계산
    const pyeongFactor = params.pyeongSize / 34;
    let computedSavings = Math.round(baseAnnualSaving * pyeongFactor);

    // 남향/서향 일조량 가중치
    if (params.windowExposure === 'south' || params.windowExposure === 'west') {
      computedSavings = Math.round(computedSavings * 1.05);
    }

    const tempDrop = params.preferredGrade === 'flagship' ? '14.5℃' : params.preferredGrade === 'premium' ? '12.8℃' : '10.5℃';
    const durationHours = params.pyeongSize <= 35 ? '약 3~4시간 (마스터 2인 1조)' : params.pyeongSize <= 60 ? '약 4~6시간' : '약 1일 (마스터 4인 전담)';

    const gradeSavingTitle = params.preferredGrade === 'flagship'
      ? '최고사양 약 40만원대 절약'
      : params.preferredGrade === 'premium'
        ? '고사양 약 30만원대 절약'
        : '세라믹 약 20만원대 절약';

    return {
      savingsFormatted: computedSavings.toLocaleString('ko-KR') + '원 / 년',
      gradeSavingTitle,
      tempDrop,
      durationHours,
    };
  };

  const result = calculateResult();

  const handleApplyToBooking = () => {
    const summary = `[AI 추천 견적] 건물: ${params.buildingType} (${params.pyeongSize}평) / 방향: ${params.windowExposure} / 목적: ${params.primaryGoal} / 추천라인업: ${matchedFilm.seriesName} (${matchedFilm.colorTone}, IRR ${matchedFilm.irr}%, TSER ${matchedFilm.tser}%) / 예상절감액: ${result.savingsFormatted}`;
    onApplyEstimateToConsultation(summary);
  };

  return (
    <section id="estimator" className="py-24 bg-[#0A0A0B] text-zinc-100 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-300 text-xs font-black border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI 맞춤 필름 추천 & 빛담 정품 라인업 매칭</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            공간 조건에 가장 완벽한 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
              빛담 정품 라인업 추천 & 에너지 진단기
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            건물 형태, 평수, 창문 방향 및 최우선 고민을 선택하시면 <strong>빛담의 4대 정품 라인업(멀티스퍼터, 증착스퍼터, 나노세라믹, 디자인)</strong> 중 가장 적합한 모델과 절감 효과를 1:1로 매칭해 드립니다.
          </p>
        </div>

        {/* Two-Column Interactive Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Controls */}
          <div className="lg:col-span-7 bg-[#121214] border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-6 shadow-2xl">
            {/* 1. Building Type */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center text-[10px] font-black">1</span>
                <span>건물 형태 선택</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {buildingTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setParams({ ...params, buildingType: type })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-left truncate cursor-pointer ${
                      params.buildingType === type
                        ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                        : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Pyeong Size Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center text-[10px] font-black">2</span>
                  <span>공급 / 전용 평수 (면적)</span>
                </label>
                <div className="text-base font-extrabold text-amber-400 bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800">
                  {params.pyeongSize} 평 <span className="text-xs font-normal text-zinc-500">({Math.round(params.pyeongSize * 3.3)}㎡)</span>
                </div>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                step="1"
                value={params.pyeongSize}
                onChange={(e) => setParams({ ...params, pyeongSize: Number(e.target.value) })}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>10평 (원룸/소형)</span>
                <span>34평 (국민평형)</span>
                <span>55평 (대형)</span>
                <span>100평+ (펜트/사옥)</span>
              </div>
            </div>

            {/* 3. Primary Goal */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center text-[10px] font-black">3</span>
                <span>가장 중요한 시공 목적</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setParams({ ...params, primaryGoal: g.id as any })}
                    className={`py-3 px-3.5 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                      params.primaryGoal === g.id
                        ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                        : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                    }`}
                  >
                    <span>{g.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${params.primaryGoal === g.id ? 'bg-amber-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                      {g.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Film Grade Preference */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center text-[10px] font-black">4</span>
                  <span>빛담 필름 테크놀로지 등급 선택</span>
                </label>
                <span className="text-[10px] text-zinc-400">
                  순수 열반사 vs 사계절 증착 vs 비금속 세라믹
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  {
                    id: 'flagship',
                    title: 'BD ST 시리즈',
                    techMethod: '멀티레이어 스퍼터 (최고사양)',
                    badge: '최고 등급',
                    badgeColor: 'bg-amber-400 text-black font-black',
                    highlight: '귀금속 원자 다층 증착 열반사',
                    specSummary: 'IRR 98% / TSER 78%',
                  },
                  {
                    id: 'premium',
                    title: 'BD AP 시리즈',
                    techMethod: '증착스퍼터 Low-E (고사양)',
                    badge: '사계절 단열',
                    badgeColor: 'bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold',
                    highlight: '진공 고온 금속증착 스퍼터',
                    specSummary: 'IRR 89% / TSER 67%',
                  },
                  {
                    id: 'standard',
                    title: 'BD IR 시리즈',
                    techMethod: '순수 나노세라믹 (세라믹)',
                    badge: '비금속 무반사',
                    badgeColor: 'bg-zinc-800 text-zinc-300 font-bold',
                    highlight: '초미립자 나노세라믹 열흡수',
                    specSummary: 'IRR 95% / 전파간섭 0%',
                  },
                ].map((gr) => (
                  <button
                    key={gr.id}
                    onClick={() => setParams({ ...params, preferredGrade: gr.id as any })}
                    className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer relative flex flex-col justify-between border ${
                      params.preferredGrade === gr.id
                        ? 'bg-gradient-to-b from-[#22211e] to-[#171615] border-amber-500 text-white shadow-xl shadow-amber-500/15 ring-1 ring-amber-500/50'
                        : 'bg-zinc-900/90 text-zinc-400 hover:bg-zinc-800 hover:text-white border-zinc-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-xs font-extrabold text-white leading-tight">{gr.title}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded shrink-0 ${gr.badgeColor}`}>
                          {gr.badge}
                        </span>
                      </div>
                      <div className={`text-xs font-black mb-1.5 ${params.preferredGrade === gr.id ? 'text-amber-400' : 'text-zinc-300'}`}>
                        {gr.techMethod}
                      </div>
                      <div className="text-[10px] text-zinc-400 leading-tight mb-2">
                        {gr.highlight}
                      </div>
                    </div>
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-400">
                      <span>스펙:</span>
                      <strong className={params.preferredGrade === gr.id ? 'text-amber-300' : 'text-zinc-300'}>{gr.specSummary}</strong>
                    </div>
                  </button>
                ))}
              </div>

              {/* Dynamic Mechanism Explainer for Selected Grade */}
              <div className="p-3.5 bg-zinc-900/90 rounded-2xl border border-zinc-800 text-xs space-y-1.5 animate-fade-in">
                {params.preferredGrade === 'flagship' && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>[플래그십] BD ST 멀티레이어 마그네트론 스퍼터 열반사 메커니즘</span>
                    </div>
                    <p className="text-[11px] text-zinc-300 leading-relaxed">
                      귀금속 원자(금, 은, 티타늄)를 플라즈마로 다층 코팅하여, 태양 복사열을 유리에 머금지 않고 <strong>실외로 즉시 튕겨내는 최상위 순수 열반사 방식</strong>입니다. 유리 열파손 위험 0%와 극대화된 사계절 에너지 절감을 선사합니다.
                    </p>
                    <div className="text-[10px] text-amber-300/90 font-medium flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-400" />
                      <span>빛담 매칭 모델: <strong>BD ST 2598 (하이엔드 열반사)</strong>, <strong>BD ST 5090 (고투명 내추럴)</strong></span>
                    </div>
                  </div>
                )}

                {params.preferredGrade === 'premium' && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-sky-400 font-bold text-xs">
                      <Sun className="w-3.5 h-3.5" />
                      <span>[프리미엄] BD AP 진공 금속증착 스퍼터 사계절 Low-E 메커니즘</span>
                    </div>
                    <p className="text-[11px] text-zinc-300 leading-relaxed">
                      진공 고온 증착 및 금속 스퍼터링 공법으로 <strong>태양 일사열을 실외로 반사하고 실내 난방열을 보호하는 사계절 단열 방식</strong>입니다. 우수한 가성비와 겨울철 창가 결로 곰팡이 완화 및 적절한 시선차단 효과를 발휘합니다.
                    </p>
                    <div className="text-[10px] text-sky-300/90 font-medium flex items-center gap-1">
                      <Award className="w-3 h-3 text-sky-400" />
                      <span>빛담 매칭 모델: <strong>BD AP35 (사계절 Low-E 프라이버시)</strong>, <strong>BD AP45 (사계절 Low-E 클리어)</strong></span>
                    </div>
                  </div>
                )}

                {params.preferredGrade === 'standard' && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>[스탠다드] BD IR 초미립자 비금속 나노세라믹 열흡수 메커니즘</span>
                    </div>
                    <p className="text-[11px] text-zinc-300 leading-relaxed">
                      초미립자 비금속 나노 세라믹 입자가 <strong>적외선(열)을 흡수하여 실내 유입을 방지하는 실속형 방식</strong>입니다. 금속 성분이 없어 스마트홈, Wi-Fi, GPS 등 전파 간섭이 0%이며 거울 반사 왜곡 없는 편안한 뷰를 제공합니다.
                    </p>
                    <div className="text-[10px] text-emerald-300/90 font-medium flex items-center gap-1">
                      <Award className="w-3 h-3 text-emerald-400" />
                      <span>빛담 매칭 모델: <strong>BD IR 시리즈 95 (비금속 무반사 세라믹)</strong>, <strong>BD IR 시리즈 70 (초고투명 클리어)</strong></span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Instant Live Output Dashboard Matching BITDAM Official Model */}
          <div className="lg:col-span-5 bg-[#121214] border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-5">
            <div className="flex items-center justify-between pb-3.5 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">빛담 맞춤 정품 라인업 매칭</h3>
              </div>
              <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                10년 정품 전자보증
              </span>
            </div>

            {/* Matched Film Model Hero Card with Real Window Simulation Image */}
            <div className="bg-gradient-to-b from-[#18191c] to-[#121214] rounded-2xl overflow-hidden border border-amber-500/40 shadow-lg group">
              {matchedFilm.previewImage && (
                <div className="relative h-40 w-full overflow-hidden bg-zinc-900">
                  <img
                    src={matchedFilm.previewImage}
                    alt={`${matchedFilm.seriesName} 실내 창문 시공 연출`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/30 to-transparent" />
                  
                  <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-amber-300">
                      {matchedFilm.colorTone}
                    </span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-500 text-black shadow-md">
                      {matchedFilm.gradeBadge}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-3 text-[10px] text-amber-300 font-bold flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>실제 실내 창문 시공 연출 뷰</span>
                  </div>
                </div>
              )}

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider">
                    빛담 공식 추천 정품 모델
                  </span>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    두께: {matchedFilm.thickness.split(' ')[0]} {matchedFilm.thickness.split(' ')[1]}
                  </span>
                </div>

                <div className="text-lg font-black text-white leading-snug">
                  {matchedFilm.seriesName}
                </div>

                {matchedFilm.interiorEffect && (
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 leading-relaxed flex items-start gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{matchedFilm.interiorEffect}</span>
                  </div>
                )}

                {/* 4-Spec Matrix for Matched Film */}
                <div className="grid grid-cols-4 gap-1.5 pt-2 text-center bg-black/40 p-2.5 rounded-xl border border-white/5">
                  <div>
                    <span className="text-[9px] text-zinc-400 block">열차단(IRR)</span>
                    <strong className="text-sm font-black text-amber-400">{matchedFilm.irr}%</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-400 block">총에너지(TSER)</span>
                    <strong className="text-sm font-black text-emerald-400">{matchedFilm.tser}%</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-400 block">자외선차단</span>
                    <strong className="text-sm font-black text-sky-400">{matchedFilm.uvr}%</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-400 block">가시광투과</span>
                    <strong className="text-sm font-black text-purple-400">{matchedFilm.vlt}%</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-zinc-900/80 p-3.5 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-transparent">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-300 font-bold block">1년 예상 냉난방비 절감액</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-black bg-amber-400 text-black">
                    {result.gradeSavingTitle}
                  </span>
                </div>
                <div className="text-base font-extrabold text-amber-400 mt-1">
                  약 {result.savingsFormatted}
                </div>
                <span className="text-[10px] text-zinc-400">34평 기준 (냉난방비 최대 30% 절약)</span>
              </div>

              <div className="bg-zinc-900/80 p-3.5 rounded-2xl border border-zinc-800/80">
                <span className="text-[10px] text-zinc-400 font-medium block">창가 체감온도 하강치</span>
                <div className="text-base font-extrabold text-sky-400 mt-1">
                  {result.tempDrop} 하강
                </div>
                <span className="text-[10px] text-zinc-500">FLIR 열화상 검증 기준</span>
              </div>
            </div>

            {/* Benefit Checklist */}
            <div className="space-y-1.5 text-xs text-zinc-300 pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-[11px]">빛담 본사 10년 정품 전자보증서 100% 즉시 발급</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-[11px]">방문 실측 시 실제 <strong>{matchedFilm.seriesName.split(' ')[0]} {matchedFilm.seriesName.split(' ')[1]}</strong> 샘플 및 열차단 램프 시연</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-[11px]">수도권 및 전국 무료 출장 방문 (출장비 0원)</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleApplyToBooking}
              className="w-full py-3.5 px-5 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xl shadow-amber-500/25 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-98"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>이 추천 모델로 무료 방문 실측 & 견적 신청</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

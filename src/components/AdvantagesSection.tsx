import React from 'react';
import { CORE_ADVANTAGES } from '../data/mockData';
import { ShieldCheck, Sun, EyeOff, ShieldAlert, Sparkles, Award, TrendingDown, Bug, Droplets } from 'lucide-react';

interface AdvantagesSectionProps {
  onOpenConsultation: () => void;
}

export const AdvantagesSection: React.FC<AdvantagesSectionProps> = ({ onOpenConsultation }) => {
  const sevenKeyBenefits = [
    {
      icon: TrendingDown,
      title: '1. 냉난방비 최대 30% 절감',
      tag: '사계절 에너지 세이빙',
      desc: '여름철 뜨거운 외부 복사열을 최대 97% 반사하고, 겨울철 실내 난방열이 창문으로 빠져나가는 열손실을 막아 관리비를 대폭 절감합니다.',
      accent: 'amber',
    },
    {
      icon: Sun,
      title: '2. 유해 자외선(UV) 99.9% 차단',
      tag: '가구 탈색 & 피부 보호',
      desc: '피부 노화와 기미의 주원인이자 고급 마루, 명품 원목가구, 가죽 소파의 변색·탈색을 유발하는 자외선 A/B 파장을 100% 가깝게 원천 차단합니다.',
      accent: 'sky',
    },
    {
      icon: Sparkles,
      title: '3. 눈부심 억제 & 선명한 조망',
      tag: '편안하고 맑은 뷰',
      desc: '햇빛의 과도한 가시광선 조도를 균일하게 조절하여 눈의 피로를 줄이고, TV·모니터 반사광을 없애며 바깥 풍경의 원색을 선명하게 즐깁니다.',
      accent: 'emerald',
    },
    {
      icon: EyeOff,
      title: '4. 외부 시선차단 (사생활 보호)',
      tag: 'One-Way 미러 효과',
      desc: '낮 시간대 밖에서는 실내가 보이지 않는 미러 반사 효과로, 답답한 커튼이나 블라인드를 걷고도 완벽한 프라이버시와 탁 트인 개방감을 누립니다.',
      accent: 'indigo',
    },
    {
      icon: ShieldAlert,
      title: '5. 태풍·지진 비산방지 (안전 강화)',
      tag: '유리 파손 방범 보호',
      desc: '태풍 강풍, 지진, 외부 충격으로 인한 유리 파손 시 날카로운 파편이 사방으로 튀는 비산 현상을 완벽히 억제해 가족과 자산을 지킵니다.',
      accent: 'rose',
    },
    {
      icon: Bug,
      title: '6. 야간 해충(벌레) 유입 차단',
      tag: '방충 & 쾌적한 야간 환경',
      desc: '날벌레와 나방 등 비래 해충이 반응하고 모여드는 특정 주광성 자외선·청색광 파장을 차단하여, 야간 창문 주변 벌레 꼬임을 획기적으로 줄입니다.',
      accent: 'teal',
    },
    {
      icon: Droplets,
      title: '7. 겨울철 결로 완화 & 곰팡이 방지',
      tag: '습기 억제 & 위생 개선',
      desc: '유리창 안팎의 극심한 온도 편차를 줄여 겨울철 이슬 맺힘(결로)을 대폭 완화하고, 창틀 곰팡이와 벽지 부패를 방지해 실내 공기를 쾌적하게 유지합니다.',
      accent: 'blue',
    },
  ];

  const brandPartners = [
    { name: '3M Architectural', logoText: '3M (쓰리엠)', desc: '200겹 다층 광학 박막 글로벌 특허' },
    { name: 'NEXFIL Optical', logoText: 'NEXFIL (넥스필)', desc: '세계 60개국 수출 1위 K-필름 기술력' },
    { name: 'SOLARMATE Crystal', logoText: 'SOLARMATE (솔라메이트)', desc: '국내 건축 단열·시선차단 전문 프리미엄' },
  ];

  return (
    <section id="advantages" className="py-20 bg-[#0A0A0B] relative overflow-hidden text-zinc-200">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>빛담만의 4대 시공 원칙</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            단 1%의 타협도 없는 <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
              빛담 프리미엄 시공 퀄리티
            </span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            저가 염색 필름과 비숙련 시공은 1년 만에 기포와 탈색을 유발합니다. 
            빛담은 정품 자재와 10년 경력 마스터의 직영 시공만을 고집합니다.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {CORE_ADVANTAGES.map((adv) => (
            <div
              key={adv.id}
              className="group relative bg-[#121214] rounded-2xl p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/5 hover:border-amber-500/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-zinc-700 group-hover:text-amber-400 transition-colors">
                    {adv.number}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {adv.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-amber-300 transition-colors leading-snug">
                  {adv.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {adv.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-medium">검증 스펙</span>
                <span className="text-sm font-extrabold text-amber-400">{adv.stat}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 7 Core Effects of Window Film Banner */}
        <div className="bg-[#121214] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-zinc-800">
          <div className="relative z-10">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                WHY ARCHITECTURAL FILM?
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-3">
                건축용 단열필름 시공이 선사하는 7대 핵심 효과
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base">
                단 한 번의 시공으로 사계절 냉난방비 절감부터 자외선·해충 차단, 결로 완화, 안전 방범까지 완벽한 공간 솔루션을 완성하세요.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {sevenKeyBenefits.map((benefit, idx) => {
                const IconComp = benefit.icon;
                return (
                  <div
                    key={idx}
                    className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 hover:border-amber-500/40 hover:bg-zinc-900 transition-all shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white leading-snug">{benefit.title}</h4>
                          <span className="text-[11px] font-semibold text-amber-400">{benefit.tag}</span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                );
              })}

              {/* Free Consultation Card inside the grid (8th item completing the 4x2 grid) */}
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 flex flex-col justify-between text-white shadow-xl">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold bg-black/30 text-white mb-2">
                    빛담 전문 맞춤 진단
                  </span>
                  <h4 className="text-base font-extrabold leading-snug mb-1.5 text-white">
                    우리 공간에 딱 맞는 <br />최적 필름은 무엇일까요?
                  </h4>
                  <p className="text-[11px] text-white/90 leading-relaxed">
                    창문 방향(남향/서향), 층수, 결로·벌레 고민에 맞춘 정품 필름을 추천해 드립니다.
                  </p>
                </div>
                <button
                  onClick={onOpenConsultation}
                  className="mt-4 w-full py-2 px-3 bg-zinc-950 hover:bg-black text-amber-300 border border-amber-400/40 rounded-xl text-xs font-bold shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>맞춤 필름 무료 진단 신청</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Authentic Brand Trust Ribbon */}
        <div className="mt-16 pt-12 border-t border-zinc-800/80">
          <p className="text-center text-xs font-bold text-zinc-500 uppercase tracking-wider mb-6">
            공식 정품 공급 파트너 브랜드 (100% 정품 바코드 & 모바일 보증서 발급)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {brandPartners.map((bp, i) => (
              <div
                key={i}
                className="bg-[#121214] rounded-xl p-5 border border-white/5 text-center hover:border-amber-500/40 transition-all shadow-md flex flex-col items-center justify-center"
              >
                <div className="text-lg font-black text-zinc-100 tracking-tight">{bp.logoText}</div>
                <div className="text-xs font-medium text-zinc-400 mt-1">{bp.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

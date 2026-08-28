import React from 'react';
import { CUSTOMER_REVIEWS } from '../data/mockData';
import { Star, CheckCircle, ShieldCheck, MapPin, Sparkles, MessageSquareQuote, ArrowRight, ExternalLink, Flame } from 'lucide-react';

interface ReviewsSectionProps {
  onOpenAllReviews?: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onOpenAllReviews }) => {
  return (
    <section id="reviews" className="py-24 bg-[#0A0A0B] relative text-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold">
            <MessageSquareQuote className="w-3.5 h-3.5 text-amber-400" />
            <span>실제 고객 리얼 후기</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            빛담을 선택하신 고객님들의 <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
              솔직한 100% 실측 시공 리뷰
            </span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            아파트 입주민, 카페 대표님, 오피스 시설 담당자분들이 직접 경험한 놀라운 실내 온도 변화를 확인해보세요.
          </p>

          {/* Rating Summary Pill - Interactive Clickable to Open All Reviews */}
          <div className="pt-2 flex flex-col items-center">
            <button
              type="button"
              onClick={onOpenAllReviews}
              className="group inline-flex items-center gap-3 sm:gap-4 p-3 sm:px-5 bg-[#121214] hover:bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-amber-500/60 shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
              title="클릭 시 전국 누적 리뷰 전체보기 새창이 열립니다"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
                ))}
              </div>
              <div className="text-xs sm:text-sm font-bold text-zinc-100">
                평균 만족도 <span className="text-amber-400 font-extrabold text-sm sm:text-base">4.98 / 5.0</span>
              </div>
              <span className="text-xs text-zinc-600">|</span>
              <div className="text-xs text-zinc-300 font-semibold flex items-center gap-1.5">
                <span>누적 자필 리뷰 <strong className="text-amber-400 font-bold">1,480+</strong> 건</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-black group-hover:bg-amber-400 transition-colors">
                  전체보기
                  <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </div>
            </button>
            <span className="text-[11px] text-zinc-500 mt-2">
              💡 전국 17개 시·도 시공 현장의 생생한 후기가 일주일 간격으로 실시간 누적 업데이트됩니다.
            </span>
          </div>
        </div>

        {/* Reviews 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#121214] rounded-3xl p-7 border border-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:border-amber-500/40"
            >
              <div className="space-y-4">
                {/* Header: Author & Verified Badge */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-white text-base">{rev.author}</span>
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <CheckCircle className="w-3 h-3" />
                        실시공인증
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-zinc-400 mt-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{rev.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Film Mechanism Badge: [열반사] vs [열흡수] */}
                <div className="p-3 bg-zinc-900/90 rounded-2xl border border-zinc-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {rev.filmType === '열반사' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>열반사 방식</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>열흡수 방식</span>
                      </span>
                    )}
                    <span className="text-xs font-medium text-zinc-300">
                      {rev.filmApplied}
                    </span>
                  </div>
                  <span className="text-zinc-500 text-[10px]">{rev.date}</span>
                </div>

                {/* Review Text */}
                <div className="space-y-2">
                  <h4 className="font-bold text-zinc-100 text-sm leading-snug">
                    "{rev.title}"
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {rev.content}
                  </p>
                </div>

                {/* Photos */}
                {rev.photos.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {rev.photos.map((p, idx) => (
                      <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                        <img
                          src={p}
                          alt="고객 시공 인증샷"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Metrics Footer */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80 grid grid-cols-3 gap-1 text-center bg-zinc-900/90 p-2.5 rounded-xl border border-zinc-800">
                <div>
                  <span className="text-[10px] text-zinc-500 block">온도 변화</span>
                  <strong className="text-xs font-bold text-amber-400">{rev.metrics.tempDrop}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">비용 절감</span>
                  <strong className="text-xs font-bold text-sky-400">{rev.metrics.billSaving}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">조망/시야</span>
                  <strong className="text-xs font-bold text-emerald-400">{rev.metrics.viewClarity}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to open full reviews window */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onOpenAllReviews}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-zinc-900 hover:bg-amber-500 text-zinc-200 hover:text-black border border-zinc-800 hover:border-amber-500 text-sm font-black transition-all duration-300 shadow-xl cursor-pointer group"
          >
            <span>전국 누적 실시간 시공 후기 전체보기 (1,480+ 건)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};


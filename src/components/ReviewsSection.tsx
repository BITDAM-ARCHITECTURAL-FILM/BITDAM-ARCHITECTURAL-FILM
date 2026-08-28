import React from 'react';
import { CUSTOMER_REVIEWS } from '../data/mockData';
import { Star, CheckCircle, ShieldCheck, MapPin, Sparkles, MessageSquareQuote, ArrowRight, ExternalLink, Flame } from 'lucide-react';

interface ReviewsSectionProps {
  onOpenAllReviews?: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onOpenAllReviews }) => {
  return (
    <section id="reviews" className="py-24 bg-white relative text-zinc-800 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shadow-sm">
            <MessageSquareQuote className="w-3.5 h-3.5 text-amber-600" />
            <span>실제 고객 리얼 후기</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            빛담을 선택하신 고객님들의 <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500">
              솔직한 100% 실측 시공 리뷰
            </span>
          </h2>

          {/* Rating Summary Pill - Interactive Clickable to Open All Reviews */}
          <div className="pt-2 flex flex-col items-center">
            <button
              type="button"
              onClick={onOpenAllReviews}
              className="group inline-flex items-center gap-3 sm:gap-4 p-3 sm:px-5 bg-zinc-50 hover:bg-zinc-100 rounded-2xl border border-zinc-200 hover:border-amber-500 shadow-sm transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
              title="클릭 시 전국 누적 리뷰 전체보기 새창이 열립니다"
            >
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
                ))}
              </div>
              <div className="text-xs sm:text-sm font-bold text-zinc-900">
                평균 만족도 <span className="text-amber-600 font-extrabold text-sm sm:text-base">4.98 / 5.0</span>
              </div>
              <span className="text-xs text-zinc-300">|</span>
              <div className="text-xs text-zinc-700 font-semibold flex items-center gap-1.5">
                <span>누적 자필 리뷰 <strong className="text-amber-600 font-bold">1,480+</strong> 건</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white group-hover:bg-amber-600 transition-colors shadow-sm">
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
              className="bg-zinc-50 rounded-3xl p-7 border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-amber-500/50"
            >
              <div className="space-y-4">
                {/* Header: Author & Verified Badge */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-zinc-900 text-base">{rev.author}</span>
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        실시공인증
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-zinc-500 mt-1">
                      <MapPin className="w-3 h-3 text-amber-600" />
                      <span>{rev.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Film Mechanism Badge: [열반사] vs [열흡수] */}
                <div className="p-3 bg-white rounded-2xl border border-zinc-200 flex flex-wrap items-center justify-between gap-2 shadow-xs">
                  <div className="flex items-center gap-2">
                    {rev.filmType === '열반사' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>열반사 방식</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>열흡수 방식</span>
                      </span>
                    )}
                    <span className="text-xs font-medium text-zinc-700">
                      {rev.filmApplied}
                    </span>
                  </div>
                  <span className="text-zinc-400 text-[10px]">{rev.date}</span>
                </div>

                {/* Review Text */}
                <div className="space-y-2">
                  <h4 className="font-bold text-zinc-900 text-sm leading-snug">
                    "{rev.title}"
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {rev.content}
                  </p>
                </div>

                {/* Photos */}
                {rev.photos.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {rev.photos.map((p, idx) => (
                      <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200">
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
              <div className="mt-6 pt-4 border-t border-zinc-200 grid grid-cols-3 gap-1 text-center bg-white p-2.5 rounded-xl border border-zinc-200 shadow-xs">
                <div>
                  <span className="text-[10px] text-zinc-500 block">온도 변화</span>
                  <strong className="text-xs font-bold text-amber-600">{rev.metrics.tempDrop}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">비용 절감</span>
                  <strong className="text-xs font-bold text-sky-600">{rev.metrics.billSaving}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">조망/시야</span>
                  <strong className="text-xs font-bold text-emerald-600">{rev.metrics.viewClarity}</strong>
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
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-zinc-900 hover:bg-amber-500 text-white hover:text-black border border-zinc-800 hover:border-amber-500 text-sm font-black transition-all duration-300 shadow-xl cursor-pointer group"
          >
            <span>전국 누적 실시간 시공 후기 전체보기 (1,480+ 건)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

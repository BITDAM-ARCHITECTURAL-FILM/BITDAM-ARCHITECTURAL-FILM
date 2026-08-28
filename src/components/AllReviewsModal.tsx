import React, { useState, useMemo } from 'react';
import { getNationwideReviews, NationwideReviewItem } from '../data/nationwideReviews';
import {
  X,
  Star,
  CheckCircle,
  MapPin,
  Sparkles,
  ShieldCheck,
  Search,
  Filter,
  Flame,
  Clock,
  ArrowRight,
  Send,
  Building,
  RotateCcw,
} from 'lucide-react';

interface AllReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectReviewForConsultation: (review: NationwideReviewItem) => void;
}

export const AllReviewsModal: React.FC<AllReviewsModalProps> = ({
  isOpen,
  onClose,
  onSelectReviewForConsultation,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedPurpose, setSelectedPurpose] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'latest' | 'temp' | 'rating'>('latest');

  // Load dynamically calculated nationwide reviews with 7-day interval
  const reviews = useMemo(() => getNationwideReviews(), []);

  // Filter & Search Logic
  const filteredReviews = useMemo(() => {
    return reviews
      .filter((rev) => {
        // Region filter
        if (selectedRegion !== 'all' && rev.regionCategory !== selectedRegion) {
          return false;
        }
        // Purpose filter
        if (selectedPurpose !== 'all' && rev.purposeTag !== selectedPurpose) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchLocation = rev.location.toLowerCase().includes(query);
          const matchAuthor = rev.author.toLowerCase().includes(query);
          const matchTitle = rev.title.toLowerCase().includes(query);
          const matchContent = rev.content.toLowerCase().includes(query);
          const matchFilm = rev.filmApplied.toLowerCase().includes(query);
          const matchHousing = rev.housingType.toLowerCase().includes(query);
          if (!matchLocation && !matchAuthor && !matchTitle && !matchContent && !matchFilm && !matchHousing) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'latest') {
          return a.weeksAgo - b.weeksAgo; // 0 (이번 주) -> 1 (1주 전) -> 2 (2주 전)
        }
        if (sortBy === 'temp') {
          const tempA = parseFloat(a.metrics.tempDrop) || 0;
          const tempB = parseFloat(b.metrics.tempDrop) || 0;
          return tempB - tempA;
        }
        return b.rating - a.rating;
      });
  }, [reviews, selectedRegion, selectedPurpose, searchQuery, sortBy]);

  if (!isOpen) return null;

  const regionTabs = [
    { id: 'all', label: '전국 전체' },
    { id: '수도권', label: '서울 / 경기 / 인천' },
    { id: '영남권', label: '부산 / 대구 / 울산 / 경남' },
    { id: '호남권', label: '광주 / 전북 / 전남' },
    { id: '충청/세종', label: '대전 / 세종 / 천안 / 충청' },
    { id: '강원/제주', label: '강원 / 제주' },
  ];

  const purposeTabs = [
    { id: 'all', label: '전체 목적' },
    { id: 'heat_insulation', label: '🔥 단열·열차단' },
    { id: 'privacy', label: '🛡️ 시선차단·사생활' },
    { id: 'safety', label: '⚡ 안전·방범·비산방지' },
    { id: 'glare', label: '☀️ 눈부심·자외선' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-[#101012] text-zinc-100 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden border border-zinc-800 my-auto flex flex-col max-h-[92vh] relative">
        
        {/* Modal Top Header */}
        <div className="px-5 sm:px-8 py-5 bg-zinc-950/95 border-b border-zinc-800 flex items-center justify-between shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                전국 실시간 시공 연동
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-800/80 text-zinc-300 border border-zinc-700">
                <Clock className="w-3 h-3 text-amber-400" />
                일주일 간격 신규 후기 1건씩 자동 업데이트
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 pt-1">
              전국 고객 100% 자필 실측 누적 리뷰
              <span className="text-sm sm:text-base font-semibold text-amber-400">
                ({filteredReviews.length}건 검색됨 / 누적 1,480+건)
              </span>
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer shrink-0 ml-3"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter, Search & Controls Bar */}
        <div className="p-4 sm:p-6 bg-zinc-900/60 border-b border-zinc-800/80 space-y-4 shrink-0">
          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-xs font-bold text-zinc-400 shrink-0 mr-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              지역:
            </span>
            {regionTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedRegion(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedRegion === tab.id
                    ? 'bg-amber-500 text-black shadow-md font-extrabold shadow-amber-500/20'
                    : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Purpose & Search Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Purpose Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
              <span className="text-xs font-bold text-zinc-400 shrink-0 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-amber-400" />
                목적:
              </span>
              {purposeTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedPurpose(tab.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedPurpose === tab.id
                      ? 'bg-zinc-200 text-zinc-950 font-bold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input & Sort Dropdown */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-60">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="지역명, 아파트명, 필름 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-amber-500 font-medium cursor-pointer"
              >
                <option value="latest">최신 등록순 (7일 주기)</option>
                <option value="temp">온도 하강순</option>
                <option value="rating">평점 높은순</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews Card Scrollable List */}
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1 space-y-6">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <RotateCcw className="w-10 h-10 text-zinc-600 mx-auto" />
              <h4 className="text-lg font-bold text-zinc-300">검색된 시공 후기가 없습니다.</h4>
              <p className="text-xs text-zinc-500">
                선택한 필터 또는 검색어를 초기화하고 다시 시도해보세요.
              </p>
              <button
                onClick={() => {
                  setSelectedRegion('all');
                  setSelectedPurpose('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                필터 전체 초기화
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-[#141417] rounded-2xl p-5 sm:p-6 border border-zinc-800/90 shadow-lg hover:border-amber-500/40 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="space-y-3.5">
                    {/* Header Row: Author, Verified, Region, Date */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-white text-base">{rev.author}</span>
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            <CheckCircle className="w-3 h-3" />
                            100% 실시공 인증
                          </span>
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">
                            {rev.regionCategory}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-zinc-400 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="font-medium text-zinc-300">{rev.location}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="flex items-center text-amber-400 justify-end">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <div className="flex items-center gap-1 justify-end text-[11px] text-zinc-400 font-mono mt-1">
                          <Clock className="w-3 h-3 text-zinc-500" />
                          <span>{rev.date}</span>
                          {rev.weeksAgo === 0 && (
                            <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              NEW 이번주
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Applied Film & Housing Specification Badge */}
                    <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800/80 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {rev.filmType === '열반사' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-extrabold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            열반사 방식
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-extrabold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            열흡수 방식
                          </span>
                        )}
                        <span className="text-xs font-semibold text-zinc-200">
                          {rev.filmApplied}
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-400 font-medium">
                        {rev.housingType}
                      </span>
                    </div>

                    {/* Review Title & Content */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-zinc-100 text-sm leading-snug">
                        "{rev.title}"
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {rev.content}
                      </p>
                    </div>

                    {/* Photos if any */}
                    {rev.photos && rev.photos.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {rev.photos.map((imgUrl, pIdx) => (
                          <div
                            key={pIdx}
                            className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 relative group/img"
                          >
                            <img
                              src={imgUrl}
                              alt="현장 시공 인증샷"
                              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                            />
                            <span className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[9px] text-zinc-300 font-medium">
                              실제시공사진
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Metrics & Action Footer */}
                  <div className="mt-5 pt-3 border-t border-zinc-800/80 space-y-3">
                    <div className="grid grid-cols-3 gap-1 text-center bg-zinc-950/70 p-2 rounded-xl border border-zinc-800/80 text-[11px]">
                      <div>
                        <span className="text-[9px] text-zinc-500 block">온도 변화</span>
                        <strong className="font-extrabold text-amber-400">{rev.metrics.tempDrop}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-500 block">비용 절감</span>
                        <strong className="font-extrabold text-sky-400">{rev.metrics.billSaving}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-500 block">시인성/안전</span>
                        <strong className="font-extrabold text-emerald-400">{rev.metrics.viewClarity}</strong>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectReviewForConsultation(rev);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer group-hover:bg-zinc-700"
                    >
                      <span>이 시공 사례와 동일하게 맞춤 견적 문의하기</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom CTA Footer */}
        <div className="p-4 sm:p-5 bg-zinc-950 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-zinc-400 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>빛담은 <strong>100% 정품 필름</strong>과 <strong>10년 무상 AS 전자 보증서</strong>를 정식 발급합니다.</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onSelectReviewForConsultation(reviews[0]);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>우리 집·건물 100% 무료 방문 실측 신청하기</span>
          </button>
        </div>

      </div>
    </div>
  );
};

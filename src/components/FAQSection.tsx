import React, { useState, useMemo } from 'react';
import { FAQ_DATA, FAQ_CATEGORIES, FAQItem } from '../data/faqData';
import { BRAND_INFO } from '../data/mockData';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Zap,
  Tag,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

interface FAQSectionProps {
  onOpenConsultation?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체보기');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true, // Keep first question expanded by default
    'faq-2': true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchCategory =
        selectedCategory === '전체보기' || item.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchCategory;

      const matchText =
        item.question.toLowerCase().includes(query) ||
        item.shortSummary.toLowerCase().includes(query) ||
        item.answer.some((p) => p.toLowerCase().includes(query)) ||
        item.keyTerms.some((t) => t.toLowerCase().includes(query));

      return matchCategory && matchText;
    });
  }, [selectedCategory, searchQuery]);

  // Generate Schema.org JSON-LD structured data for AI & Search Engine crawling
  const faqSchemaData = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_DATA.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${item.shortSummary} ${item.answer.join(' ')}`,
        },
      })),
    };
  }, []);

  return (
    <section id="faq" className="py-24 bg-[#0D0D0F] text-zinc-100 relative overflow-hidden border-t border-zinc-800/80">
      {/* Schema.org FAQPage Structured Data for SEO / AI Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />

      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/25 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>열차단필름 · 단열필름 · 창문썬팅 전문 Q&A</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            시공 전 꼭 알아야 할 <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
              핵심 질문 & 기술 정보 (Q&A)
            </span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            적외선(IR) 차단율, 로이유리 열파손 안전성, 살고 있는 집 거주 중 시공 절차 등<br className="hidden sm:inline" />
            인공지능(AI) 검색과 건축 전문가들이 검증한 정확한 윈도우필름 시공 가이드를 확인하세요.
          </p>
        </div>

        {/* Search Bar & Categories */}
        <div className="space-y-4 mb-10">
          {/* Keyword Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="궁금한 키워드를 검색해보세요 (예: 로이유리, 결로, 거주 중, 시선차단, 비용)"
              className="w-full pl-11 pr-4 py-3.5 bg-zinc-900/90 text-zinc-100 placeholder-zinc-500 rounded-2xl border border-zinc-700/80 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-800 px-2 py-1 rounded-md"
              >
                지우기
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {FAQ_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20 font-black'
                      : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="p-12 text-center bg-zinc-900/50 rounded-2xl border border-zinc-800 space-y-3">
              <HelpCircle className="w-10 h-10 text-zinc-600 mx-auto" />
              <p className="text-zinc-300 font-bold text-sm">
                '{searchQuery}'에 대한 검색 결과가 없습니다.
              </p>
              <p className="text-xs text-zinc-500">
                원하시는 내용을 실시간 카카오톡 또는 네이버 톡톡 비즈폼으로 직접 문의해보세요.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('전체보기');
                }}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs text-amber-400 rounded-xl font-bold transition-colors cursor-pointer"
              >
                전체 질문 보기
              </button>
            </div>
          ) : (
            filteredFAQs.map((item, index) => {
              const isOpen = !!openItems[item.id];
              return (
                <article
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-[#141417] border-amber-500/40 shadow-xl shadow-black/40'
                      : 'bg-[#121214] border-zinc-800/90 hover:border-zinc-700'
                  }`}
                >
                  {/* Question Header Button */}
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          {item.category}
                        </span>
                        <span className="text-xs text-zinc-500 font-medium">
                          질문 {index + 1}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                        {item.question}
                      </h3>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? 'bg-amber-500 text-zinc-950 rotate-180'
                          : 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-zinc-200'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Answer Body (Accordion Content) */}
                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 space-y-4 border-t border-zinc-800/80">
                      {/* Short Summary Highlight Card */}
                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-200/95 leading-relaxed flex items-start gap-2.5">
                        <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-300 font-bold block mb-0.5">
                            핵심 요약
                          </strong>
                          <span>{item.shortSummary}</span>
                        </div>
                      </div>

                      {/* Detailed Explanations */}
                      <div className="space-y-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {item.answer.map((para, pIdx) => (
                          <p key={pIdx} className="flex items-start gap-2">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                            <span>{para}</span>
                          </p>
                        ))}
                      </div>

                      {/* Recommended Films (if present) */}
                      {item.recommendedFilms && (
                        <div className="pt-2 text-xs text-zinc-400 flex items-center gap-1.5">
                          <span className="font-semibold text-zinc-300">추천 필름 규격:</span>
                          <span className="text-amber-400 font-medium">{item.recommendedFilms}</span>
                        </div>
                      )}

                      {/* AI Search Keyword Tags */}
                      <div className="pt-3 border-t border-zinc-800 flex items-center gap-1.5 flex-wrap">
                        <Tag className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span className="text-[11px] text-zinc-500 font-semibold mr-1">관련 검색어:</span>
                        {item.keyTerms.map((term, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-zinc-800/80 text-[11px] text-zinc-400 border border-zinc-700/50"
                          >
                            #{term}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>

        {/* Bottom Fast Action Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-[#161619] to-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-extrabold text-white flex items-center justify-center sm:justify-start gap-2">
              <span>더 궁금한 점이 있으시거나 우리 집 맞춤 견적이 필요하신가요?</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400">
              네이버 톡톡 비즈폼 간편 접수로 전문 장비 측정과 정품 필름 샘플을 직접 확인하세요.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <a
              href={BRAND_INFO.naverBizFormUrl || 'https://talk.naver.com/profile/wo2piug/form/1'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-[#03C75A] hover:bg-[#02b351] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 cursor-pointer text-center"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M16.273 12.845 7.376 0H0v24h7.726V11.155L16.624 24H24V0h-7.727v12.845z" />
              </svg>
              <span>톡톡 비즈폼 문의</span>
            </a>

            <a
              href={BRAND_INFO.kakaoChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-[#FEE500] hover:bg-[#FDD835] text-[#371D1E] font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>카톡 1:1 질문하기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

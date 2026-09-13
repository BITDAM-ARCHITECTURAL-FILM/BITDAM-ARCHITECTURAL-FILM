import React, { useState } from 'react';
import { BRAND_INFO } from '../data/mockData';
import { 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Sparkles, 
  Clock, 
  Copy, 
  Check, 
  ExternalLink,
  Award
} from 'lucide-react';

// Official Naver Logo Icon Component
const NaverIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.273 12.845 7.376 0H0v24h7.726V11.155L16.624 24H24V0h-7.727v12.845z" />
  </svg>
);

interface ConsultationSectionProps {
  initialSummary?: string;
  onOpenKakaoChat?: () => void;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({
  initialSummary = '',
}) => {
  const NAVER_BIZFORM_URL = BRAND_INFO.naverBizFormUrl || 'https://talk.naver.com/profile/wo2piug/form/1';
  const KAKAO_CHAT_URL = BRAND_INFO.kakaoChatUrl || 'http://pf.kakao.com/_xixcqlX/chat';

  const [copied, setCopied] = useState(false);

  const handleCopySummary = async () => {
    if (!initialSummary) return;
    try {
      await navigator.clipboard.writeText(initialSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <section id="consultation" className="py-20 sm:py-24 bg-[#0A0A0B] text-zinc-100 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-[#03C75A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#03C75A]/15 text-[#03C75A] text-xs font-bold border border-[#03C75A]/30">
            <NaverIcon className="w-3.5 h-3.5" />
            <span>실시간 맞춤 견적 & 상담 공식 채널</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            원하시는 채널로 <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#03C75A] via-emerald-400 to-amber-300">
              실시간 간편 상담 & 맞춤 견적
            </span>을 받아보세요
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            데이터가 안전하게 저장되는 <strong>공식 네이버 톡톡 비즈폼</strong>, 빠른 <strong>카카오톡 1:1 상담</strong>, 
            또는 <strong>전문 마스터 직통 전화</strong>로 대기 없이 바로 연결됩니다.
          </p>
        </div>

        {/* Selected Summary Card (if prefilled from calculator/film selection) */}
        {initialSummary && (
          <div className="mb-10 max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-zinc-900/90 border border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                선택하신 견적 및 문의 내용
              </span>
              <p className="text-xs text-zinc-200 line-clamp-2">{initialSummary}</p>
            </div>
            <button
              onClick={handleCopySummary}
              className="shrink-0 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '복사 완료!' : '문의내용 복사'}</span>
            </button>
          </div>
        )}

        {/* Main 3 Channel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* 1. Naver TalkTalk Bizform Official Direct Card */}
          <div className="rounded-3xl p-7 bg-gradient-to-b from-[#121214] to-zinc-900 border border-emerald-500/40 hover:border-emerald-500 transition-all shadow-xl flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#03C75A]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#03C75A] text-white flex items-center justify-center font-black shadow-md">
                  <NaverIcon className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#03C75A] bg-[#03C75A]/15 border border-[#03C75A]/30 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#03C75A] animate-pulse" />
                  네이버 톡톡 자동 저장
                </span>
              </div>
              <div>
                <h3 className="text-xl font-black text-white group-hover:text-emerald-400 transition-colors">
                  네이버 톡톡 비즈폼
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  네이버 공식 비즈폼으로 견적 조건을 작성하시면 <strong>네이버 톡톡</strong>에 안전하게 자동 저장되며 실시간 견적 안내가 전송됩니다.
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-300 pt-2 border-t border-zinc-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>네이버 아이디로 1초 간편 접수</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>네이버 톡톡 대화창에서 실시간 저장 확인</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>수도권 및 전국 시공 상담</span>
                </li>
              </ul>
            </div>
            <div className="pt-6">
              <a
                href={NAVER_BIZFORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#03C75A] hover:bg-[#02b351] active:scale-[0.99] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                <span>비즈폼 바로 작성하기</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2. KakaoTalk 1:1 Live Chat Card */}
          <div className="rounded-3xl p-7 bg-gradient-to-b from-[#121214] to-zinc-900 border border-amber-500/30 hover:border-amber-400 transition-all shadow-xl flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#FEE500] text-[#371D1E] flex items-center justify-center font-black shadow-md">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-full">
                  실시간 1:1 채팅
                </span>
              </div>
              <div>
                <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                  카카오톡 1:1 상담
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  시공할 창호 사진이나 도면을 카카오톡으로 전송해 주시면, 마스터가 실시간으로 최적 모델과 견적을 안내해 드립니다.
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-300 pt-2 border-t border-zinc-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>현장 창문 사진 즉시 전송 가능</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>실시간 질문 & 상세 스펙 안내</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>원클릭 카톡 채널 친구 연결</span>
                </li>
              </ul>
            </div>
            <div className="pt-6">
              <a
                href={KAKAO_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#FEE500] hover:bg-[#FDD835] active:scale-[0.99] text-[#371D1E] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>카카오톡 1:1 문의하기</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 3. Direct Phone Contact Card */}
          <div className="rounded-3xl p-7 bg-gradient-to-b from-[#121214] to-zinc-900 border border-zinc-800 hover:border-amber-400/50 transition-all shadow-xl flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-zinc-950 flex items-center justify-center font-black shadow-md">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-zinc-300 bg-zinc-800 border border-zinc-700 px-2.5 py-1 rounded-full">
                  즉시 전화 연결
                </span>
              </div>
              <div>
                <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                  전화 빠른 상담
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  긴급 시공 일정이나 오피스·상가·관공서 대규모 프로젝트는 마스터 직통 전화로 가장 빠르게 협의하실 수 있습니다.
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-300 pt-2 border-t border-zinc-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>마스터 직통: <strong>{BRAND_INFO.phone}</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>운영 시간: {BRAND_INFO.workingHours.split('(')[0]}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>주말·공휴일 사전 예약 상담 가능</span>
                </li>
              </ul>
            </div>
            <div className="pt-6">
              <a
                href={`tel:${BRAND_INFO.phone}`}
                className="w-full py-3.5 px-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-zinc-700 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{BRAND_INFO.phone} 통화</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Trust & Assurance Footer Bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121214] border border-zinc-800 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-xs sm:text-sm font-bold text-white block">전국 시공 지원</strong>
              <span className="text-[11px] text-zinc-400">수도권 전 지역 당일/익일 출장 및 전국 시공</span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-xs sm:text-sm font-bold text-white block">100% 정품 필름 시공</strong>
              <span className="text-[11px] text-zinc-400">빛담·3M·루마 본사 정품 인증 보증서 발급</span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-xs sm:text-sm font-bold text-white block">최대 10년 무상 A/S</strong>
              <span className="text-[11px] text-zinc-400">필름 변색·들뜸·기포 발생 시 책임 보증</span>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-xs sm:text-sm font-bold text-white block">신속한 상담 안내</strong>
              <span className="text-[11px] text-zinc-400">월~토 08:30~20:00 (일요일 사전예약제)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

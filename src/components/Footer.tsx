import React from 'react';
import { BrandLogo } from './BrandLogo';
import { BRAND_INFO } from '../data/mockData';
import { Phone, MessageCircle, ShieldCheck, MapPin, Clock, Award, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
  onOpenKakaoChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenConsultation,
  onOpenKakaoChat,
}) => {
  const handleFooterNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="bg-[#0A0A0B] text-zinc-400 text-xs border-t border-zinc-800 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo variant="dark" size="lg" />
            <p className="text-zinc-300 text-sm leading-relaxed max-w-sm">
              {BRAND_INFO.slogan} — {BRAND_INFO.subSlogan}
            </p>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-md">
              빛담건물썬팅은 3M, 넥스필, 솔라메이트 공식 공급 파트너로서, 
              10년 이상 경력의 공인 마스터가 직접 시공하고 10년 정품 전자보증서를 100% 발급합니다.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold">
                <Award className="w-3.5 h-3.5" />
                창호단열시공협회 인증
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                10년 정품 무상 AS
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm">주요 메뉴 바로가기</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#portfolio"
                  onClick={(e) => handleFooterNavClick(e, '#portfolio')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  현장스토리 (시공사례)
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  onClick={(e) => handleFooterNavClick(e, '#products')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  프리미엄 정품 필름 소개
                </a>
              </li>
              <li>
                <a
                  href="#blog-sync"
                  onClick={(e) => handleFooterNavClick(e, '#blog-sync')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  네이버 블로그 실시간 시공기
                </a>
              </li>
              <li>
                <a
                  href="#estimator"
                  onClick={(e) => handleFooterNavClick(e, '#estimator')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  1분 간편 견적 & 절감액 계산기
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  onClick={(e) => handleFooterNavClick(e, '#reviews')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  실제 고객 시공 후기
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleFooterNavClick(e, '#faq')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-amber-400/90"
                >
                  열차단·단열필름 시공 Q&A
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Center Info */}
          <div className="lg:col-span-4 space-y-3 bg-[#121214] p-6 rounded-2xl border border-zinc-800">
            <h4 className="font-bold text-white text-sm flex items-center justify-between">
              <span>고객 지원 & 실시간 상담</span>
              <span className="text-[11px] font-medium text-emerald-400">연중무휴 상담 접수</span>
            </h4>

            <div className="space-y-2">
              <a
                href={`tel:${BRAND_INFO.phone}`}
                className="text-2xl font-black text-white hover:text-amber-400 block transition-colors"
              >
                {BRAND_INFO.phone}
              </a>
              <div className="text-xs text-zinc-400 flex items-center gap-1.5 pt-1">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{BRAND_INFO.workingHours}</span>
              </div>
              <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>수도권 및 전국 전문 실측·시공 지원</span>
              </div>
            </div>

            <div className="pt-3 flex gap-2">
              <a
                href={BRAND_INFO.kakaoChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#FEE500] hover:bg-[#FDD835] text-[#371D1E] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>카톡 1:1 상담</span>
              </a>
              <a
                href={BRAND_INFO.naverBizFormUrl || 'https://talk.naver.com/profile/wo2piug/form/1'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#03C75A] hover:bg-[#02b351] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M16.273 12.845 7.376 0H0v24h7.726V11.155L16.624 24H24V0h-7.727v12.845z" />
                </svg>
                <span>톡톡 비즈폼</span>
              </a>
            </div>
          </div>
        </div>

        {/* Business Info Strip */}
        <div className="pt-8 border-t border-zinc-800/80 text-[11px] text-zinc-400 space-y-2 leading-relaxed">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-zinc-400">
            <span><strong className="text-zinc-300">상호명:</strong> {BRAND_INFO.name}</span>
            <span className="text-zinc-700 hidden sm:inline">|</span>
            <span><strong className="text-zinc-300">대표자:</strong> {BRAND_INFO.representative}</span>
            <span className="text-zinc-700 hidden sm:inline">|</span>
            <span><strong className="text-zinc-300">사업자등록번호:</strong> {BRAND_INFO.businessNumber}</span>
            <span className="text-zinc-700 hidden sm:inline">|</span>
            <span><strong className="text-zinc-300">본사 주소:</strong> {BRAND_INFO.address}</span>
            <span className="text-zinc-700 hidden sm:inline">|</span>
            <span className="text-amber-400 font-bold">전국 시공 전문 (수도권 및 전국 시공 지원)</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-zinc-500">
            <p>© 2026 {BRAND_INFO.name} ({BRAND_INFO.englishName}). All rights reserved.</p>
            <p className="text-zinc-600">
              본 사이트에 게시된 모든 시공 사진과 열화상 측정 데이터는 빛담건물썬팅의 소중한 자산입니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { BrandLogo } from './BrandLogo';
import { BRAND_INFO } from '../data/mockData';
import { Phone, MessageCircle, Calculator, Menu, X, ShieldCheck, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenKakaoChat: () => void;
  onOpenEstimator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  onOpenKakaoChat,
  onOpenEstimator,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const navLinks = [
    { label: '빛담소개', href: '#advantages' },
    { label: '필름종류', href: '#products' },
    { label: '현장스토리', href: '#portfolio' },
    { label: '블로그시공기', href: '#blog-sync' },
    { label: 'AI필름추천', href: '#estimator' },
    { label: 'Q&A', href: '#faq' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0B]/95 backdrop-blur-md shadow-2xl border-b border-white/10 py-2.5 sm:py-3'
            : 'bg-[#0A0A0B]/85 backdrop-blur-sm border-b border-white/5 py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group" aria-label="빛담건물썬팅 홈">
            <BrandLogo variant="dark" size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3.5 py-2 text-sm font-semibold text-zinc-300 hover:text-amber-400 rounded-lg hover:bg-zinc-800/50 transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Naver TalkTalk Bizform CTA */}
            <a
              href={BRAND_INFO.naverBizFormUrl || 'https://talk.naver.com/profile/wo2piug/form/1'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#03C75A] hover:bg-[#02b351] text-white shadow-sm hover:shadow transition-all duration-200 cursor-pointer active:scale-95"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M16.273 12.845 7.376 0H0v24h7.726V11.155L16.624 24H24V0h-7.727v12.845z" />
              </svg>
              <span>톡톡 비즈폼</span>
            </a>

            {/* Kakao Talk CTA */}
            <a
              href={BRAND_INFO.kakaoChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#FEE500] hover:bg-[#FDD835] text-[#371D1E] shadow-sm hover:shadow transition-all duration-200 cursor-pointer active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>카톡 상담</span>
            </a>

            {/* Direct Phone Call */}
            <a
              href={`tel:${BRAND_INFO.phone}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-700/80 shadow-sm hover:shadow transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{BRAND_INFO.phone}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={BRAND_INFO.kakaoChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2 rounded-xl bg-[#FEE500] text-[#371D1E] shadow-sm cursor-pointer"
              aria-label="카카오톡 상담"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </a>
            <a
              href={`tel:${BRAND_INFO.phone}`}
              className="inline-flex items-center justify-center p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-amber-400 shadow-sm"
              aria-label="전화 연결"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="메뉴 열기"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-md pt-20 animate-fade-in">
          <div className="bg-[#121214] m-4 rounded-3xl p-6 shadow-2xl border border-zinc-800 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <BrandLogo variant="dark" size="sm" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    handleNavClick(e, link.href);
                  }}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-semibold text-zinc-200 hover:bg-zinc-800/80 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-2.5">
              {/* Naver Bizform Button */}
              <a
                href={BRAND_INFO.naverBizFormUrl || 'https://talk.naver.com/profile/wo2piug/form/1'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-[#03C75A] text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M16.273 12.845 7.376 0H0v24h7.726V11.155L16.624 24H24V0h-7.727v12.845z" />
                </svg>
                <span>네이버 톡톡 비즈폼 바로 작성</span>
              </a>

              {/* KakaoTalk 1:1 Chat */}
              <a
                href={BRAND_INFO.kakaoChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-[#FEE500] text-[#371D1E] flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>카카오톡 1:1 실시간 상담</span>
              </a>

              {/* Phone Call Button */}
              <a
                href={`tel:${BRAND_INFO.phone}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-zinc-900 border border-zinc-700 text-white flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>전화 상담 ({BRAND_INFO.phone})</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState } from 'react';
import { BRAND_INFO } from '../data/mockData';
import { ConsultationRequest } from '../types';
import { Phone, MessageCircle, ShieldCheck, CheckCircle2, Calendar, MapPin, Sparkles, Clock, Send } from 'lucide-react';

interface ConsultationSectionProps {
  initialSummary?: string;
  onOpenKakaoChat: () => void;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({
  initialSummary = '',
  onOpenKakaoChat,
}) => {
  const [formData, setFormData] = useState<ConsultationRequest>({
    clientName: '',
    phoneNumber: '',
    address: '',
    buildingType: '아파트 / 주거',
    estimatedArea: '30평대 (84㎡)',
    purpose: ['열차단 / 단열'],
    preferredDate: '',
    preferredTime: '오전 (09:00 - 12:00)',
    preferredFilmBrand: '전문가 맞춤 추천',
    message: initialSummary,
    agreePrivacy: true,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const purposeOptions = [
    '여름철 찜통더위 열차단',
    '외부 시선차단 (사생활 보호)',
    '눈부심 완화 & 조망 확보',
    '겨울철 단열 & 결로 완화',
    '태풍/지진 비산방지 안전',
  ];

  const handlePurposeToggle = (item: string) => {
    if (formData.purpose.includes(item)) {
      setFormData({ ...formData, purpose: formData.purpose.filter((p) => p !== item) });
    } else {
      setFormData({ ...formData, purpose: [...formData.purpose, item] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.phoneNumber) {
      alert('성함과 연락처를 입력해주세요.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <section id="consultation" className="py-24 bg-[#0A0A0B] text-zinc-100 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Direct Contacts & Value Guarantee */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>100% 무료 출장 방문 실측 & 샘플 시연</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                지금 신청하시면 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
                  무료 방문 실측 & 필름 샘플
                </span>
                을 직접 확인하실 수 있습니다
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                창문 크기와 일조량, 유리 두께에 따라 최적의 필름이 다릅니다. 
                빛담 마스터가 전문 측정기와 필름 롤 샘플을 들고 직접 찾아갑니다.
              </p>
            </div>

            {/* Quick Contact Card Buttons */}
            <div className="space-y-3">
              {/* Direct Phone Call Card */}
              <a
                href={`tel:${BRAND_INFO.phone}`}
                className="flex items-center justify-between p-5 rounded-2xl bg-[#121214] border border-white/5 hover:border-amber-400/60 transition-all group shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center shadow-md">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 block font-medium">실시간 빠른 전화 상담</span>
                    <strong className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                      {BRAND_INFO.phone}
                    </strong>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-400">즉시 통화 →</span>
              </a>

              {/* Direct Mobile Call Card */}
              <a
                href={`tel:${BRAND_INFO.directPhone}`}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#121214]/70 border border-zinc-800 hover:border-amber-400/60 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-zinc-800 text-amber-400 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-400 block">시공 마스터 직통 핸드폰</span>
                    <strong className="text-sm font-bold text-white">{BRAND_INFO.directPhone}</strong>
                  </div>
                </div>
                <span className="text-[11px] text-zinc-400 group-hover:text-white">문자/통화</span>
              </a>

              {/* Kakao Talk Consultation Card */}
              <button
                onClick={onOpenKakaoChat}
                className="w-full flex items-center justify-between p-5 rounded-2xl bg-[#FEE500] hover:bg-[#FDD835] text-[#371D1E] transition-all shadow-lg shadow-amber-500/10 cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#371D1E] text-[#FEE500] flex items-center justify-center shadow-sm">
                    <MessageCircle className="w-6 h-6 fill-current" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-[#371D1E]/70 block">사진 전송 & 카톡 실시간 견적</span>
                    <strong className="text-lg font-black text-[#371D1E]">
                      카카오톡 1:1 상담하기
                    </strong>
                  </div>
                </div>
                <span className="text-xs font-black text-[#371D1E] group-hover:translate-x-1 transition-transform">
                  대화 시작 →
                </span>
              </button>
            </div>

            {/* Service Area Notice */}
            <div className="p-4 bg-[#121214] rounded-2xl border border-zinc-800 text-xs text-zinc-300 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <MapPin className="w-4 h-4" />
                <span>무료 방문 실측 가능 지역</span>
              </div>
              <p className="text-zinc-400">
                서울 전 지역, 인천, 경기 수도권 전역 당일/익일 출장 가능 (지방 대형 오피스/관공서 전국 출장 협의)
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Booking Form */}
          <div className="lg:col-span-7 bg-[#121214] text-zinc-100 rounded-3xl p-7 sm:p-10 shadow-2xl border border-white/5">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-5 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-white">
                    방문 실측 예약이 정상 접수되었습니다!
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto">
                    <strong className="text-amber-400">{formData.clientName}</strong> 고객님 ({formData.phoneNumber}), 
                    담당 전문 마스터가 10분 이내로 연락드려 상세 일정 및 준비 사항을 안내해 드리겠습니다.
                  </p>
                </div>
                <div className="p-4 bg-zinc-900 rounded-2xl text-xs text-zinc-400 max-w-sm mx-auto border border-zinc-800">
                  긴급 상담은 직통 전화(<strong className="text-zinc-200">{BRAND_INFO.phone}</strong>)로 연락 주시면 더욱 빠릅니다.
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-zinc-800 text-white rounded-xl text-xs font-bold hover:bg-zinc-700 transition-all cursor-pointer"
                >
                  새로운 상담 작성하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="space-y-0.5">
                    <h3 className="text-xl font-extrabold text-white">
                      무료 방문 실측 & 맞춤 견적 신청
                    </h3>
                    <p className="text-xs text-zinc-400">
                      간단한 정보만 남겨주시면 10분 내로 친절하게 안내해 드립니다.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    출장비 0원
                  </span>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">
                      고객명 / 상호명 <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="홍길동"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">
                      연락처 (핸드폰) <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="010-1234-5678"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>

                {/* Address & Building Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">
                      시공 지역 / 주소 (동 또는 단지명)
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="예: 서울 송파구 잠실 엘스"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">건물 형태</label>
                    <select
                      value={formData.buildingType}
                      onChange={(e) => setFormData({ ...formData, buildingType: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 transition-all cursor-pointer"
                    >
                      <option className="bg-zinc-900 text-white">아파트 / 주거</option>
                      <option className="bg-zinc-900 text-white">오피스텔 / 빌라</option>
                      <option className="bg-zinc-900 text-white">단독주택 / 타운하우스</option>
                      <option className="bg-zinc-900 text-white">상가 / 카페 / 식당</option>
                      <option className="bg-zinc-900 text-white">사무실 / 사옥</option>
                      <option className="bg-zinc-900 text-white">관공서 / 공공기관</option>
                    </select>
                  </div>
                </div>

                {/* Purpose Checkboxes */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-300 block">
                    시공 목적 (중복 선택 가능)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {purposeOptions.map((opt) => {
                      const isChecked = formData.purpose.includes(opt);
                      return (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => handlePurposeToggle(opt)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preferred Date & Film */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">희망 방문 실측일</label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">선호 필름 라인업</label>
                    <select
                      value={formData.preferredFilmBrand}
                      onChange={(e) => setFormData({ ...formData, preferredFilmBrand: e.target.value })}
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 transition-all cursor-pointer"
                    >
                      <option className="bg-zinc-900 text-white">전문가 현장 맞춤 추천</option>
                      <option className="bg-zinc-900 text-white">BD ST 2598 (멀티레이어 스퍼터 플래그십)</option>
                      <option className="bg-zinc-900 text-white">BD ST 5090 (멀티레이어 스퍼터 내추럴뷰)</option>
                      <option className="bg-zinc-900 text-white">BD AP35 / AP45 (사계절 Low-E 증착스퍼터)</option>
                      <option className="bg-zinc-900 text-white">BD IR 시리즈 95 / 70 (초미립자 비금속 나노세라믹)</option>
                      <option className="bg-zinc-900 text-white">디자인 라인업 (글라데이션 / 암막 / 엠보)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">문의 사항 및 추가 요청</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="층수, 창문 개수, 창문 사진 전송 여부 등 궁금하신 점을 자유롭게 적어주세요."
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700/80 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-all resize-none"
                  />
                </div>

                {/* Privacy Consent */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="privacyAgree"
                    checked={formData.agreePrivacy}
                    onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                    className="w-4 h-4 text-amber-500 rounded border-zinc-700 bg-zinc-900 focus:ring-amber-500 cursor-pointer"
                  />
                  <label htmlFor="privacyAgree" className="text-xs text-zinc-400 cursor-pointer">
                    개인정보 수집 및 방문 견적 안내 활용에 동의합니다. (필수)
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-base font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? '접수 처리 중...' : '무료 방문 실측 & 견적 신청 완료'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

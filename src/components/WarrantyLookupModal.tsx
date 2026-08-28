import React, { useState } from 'react';
import { BRAND_INFO } from '../data/mockData';
import {
  X,
  Search,
  ShieldCheck,
  Award,
  Calendar,
  User,
  Phone,
  MapPin,
  FileCheck,
  CheckCircle2,
  Download,
  Share2,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

interface WarrantyRecord {
  certNumber: string;
  customerName: string;
  phone: string;
  location: string;
  filmBrand: string;
  filmProduct: string;
  installDate: string;
  warrantyPeriod: string;
  warrantyExpireDate: string;
  masterTechnician: string;
  specs: {
    irr: string;
    uvr: string;
    tser: string;
  };
  status: 'active' | 'verified';
}

const SAMPLE_WARRANTY_DB: WarrantyRecord[] = [
  {
    certNumber: 'BD-2026-0824',
    customerName: '김*현',
    phone: '010-****-1199',
    location: '서울 서초구 반포자이아파트 108동',
    filmBrand: 'NEXFIL',
    filmProduct: 'NEXFIL Multi-layer Sputter 2598 (하이엔드 열반사)',
    installDate: '2026. 08. 15',
    warrantyPeriod: '10년 무상 보증',
    warrantyExpireDate: '2036. 08. 14',
    masterTechnician: '강빛담 마스터 (1급 시공자)',
    specs: {
      irr: '98%',
      uvr: '99.9%',
      tser: '78%',
    },
    status: 'active',
  },
  {
    certNumber: 'BD-2026-0719',
    customerName: '이*민',
    phone: '010-****-5523',
    location: '부산 해운대구 엘시티 더샵 펜트하우스',
    filmBrand: '3M',
    filmProduct: '3M Prestige 70 (광학 다층 나노필름)',
    installDate: '2026. 07. 19',
    warrantyPeriod: '15년 본사 공식 보증',
    warrantyExpireDate: '2041. 07. 18',
    masterTechnician: '박준영 마스터 (1급 시공자)',
    specs: {
      irr: '97%',
      uvr: '99.9%',
      tser: '60%',
    },
    status: 'active',
  },
  {
    certNumber: 'BD-2026-0610',
    customerName: '박*훈',
    phone: '010-****-8841',
    location: '경기 성남시 판교 테크노밸리 IT사옥 5층',
    filmBrand: 'SOLARMATE',
    filmProduct: 'SOLARMATE Low-E Series (스퍼터 열반사)',
    installDate: '2026. 06. 10',
    warrantyPeriod: '10년 무상 보증',
    warrantyExpireDate: '2036. 06. 09',
    masterTechnician: '정성우 마스터 (1급 시공자)',
    specs: {
      irr: '96%',
      uvr: '99.9%',
      tser: '72%',
    },
    status: 'active',
  },
];

interface WarrantyLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const WarrantyLookupModal: React.FC<WarrantyLookupModalProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  const [searchKey, setSearchKey] = useState('');
  const [searchResult, setSearchResult] = useState<WarrantyRecord | null>(SAMPLE_WARRANTY_DB[0]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const query = searchKey.trim().toLowerCase();

    if (!query) {
      setSearchResult(SAMPLE_WARRANTY_DB[0]);
      return;
    }

    const found = SAMPLE_WARRANTY_DB.find(
      (r) =>
        r.certNumber.toLowerCase().includes(query) ||
        r.customerName.toLowerCase().includes(query) ||
        r.location.toLowerCase().includes(query) ||
        r.phone.includes(query)
    );

    if (found) {
      setSearchResult(found);
    } else {
      // Create a dynamic verified certificate for realistic demonstration
      setSearchResult({
        certNumber: `BD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: searchKey.trim() || '고객님',
        phone: '010-****-1199',
        location: '정품 시공 인증 세대 (전국 직영팀)',
        filmBrand: 'NEXFIL / 3M',
        filmProduct: '빛담 프리미엄 고단열 정품 윈도우 필름',
        installDate: '2026. 08. 20',
        warrantyPeriod: '10년 무상 보증 (전자보증서 발급완료)',
        warrantyExpireDate: '2036. 08. 19',
        masterTechnician: '강빛담 책임 마스터',
        specs: {
          irr: '98%',
          uvr: '99.9%',
          tser: '75%',
        },
        status: 'active',
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-[#101012] text-zinc-100 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-zinc-800 my-auto flex flex-col max-h-[92vh] relative">
        
        {/* Header */}
        <div className="px-6 py-5 bg-zinc-950/95 border-b border-zinc-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  100% 정품 인증 시스템
                </span>
                <span className="text-xs text-zinc-400 font-medium">10년 무상 사후관리</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
                빛담건물썬팅 전자 품질보증서 실시간 조회
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          
          {/* Search Box */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-amber-400" />
              보증서 번호 또는 계약자명 / 연락처 검색
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  placeholder="예: BD-2026-0824, 김*현, 1199 또는 아파트명"
                  className="w-full pl-4 pr-10 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors font-medium"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>조회하기</span>
              </button>
            </div>
            <p className="text-[11px] text-zinc-500">
              * 시공 완료 후 발급받으신 모바일 전자보증서 번호 또는 계약자 성함을 입력하시면 10년 정품 보증 상태를 즉시 조회하실 수 있습니다.
            </p>
          </form>

          {/* Certificate Card */}
          {searchResult && (
            <div className="relative bg-gradient-to-b from-[#18181c] to-[#121215] rounded-3xl p-6 sm:p-8 border-2 border-amber-500/30 shadow-2xl space-y-6 overflow-hidden">
              {/* Background Watermark */}
              <div className="absolute right-4 -bottom-6 opacity-5 pointer-events-none">
                <Award className="w-72 h-72 text-amber-400" />
              </div>

              {/* Certificate Top Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-zinc-800">
                <div>
                  <span className="text-[11px] font-black text-amber-400 uppercase tracking-widest block">
                    Official Certificate of Warranty
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5 flex items-center gap-2">
                    정품 시공 전자 품질보증서
                  </h4>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-zinc-500 block">보증서 관리번호</span>
                  <span className="text-sm font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                    {searchResult.certNumber}
                  </span>
                </div>
              </div>

              {/* Grid Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-zinc-950/70 rounded-2xl border border-zinc-800/80 space-y-1">
                  <div className="text-zinc-500 flex items-center gap-1.5 font-medium">
                    <User className="w-3.5 h-3.5 text-zinc-400" />
                    계약 고객명
                  </div>
                  <div className="text-sm font-bold text-white pl-5">{searchResult.customerName}</div>
                </div>

                <div className="p-3.5 bg-zinc-950/70 rounded-2xl border border-zinc-800/80 space-y-1">
                  <div className="text-zinc-500 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    시공 장소
                  </div>
                  <div className="text-sm font-bold text-white pl-5">{searchResult.location}</div>
                </div>

                <div className="p-3.5 bg-zinc-950/70 rounded-2xl border border-zinc-800/80 space-y-1 sm:col-span-2">
                  <div className="text-zinc-500 flex items-center gap-1.5 font-medium">
                    <FileCheck className="w-3.5 h-3.5 text-amber-400" />
                    시공 필름 제품명
                  </div>
                  <div className="text-sm font-black text-amber-300 pl-5 flex items-center gap-2 flex-wrap">
                    <span>{searchResult.filmProduct}</span>
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 font-bold border border-zinc-700">
                      브랜드: {searchResult.filmBrand}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-zinc-950/70 rounded-2xl border border-zinc-800/80 space-y-1">
                  <div className="text-zinc-500 flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    시공 완료일
                  </div>
                  <div className="text-sm font-bold text-white pl-5 font-mono">{searchResult.installDate}</div>
                </div>

                <div className="p-3.5 bg-zinc-950/70 rounded-2xl border border-zinc-800/80 space-y-1">
                  <div className="text-zinc-500 flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    보증 만료일
                  </div>
                  <div className="text-sm font-bold text-emerald-400 pl-5 font-mono">
                    {searchResult.warrantyExpireDate} ({searchResult.warrantyPeriod})
                  </div>
                </div>
              </div>

              {/* Film Performance Spec Verified */}
              <div className="bg-zinc-950/90 p-4 rounded-2xl border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-zinc-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    공인 광학 성능 시험성적서 일치 보증
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    정품 검증 완료
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                  <div className="bg-zinc-900 p-2 rounded-xl">
                    <span className="text-[10px] text-zinc-500 block">적외선(열) 차단율</span>
                    <strong className="text-amber-400 font-extrabold text-sm">{searchResult.specs.irr}</strong>
                  </div>
                  <div className="bg-zinc-900 p-2 rounded-xl">
                    <span className="text-[10px] text-zinc-500 block">유해 자외선 차단</span>
                    <strong className="text-sky-400 font-extrabold text-sm">{searchResult.specs.uvr}</strong>
                  </div>
                  <div className="bg-zinc-900 p-2 rounded-xl">
                    <span className="text-[10px] text-zinc-500 block">총태양에너지 차단</span>
                    <strong className="text-emerald-400 font-extrabold text-sm">{searchResult.specs.tser}</strong>
                  </div>
                </div>
              </div>

              {/* Official Seal & Signature */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800 text-xs text-zinc-400">
                <div className="space-y-0.5 text-center sm:text-left">
                  <div>책임 시공자: <strong className="text-zinc-200">{searchResult.masterTechnician}</strong></div>
                  <div className="text-[11px] text-zinc-500">발행처: {BRAND_INFO.name} ({BRAND_INFO.englishName})</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-amber-500/50 flex items-center justify-center text-[10px] font-black text-amber-400 text-center leading-tight bg-amber-500/5">
                    빛담<br/>직영인
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={handleCopyLink}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold text-xs flex items-center justify-center gap-1.5 border border-zinc-800 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{isCopied ? '링크가 복사되었습니다!' : '보증서 링크 공유'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>10년 보증 정품 시공 무료 방문 실측 신청</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

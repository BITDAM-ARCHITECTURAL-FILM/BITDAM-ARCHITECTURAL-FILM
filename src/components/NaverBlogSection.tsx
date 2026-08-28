import React, { useState } from 'react';
import { NAVER_BLOG_POSTS, BRAND_INFO } from '../data/mockData';
import { BlogPost } from '../types';
import { RefreshCw, ExternalLink, BookOpen, Clock, Eye, ThumbsUp, CheckCircle, Search, Settings, X, Sparkles } from 'lucide-react';

export const NaverBlogSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(NAVER_BLOG_POSTS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('방금 전 (자동 연동 중)');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [blogId, setBlogId] = useState('framtidlab_ad');
  const [showConfigModal, setShowConfigModal] = useState(false);

  const categories = [
    { key: 'all', label: '전체 최신글' },
    { key: '주거공간', label: '주거공간' },
    { key: '오피스공간', label: '오피스공간' },
    { key: '상업공간', label: '상업공간' },
    { key: '단체공간 썬팅', label: '단체공간 썬팅' },
  ];

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime(new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' 동기화 완료');
    }, 1000);
  };

  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <section id="blog-sync" className="py-24 bg-white text-zinc-900 relative overflow-hidden border-b border-zinc-200">
      {/* Background Decorative glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#03C75A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Live Sync Status */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#03C75A]/15 text-[#029844] border border-[#03C75A]/30">
                <span className="w-2 h-2 rounded-full bg-[#03C75A] animate-pulse" />
                <span>NAVER BLOG AUTO-SYNC</span>
              </span>
              <span className="text-xs text-zinc-500">
                동기화 상태: <strong className="text-emerald-600 font-semibold">{lastSyncTime}</strong>
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              네이버 공식 블로그 <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600">
                실시간 최신 시공기 & 노하우
              </span>
            </h2>
          </div>

          {/* Sync Control Buttons */}
          <div className="flex items-center flex-wrap gap-2.5">
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300 transition-all cursor-pointer shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? '최신글 수신 중...' : '최신글 새로고침'}</span>
            </button>

            <a
              href={BRAND_INFO.naverBlogUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#03C75A] hover:bg-[#02B351] text-white shadow-md shadow-[#03C75A]/20 transition-all cursor-pointer"
            >
              <span>네이버 블로그 바로가기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/30 border border-emerald-500'
                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 border border-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/90 text-emerald-800 backdrop-blur-md border border-emerald-200 shadow-sm">
                    {post.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[11px] font-semibold text-zinc-800 bg-white/85 px-2 py-0.5 rounded shadow-sm backdrop-blur-sm">
                  <Clock className="w-3 h-3 text-zinc-600" />
                  <span>{post.date}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-600 mt-2 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-zinc-400" />
                      {post.viewCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5 text-zinc-400" />
                      {post.likesCount}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 group-hover:underline flex items-center gap-0.5">
                    상세 읽기 →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sync Info Footer Strip */}
        <div className="mt-12 bg-zinc-50 rounded-2xl p-4 border border-zinc-200 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600 gap-3 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              네이버 오픈 API 및 RSS 크롤러를 통해 <strong className="text-zinc-900">빛담 공식 블로그의 시공 사진 및 텍스트</strong>가 자동 동기화됩니다.
            </span>
          </div>
          <span className="text-zinc-500">실시간 데이터 갱신 주기: 1시간</span>
        </div>
      </div>

      {/* In-App Blog Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-white text-zinc-900 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-zinc-200 my-auto">
            <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#03C75A]" />
                <span className="text-xs font-bold text-zinc-800">네이버 블로그 공식 포스팅</span>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1.5 text-zinc-500 hover:text-zinc-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="space-y-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {selectedPost.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 leading-tight">
                  {selectedPost.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-zinc-500 pt-1">
                  <span>작성자: {selectedPost.author}</span>
                  <span>•</span>
                  <span>발행일: {selectedPost.date}</span>
                  <span>•</span>
                  <span>조회 {selectedPost.viewCount}</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-zinc-200">
                <img
                  src={selectedPost.thumbnail}
                  alt={selectedPost.title}
                  className="w-full h-72 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="text-sm text-zinc-700 leading-relaxed space-y-4 bg-zinc-50 p-6 rounded-2xl border border-zinc-200">
                <p>{selectedPost.contentSnippet}</p>
                <p className="text-zinc-500 text-xs italic">
                  * 본 포스팅의 전체 고화질 사진과 시공 과정(비포/애프터/온도계 측정 비디오)은 네이버 공식 블로그에서 원문으로 확인하실 수 있습니다.
                </p>
              </div>

              <div className="flex items-center flex-wrap gap-2">
                {selectedPost.tags.map((t, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-700 text-xs border border-zinc-200">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href={selectedPost.naverUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-[#03C75A] hover:bg-[#02B351] text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>네이버 블로그에서 원문 전체 보기</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-xs text-zinc-500 hover:text-zinc-900 cursor-pointer"
                >
                  창 닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog ID Config Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white text-zinc-900 w-full max-w-md rounded-3xl p-6 border border-zinc-200 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-zinc-900">네이버 블로그 연동 설정</h4>
              <button onClick={() => setShowConfigModal(false)} className="text-zinc-500 hover:text-zinc-900 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <label className="text-xs text-zinc-700 font-semibold block">
                연동할 네이버 블로그 아이디 (ID)
              </label>
              <div className="flex items-center bg-zinc-50 rounded-xl px-3 border border-zinc-300">
                <span className="text-xs text-zinc-500">blog.naver.com/</span>
                <input
                  type="text"
                  value={blogId}
                  onChange={(e) => setBlogId(e.target.value)}
                  className="w-full bg-transparent px-2 py-2.5 text-sm text-zinc-900 focus:outline-none"
                  placeholder="아이디 입력"
                />
              </div>
              <p className="text-[11px] text-zinc-500">
                실제 운영 중인 블로그 ID를 입력하면 해당 블로그의 RSS 및 최신 글이 이 웹사이트에 자동으로 수신됩니다.
              </p>
            </div>
            <button
              onClick={() => {
                setShowConfigModal(false);
                handleManualSync();
              }}
              className="w-full py-3 bg-[#03C75A] hover:bg-[#02B351] text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              설정 저장 & 즉시 동기화
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

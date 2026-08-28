import React, { useState } from 'react';
import { BRAND_INFO } from '../data/mockData';
import { BrandLogo } from './BrandLogo';
import { MessageCircle, Send, X, ShieldCheck, CheckCheck, Sparkles, Phone, ExternalLink } from 'lucide-react';

interface KakaoChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  quickActions?: { label: string; action: () => void }[];
}

export const KakaoChatModal: React.FC<KakaoChatModalProps> = ({ isOpen, onClose, onOpenConsultation }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: `안녕하세요! 100% 정품 건축용 단열필름 전문 시공 브랜드 [빛담건물썬팅] 1:1 상담 채널입니다. 🏠✨\n\n현재 거주 중이신 건물의 위치와 평수, 원하시는 시공 목적(열차단, 시선차단, 안전 등)을 알려주시면 10분 내로 친절하고 정확한 견적을 안내해 드리겠습니다.`,
      time: '방금 전',
    },
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const quickQuestions = [
    '34평 아파트 단열필름 예상 견적이 궁금해요.',
    '시공 시 소음이나 먼지가 많이 발생하나요?',
    '시선차단 필름은 밤에도 밖에서 안 보이나요?',
    '무료 방문 실측 및 샘플 확인 예약하고 싶어요.',
  ];

  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    const currentTime = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: currentTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Automated intelligent bot response simulation
    setTimeout(() => {
      let replyText = '문의 주셔서 감사합니다! 전문 마스터가 고객님의 상담 내용을 확인 중입니다. 남겨주신 조건에 최적화된 정품 필름(RAYNO / 3M / 루마) 샘플과 상세 견적서를 안내해 드리겠습니다.';

      if (textToSend.includes('34평') || textToSend.includes('견적')) {
        replyText = `34평형 아파트(거실 통창+주방+침실 전체)는 보통 창호 면적 약 45~55㎡ 기준이며, 10년 보증 정품 나노 세라믹 필름 시공 시 40만원대 후반~80만원대(필름 등급별 상이)로 형성됩니다. 정확한 실측 시 0원 무료 방문으로 오차 없는 견적을 산출해 드립니다.`;
      } else if (textToSend.includes('소음') || textToSend.includes('먼지')) {
        replyText = `빛담의 모든 시공은 소음이 전혀 없으며, 3중 바닥 보양재 및 미세 먼지 안개 분무 시스템을 가동하여 가구와 마루를 완벽히 보호합니다. 거주 중이신 상태에서도 일상생활에 아무런 지장 없이 3~4시간 내에 깔끔히 완료됩니다!`;
      } else if (textToSend.includes('밤') || textToSend.includes('시선차단')) {
        replyText = `원웨이(One-Way) 시선차단 필름은 빛의 조도 차이를 이용하므로, 낮에는 밖에서 완벽한 거울 반사로 실내가 보이지 않습니다. 밤에 실내 조명을 켜시면 블라인드나 얇은 쉬폰 커튼을 가볍게 쳐주시는 것이 좋습니다.`;
      } else if (textToSend.includes('방문') || textToSend.includes('실측')) {
        replyText = `네, 고객님! 수도권 및 전국 무료 출장 방문 실측을 바로 접수해 드릴까요? 아래 '무료 방문 실측 폼 작성' 버튼을 눌러주시면 원하시는 일정을 배정해 드립니다.`;
      }

      const botReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botReply]);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-[#121214] w-full max-w-md h-[620px] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-zinc-800">
        {/* Kakao Header */}
        <div className="bg-[#1E1815] text-[#FEE500] px-5 py-3.5 flex items-center justify-between border-b border-white/5 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FEE500] text-[#371D1E] flex items-center justify-center font-black text-sm">
              <MessageCircle className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-sm leading-tight flex items-center gap-1.5">
                <span>빛담건물썬팅 1:1 고객센터</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </h3>
              <span className="text-[10px] text-amber-300/80">실시간 전문 상담원 연결 중</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Message List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#0D0D0F]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-zinc-800 text-amber-400 flex items-center justify-center text-xs font-black shrink-0 border border-zinc-700">
                  빛담
                </div>
              )}
              <div
                className={`max-w-[78%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-md whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-[#FEE500] text-[#371D1E] rounded-br-none font-semibold'
                    : 'bg-[#18181B] text-zinc-200 rounded-tl-none border border-zinc-800'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] text-zinc-500 shrink-0">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Quick FAQ Chips */}
        <div className="px-3 py-2 bg-[#121214] border-t border-zinc-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-zinc-900 text-zinc-300 border border-zinc-700/80 hover:border-amber-500 hover:text-amber-400 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#121214] border-t border-zinc-800 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="문의하실 내용을 입력하세요..."
              className="flex-1 px-3.5 py-2.5 bg-zinc-900 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 border border-zinc-800 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-[#FEE500] hover:bg-[#FDD835] text-[#371D1E] transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Buttons: Free Form & External Kakao Link */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="flex-1 py-2 rounded-xl text-[11px] font-bold bg-amber-500 hover:bg-amber-600 text-zinc-950 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-950" />
              <span>무료 방문 실측 신청서 작성</span>
            </button>

            <a
              href={BRAND_INFO.kakaoChatUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-xl text-[11px] font-bold bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>카카오톡 채널</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

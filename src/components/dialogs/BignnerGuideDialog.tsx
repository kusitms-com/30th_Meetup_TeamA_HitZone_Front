import React, { useState } from 'react';
import Image from "next/image";
import reservationIcon from "../../assets/svg/reservation.svg";
import closeIcon from "../../assets/webp/close_button_gray.webp";

interface ChipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TipItem = ({ index, title, description }: { index: number; title: string; description: string }) => (
  <div className="my-3">
    <h3 className="text-sm text-grayscale-90 font-semibold flex items-center gap-[6px]">
      <span className="w-4 h-4 bg-main-40 rounded-full flex items-center justify-center text-white">{index}</span>
      {title}
    </h3>
    <div className="bg-grayscale-5 p-4 rounded-lg mt-2">
      <p className="text-grayscale-90 text-sm">{description}</p>
    </div>
  </div>
);

const BignnerGuideDialog = ({ isOpen, onClose }: ChipModalProps) => {
  const [activeTab, setActiveTab] = useState<'booking' | 'tips'>('booking');

  if (!isOpen) return null;

  const ticketingGroups = [
    { title: '티켓링크 예매 구단', teams: '삼성 라이온즈, KT 위즈, KIA 타이거즈, LG 트윈스, SSG 랜더스, 한화 이글스', link: 'https://www.ticketlink.co.kr/sports/baseball/' },
    { title: '인터파크 예매 구단', teams: '키움 히어로즈, 두산 베어스', link: 'https://ticket.interpark.com/Contents/Sports/Bridge/baseball' },
    { title: '롯데자이언츠', link: 'https://ticket.giantsclub.com/loginForm.do' },
    { title: 'NC 다이노스', link: 'https://www.ncdinos.com/auth/ticket.do' }
  ];

  const tips = [
    { title: '타인이 불편할 행동과 말은 삼가해요.', description: '자유로운 분위기여도 타이밍 불편할 행동과 말은 하지 않는 것이 좋아요! 또한, 각 좌석마다 특징이 있어요. 예를 들어 "응원지정석"의 경우 해당 팀의 팬들이 열정적으로 응원하는 공간이므로, 다른 팀을 응원하는 건 지양해주세요.' },
    { title: '파울볼은 항상 주의해요.', description: '야구장에서는 파울볼이 관중석으로 날아오는 일이 자주 발생해요! 경기 중에는 항상 경기에 집중하고, 파울볼 경고 방송에 귀를 기울이세요. 위험한 상황이 생기면 스태프나 주변 관중이 주의를 환기할 수 있습니다.' },
    { title: '자리 이동은 경기 중간에 해요.', description: '경기 도중 자리에서 일어나면 뒤쪽 관중들의 시야를 방해할 수 있습니다. 자리를 이탈하거나 돌아올 때는 경기 중간에 이동하는 것이 좋습니다.' },
    { title: '다양한 응원 도구는 적절하게 사용해요.', description: '야구장에서는 응원 도구(풍선, 클래퍼, 깃발 등)를 사용하는 것이 흔하지만, 크거나 소리가 큰 도구는 주위 사람들을 방해할 수 있으므로 적절하게 사용해야 해요.' }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg max-w-md max-h-[90vh] flex flex-col">
        {/* 모달창 타이틀 고정 */}
        <div className="flex justify-between items-center p-5">
          <h2 className="text-lg font-bold text-grayscale-90">야구장 초보 가이드</h2>
          <button onClick={onClose}>
            <Image src={closeIcon} alt="닫기 버튼" width={24} height={24} />
          </button>
        </div>

        {/* 2가지 상단 탭 고정 */}
        <div className="flex px-5">
          <button
            className={`flex-1 py-3 px-2 text-center font-semibold ${activeTab === 'booking' ? 'text-main-50 border-b-2 border-main-50' : 'text-grayscale-20 border-b-2'}`}
            onClick={() => setActiveTab('booking')}
          >
            좌석 예매
          </button>
          <button
            className={`flex-1 py-3 px-2 text-center font-semibold ${activeTab === 'tips' ? 'text-main-50 border-b-2 border-main-50' : 'text-grayscale-20 border-b-2'}`}
            onClick={() => setActiveTab('tips')}
          >
            야구 직관 Tip
          </button>
        </div>

        {/* 스크롤시 이동하는 영역 */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-5">
            {/* 좌석 예매 */}
            {activeTab === 'booking' ? (
              <>
                {/* 블록 특징 영역 */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mt-4 mb-2 text-grayscale-90">블록 특징</h3>
                  <div className="bg-grayscale-5 py-3 px-[14px] rounded-lg mb-2 font-medium text-sm">
                    <p className="text-grayscale-90">
                        야구장에서 구역은 보통 블록으로 나뉘어져 있는데, 각 블록은 종별로 단가가 있어요. 각 종에서 경기를 다른 각도에서 볼 수 있으며, 위로 올라갈수록 먼 거리에서 경기를 관람할 수 있어요.
                    </p>
                    <p className="text-grayscale-90 mt-4">
                        <span className="text-main-50 font-semibold">*</span>잠실야구장은 블록이 종별로 단가가 있는 구조로, 각 종의 관람석이 서로 다른 높이에 배치되어 있어요!
                    </p>
                </div>
                </div>
                {/* 구단별 예매 영역 */}
                <div>
                  <h3 className="text-lg font-bold mb-2 text-grayscale-90">구단별 예매</h3>
                  {ticketingGroups.map((group, index) => (
                    <div key={index} className="mb-4 border p-4 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-grayscale-90 font-semibold">{group.title}</span>
                        <Image
                          src={reservationIcon}
                          alt="예매하러가기"
                          width={90}
                          height={21}
                          onClick={() => window.open(group.link, "_blank")}
                          style={{ cursor: 'pointer' }}
                        />
                      </div>
                      {group.teams && (
                        <div className="bg-grayscale-5 p-4 rounded-lg">
                          <p className="text-grayscale-60 font-medium text-xs">{group.teams}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* 야구 직관 Tip */}
                <div>
                  <h3 className="text-lg font-bold mt-4 mb-2 text-grayscale-90">야구장 관람 매너</h3>
                  {tips.map((tip, index) => (
                    <TipItem key={index} index={index + 1} title={tip.title} description={tip.description} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* 챗봇 질문 고정 */}
        <div className="p-5 bg-white">
          <button className="w-full py-3 text-center font-semibold text-sm text-main-50 bg-main-5 rounded-lg">
            챗봇에게 질문하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BignnerGuideDialog;

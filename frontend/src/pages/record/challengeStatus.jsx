import React, { useState } from 'react';
import Leaf from '../../../public/svg/leaf.svg?react';
import LeafActiveOFF from '../../../public/svg/LeafActiveOFF.svg?react';
import LeafActiveON from '../../../public/svg/LeafActiveON.svg?react';
import { useNavigate } from 'react-router-dom';

export default function ChallengeStatus() {
  const [currentStreak, setCurrentStreak] = useState(4);
  const [totalDays] = useState(5);
  const navigate = useNavigate();

  // 챌린지 기록 데이터
  const challengeHistory = [
    {
      id: 1,
      title: '추천 차 5번 마셔보기!',
      date: '2025-09-06',
    },
    {
      id: 2,
      title: '기록 10번 해보기!',
      date: '2025-09-06',
    }, 
    {
      id: 3,
      title: '차 탐험가! (5종류)',
      date: '2025-09-06',
    },
    {
      id: 4,
      title: '연속 3일! 차 마시기',
      date: '2025-09-06',
    },
  ];

  const handleNewTea = () => {
    navigate('/recommend/moodpick');
  };

  const handleOtherChallenge = () => {
    navigate('/record');
  };

  const renderStamps = () => {
    const stamps = [];
    for (let i = 0; i < totalDays; i++) {
      const isCompleted = i < currentStreak;
      stamps.push(
        <div
          key={i}
          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            isCompleted
              ? 'bg-white border-green-700 shadow-md'
              : 'bg-white bg-opacity-50 border-white'
          }`}
        >
          {isCompleted ? (
            <LeafActiveON className="w-6 h-6 " />
          ) : (
            <LeafActiveOFF className="w-6 h-6" />
          )}
        </div>
      );
    }
    return stamps;
  };

  return (
    <div className="mx-5 overflow-y-auto mb-16">
      <div className="mt-2">
        <h1 className="font-bold text-2xl text-black">챌린지 현황</h1>
      </div>

      {/* 챌린지 현황 */}
      <div className="mt-2">
        <div className="bg-main-200 rounded-2xl p-6">
          {/* Challenge Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              추천받은 차 5번 마시기
            </h2>
          </div>

          {/* 스탬프 */}
          <div className="flex justify-center gap-4 mb-4">{renderStamps()}</div>

          {/* 남은 챌리지 횟수 */}
          <div className="text-center mb-6">
            <p className="text-white text-base">
              남은 챌린지 횟수{' '}
              <span className="font-bold">{totalDays - currentStreak}회</span>
            </p>
          </div>

          {/* 세로운 차 추천 버튼*/}
          <button
            onClick={handleNewTea}
            className="w-full h-12 bg-white rounded-3xl text-lg] text-black font-medium hover:bg-gray-100 transition-colors duration-200 active:scale-95"
          >
            새로운 차 추천받기
          </button>
        </div>
      </div>

      {/* 작업 현황 */}
      <div className="mt-20">
        <h3 className="text-xl font-bold text-black mb-4">작업 현황</h3>

        <div className="space-y-3">
          {challengeHistory.map((item, index) => (
            <div
              key={item.id}
              className="rounded-[15px] p-4 transition-all duration-200 bg-main-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-xs text-main0-300 mb-1">
                    스탬프 1개 적립
                  </div>
                  <h4 className="text-lg font-bold text-main-300 mb-1">
                    {item.title}
                  </h4>
                  {item.date && (
                    <p className="text-sm text-main-300">{item.date}</p>
                  )}
                </div>

                {/* Stamp Icon */}
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                    item.is_completed
                      ? 'bg-white border-green-700'
                      : 'bg-white bg-opacity-50 border-white'
                  }`}
                >
                  <LeafActiveON className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleOtherChallenge}
        className="mt-14 w-full h-16 bg-main-200 rounded-2xl text-lg text-black font-medium hover:bg-main-100 transition-colors duration-200 active:scale-95"
      >
        다른 챌린지 보기
      </button>
    </div>
  );
}

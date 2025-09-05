import React, { useState } from 'react';
import { teaImageMap } from '@/constants/teaImageData';
import Bear from '../../../public/svg/bear.svg?react';
import { useNavigate, useLocation } from 'react-router-dom';

// mock - 실제로는 API에서 description을 받아올 수 있지만 fallback용
const teaDescriptions = {
  우전: '잘 익은 생차는 변온맛이 사라지고 대추나 약재 같은 기분 좋은 단맛이 남니다.',
  용정차: '맑고 상쾌한 맛으로 봄의 기운을 느낄 수 있는 대표적인 녹차입니다.',
  세작: '은은한 향과 깔끔한 맛이 특징인 우리나라 전통 녹차입니다.',
  벽라춘: '섬세한 향과 부드러운 맛이 조화를 이루는 고급 녹차입니다.',
  백호은침: '은은한 단맛과 화사한 향이 특징인 백차의 대표주자입니다.',
  백모단: '부드럽고 깔끔한 맛으로 차 입문자에게 추천하는 백차입니다.',
  군산은침: '깊은 풍미와 단맛이 조화를 이루는 전통 황차입니다.',
  곽산황아: '은은한 향과 부드러운 맛이 특징인 고급 황차입니다.',
  철관음: '진한 향과 깊은 맛이 특징인 대표적인 우롱차입니다.',
  대홍포: '강렬한 향과 깊은 맛으로 많은 사랑을 받는 암차입니다.',
  동방미인: '화려한 향과 달콤한 맛이 특징인 고급 우롱차입니다.',
  기문홍차: '진한 색과 깊은 향이 특징인 중국의 대표 홍차입니다.',
  다즐링: '섬세한 향과 상쾌한 맛으로 홍차의 샴페인이라 불립니다.',
  우바: '진한 맛과 강한 향이 특징인 스리랑카산 홍차입니다.',
  아쌈: '진하고 몰티한 맛이 특징인 인도의 대표 홍차입니다.',
  '보이차(숙차)': '깊고 진한 맛과 향이 특징인 중국의 전통 흑차입니다.',
  육보차: '부드럽고 달콤한 맛이 특징인 광서성의 전통 흑차입니다.',
};

const teaTags = {
  우전: ['달달한', '편안한'],
  용정차: ['상쾌한', '깔끔한'],
  세작: ['담백한', '은은한'],
  벽라춘: ['부드러운', '고급스러운'],
  백호은침: ['달달한', '화사한'],
  백모단: ['부드러운', '깔끔한'],
  군산은침: ['깊은', '달달한'],
  곽산황아: ['은은한', '부드러운'],
  철관음: ['진한', '깊은'],
  대홍포: ['강렬한', '깊은'],
  동방미인: ['화려한', '달달한'],
  기문홍차: ['진한', '깊은'],
  다즐링: ['섬세한', '상쾌한'],
  우바: ['진한', '강한'],
  아쌈: ['진한', '몰티한'],
  '보이차(숙차)': ['깊은', '전통적인'],
  육보차: ['부드러운', '달달한'],
};

export default function TeaRecommendation() {
  const navigate = useNavigate();
  const location = useLocation();

  // 이전 페이지에서 전달받은 데이터
  const { recommendation } = location.state || {};

  // API 응답에서 차 정보 추출
  const teaInfo = recommendation?.tea || recommendation;
  const currentTea = teaInfo?.name || '우전';
  const teaDescription = teaInfo?.description || teaDescriptions[currentTea];
  const teaTaste = teaInfo?.taste || '';

  const [isRetrying, setIsRetrying] = useState(false);

  console.log('전달받은 데이터:', location.state);
  console.log('차 정보:', teaInfo);

  // 재추천 API 호출
  const handleRetry = async () => {
    try {
      setIsRetrying(true);

      if (teaInfo?.taste_id) {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/recommendations/filter/taste/?taste_id=${teaInfo.taste_id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const newRecommendation = await response.json();
          console.log('재추천 데이터:', newRecommendation);

          // 새로운 추천으로 페이지 업데이트 또는 다시 navigate
          navigate('/recommend/result', {
            state: {
              recommendation: newRecommendation,
            },
            replace: true,
          });
        } else {
          throw new Error('재추천 API 호출 실패');
        }
      } else {
        alert('재추천을 위한 데이터가 없습니다.');
      }
    } catch (error) {
      console.error('재추천 실패:', error);
      alert('재추천에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsRetrying(false);
    }
  };

  const handleLike = async () => {
    navigate('/record');
  };

  return (
    <div className="mt-5 mx-5">
      <div className="bg-main-100 rounded-3xl px-6 pt-6 flex flex-col">
        {/* 차 이미지 */}
        <div className="bg-white rounded-2xl h-64 mb-6 overflow-hidden flex items-center justify-center">
          <img
            src={teaImageMap[currentTea]}
            alt={currentTea}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 차 정보 */}
        <div className="text-center mb-4">
          <p className="text-base text-main-300 font-semibold mb-1">
            오늘에는!
          </p>
          <h1 className="text-2xl font-bold text-black mb-4">{currentTea}</h1>

          {/* 맛 태그 - API에서 받은 taste 정보 또는 기본 태그 사용 */}
          <div className="flex justify-center gap-2 mb-4">
            {teaTaste && (
              <span className="px-4 py-2 bg-main-200 bg-opacity-50 rounded-full text-sm font-bold text-main-300">
                {teaTaste}
              </span>
            )}
            {teaTags[currentTea]?.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-main-200 bg-opacity-50 rounded-full text-xs font-bold text-main-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 설명 - API에서 받은 description 사용 */}
        <div className="text-center text-sm text-black mb-6 flex-1 flex items-center justify-center">
          <p>{teaDescription}</p>
        </div>

        {/* 곰 이미지 */}
        <div className="flex justify-end z-10">
          <Bear />
        </div>
      </div>

      {/* 재추천 버튼 */}
      <div className="mt-14 flex justify-center">
        <button
          onClick={handleRetry}
          disabled={isRetrying}
          className={`w-40 h-9 bg-gray-100 rounded-full text-base text-gray-500 font-medium transition-all duration-300 ${
            isRetrying
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-300 active:scale-95'
          }`}
        >
          {isRetrying ? '재추천 중...' : '재추천해주세요'}
        </button>
      </div>

      {/* 마셔볼래요 버튼 */}
      <div className="mt-3">
        <button
          onClick={handleLike}
          className="w-full h-16 bg-main-200 rounded-2xl flex items-center justify-center hover:opacity-90 transition-all duration-300 active:scale-95"
        >
          <span className="font-bold text-2xl text-main-300">마셔볼래요</span>
        </button>
      </div>
    </div>
  );
}

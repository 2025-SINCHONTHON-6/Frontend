import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Happy from '../../assets/recommend/Happy.svg?react';
import Angry from '../../assets/recommend/Angry.svg?react';
import Sad from '../../assets/recommend/Sad.svg?react';
import Suffer from '../../assets/recommend/Suffer.svg?react';
import Comfort from '../../assets/recommend/Comfort.svg?react';
import Tired from '../../assets/recommend/Tired.svg?react';
import { useNavigate } from 'react-router-dom';

// 제목
const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// 맛
const tasteContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.1, // 자식 요소들을 0.1초 간격 애니메이션
    },
  },
};

// 개별 맛 버튼 애니메이션
const tasteItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// 다음 버튼 애니메이션
const buttonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const MoodPick = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedTaste, setSelectedTaste] = useState(null);
  const [moodRecommendations, setMoodRecommendations] = useState([]);
  const [finalRecommendation, setFinalRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const emotionsData = [
    { name: '기쁨', Icon: Happy, color: 'bg-[#C0F1FF]' },
    { name: '화남', Icon: Angry, color: 'bg-[#FFF0E5]' },
    { name: '슬픔', Icon: Sad, color: 'bg-[#E0FFAF]' },
    { name: '괴로움', Icon: Suffer, color: 'bg-[#E6E6E6]' },
    { name: '편안함', Icon: Comfort, color: 'bg-[#FFE6AF]' },
    { name: '피곤함', Icon: Tired, color: 'bg-[#FFC6AF]' },
  ];
  const tastes = ['달달한', '과일', '꽃', '허브', '진함', '씁쓸함', '부드러운'];

  // 감정 기반 추천 API 호출
  const fetchMoodRecommendations = async (mood) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/recommendations/filter/mood/?mood=${mood}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('감정 기반 추천 데이터:', data);

      if (
        data &&
        data.tastes &&
        Array.isArray(data.tastes) &&
        data.tastes.length > 0
      ) {
        setMoodRecommendations(data.tastes);
        return data.tastes[0].id; // 첫 번째 taste 객체의 id 반환
      } else {
        console.warn('추천 데이터가 없습니다.');
        return null;
      }
    } catch (error) {
      console.error('감정 기반 추천 API 호출 실패:', error);
      alert('추천 데이터를 가져오는데 실패했습니다. 다시 시도해주세요.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 맛 기반 API 호출
  const fetchTasteRecommendation = async (tasteId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/recommendations/filter/taste/?taste_id=${tasteId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('맛 기반 최종 추천 데이터:', data);

      if (data) {
        setFinalRecommendation(data);
        return data;
      } else {
        console.warn('최종 추천 데이터가 없습니다.');
        return null;
      }
    } catch (error) {
      console.error('맛 기반 추천 API 호출 실패:', error);
      alert('최종 추천 데이터를 가져오는데 실패했습니다. 다시 시도해주세요.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleEmotionSelect = async (emotion) => {
    setSelectedEmotion(emotion);
    setSelectedTaste(null); // 감정 변경 시 맛 선택 초기화

    // 감정 선택 시 즉시 API 호출
    const tasteId = await fetchMoodRecommendations(emotion);
    if (tasteId) {
      console.log('추출된 taste_id:', tasteId);
    }
  };

  const handleTasteSelect = (taste) => {
    setSelectedTaste((prevTaste) => (prevTaste === taste ? null : taste));
  };

  const handleNext = async () => {
    if (selectedEmotion && selectedTaste) {
      if (moodRecommendations.length > 0) {
        const tasteId = moodRecommendations[0].id;

        // 두 번째 API 호출
        const recommendation = await fetchTasteRecommendation(tasteId);
        console.log(recommendation);

        if (recommendation) {
          // 추천 결과와 함께 다음 페이지로 이동
          navigate('/recommend/result', {
            state: {
              selectedEmotion,
              selectedTaste,
              recommendation,
              moodRecommendations, // tastes 배열이 저장됨
            },
          });
        }
      } else {
        alert('추천 데이터가 없습니다. 감정을 다시 선택해주세요.');
      }
    } else {
      alert('감정과 맛을 모두 선택해주세요.');
    }
  };

  return (
    <div className="mt-10 mx-5">
      {/* 로딩 상태 표시 */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main-300 mb-4"></div>
            <p className="text-lg font-medium">추천 데이터를 가져오는 중...</p>
          </div>
        </div>
      )}

      {/* 제목 */}
      <motion.div
        key={selectedEmotion ? 'taste-question' : 'emotion-question'}
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="font-bold text-3xl text-black">
          {selectedEmotion ? (
            <>
              오늘 끌리는 맛을
              <br />
              선택해주세요
            </>
          ) : (
            '오늘의 기분은 어떠신가요'
          )}
        </h1>
      </motion.div>

      {/* 감정 선택 */}
      <div className="mt-20">
        <div className="flex justify-between items-center">
          {emotionsData.map((emotion) => {
            const isSelected = selectedEmotion === emotion.name;
            const hasSelection = selectedEmotion !== null;
            return (
              <div key={emotion.name} className="flex flex-col items-center">
                <motion.button
                  onClick={() => handleEmotionSelect(emotion.name)}
                  disabled={loading}
                  className={`
                    w-12 h-16 rounded-2xl flex items-center justify-center 
                    transition-all duration-300 border-2 
                    ${emotion.color} 
                    ${isSelected ? 'border-main-300' : 'border-transparent'} 
                    ${
                      hasSelection && !isSelected ? 'opacity-50' : 'opacity-100'
                    }
                    ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}
                  `}
                  whileHover={!loading ? { scale: 1.1 } : {}}
                  whileTap={!loading ? { scale: 0.95 } : {}}
                >
                  <emotion.Icon className="w-9 h-9" />
                </motion.button>
                <span
                  className={`mt-3 text-base ${
                    isSelected
                      ? 'text-main-300 font-bold'
                      : 'text-black font-normal'
                  }`}
                >
                  {emotion.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 맛 선택 */}
      <AnimatePresence>
        {selectedEmotion && !loading && (
          <motion.div
            className="mt-24"
            variants={tasteContainerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex flex-wrap justify-start gap-4 py-2">
              {tastes.map((taste) => (
                <motion.div key={taste} variants={tasteItemVariants}>
                  <button
                    className={`px-8 h-10 rounded-full text-base border transition-colors duration-200 ${
                      selectedTaste === taste
                        ? 'bg-main-100 border-main-300 text-main-300'
                        : 'bg-gray-50 border-black text-black hover:bg-gray-200'
                    }`}
                    onClick={() => handleTasteSelect(taste)}
                  >
                    {taste}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 다음 버튼 */}
      <div className="mt-32">
        <AnimatePresence>
          {selectedEmotion && selectedTaste && !loading && (
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <button
                onClick={handleNext}
                className="w-full h-16 rounded-2xl flex items-center justify-center bg-main-200 hover:bg-main-300 transition-colors duration-200"
              >
                <span className="font-bold text-2xl text-main-300">
                  다음으로
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MoodPick;

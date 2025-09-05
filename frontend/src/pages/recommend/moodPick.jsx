import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Happy from '../../assets/recommend/Happy.svg?react';
import Angry from '../../assets/recommend/Angry.svg?react';
import Sad from '../../assets/recommend/Sad.svg?react';
import Suffer from '../../assets/recommend/Suffer.svg?react';
import Comfort from '../../assets/recommend/Comfort.svg?react';
import Tired from '../../assets/recommend/Tired.svg?react';

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

  const emotionsData = [
    { name: '기쁨', Icon: Happy, color: 'bg-[#C0F1FF]' },
    { name: '화남', Icon: Angry, color: 'bg-[#FFF0E5]' },
    { name: '슬픔', Icon: Sad, color: 'bg-[#E0FFAF]' },
    { name: '괴로운', Icon: Suffer, color: 'bg-[#E6E6E6]' },
    { name: '편안한', Icon: Comfort, color: 'bg-[#FFE6AF]' },
    { name: '피곤함', Icon: Tired, color: 'bg-[#FFC6AF]' },
  ];
  const tastes = ['달달한', '과일', '꽃', '허브', '진한', '씁쓸한', '부드러운'];

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleTasteSelect = (taste) => {
    setSelectedTaste((prevTaste) => (prevTaste === taste ? null : taste));
  };

  const handleNext = () => {
    if (selectedEmotion && selectedTaste) {
      alert(`선택한 감정: ${selectedEmotion}\n선택한 맛: ${selectedTaste}`);
    } else {
      alert('감정과 맛을 모두 선택해주세요.');
    }
  };

  return (
    <div className="mt-10 mx-5">
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
                  className={`
                    w-12 h-16 rounded-2xl flex items-center justify-center 
                    transition-all duration-300 border-2 
                    ${emotion.color} 
                    ${isSelected ? 'border-main-300' : 'border-transparent'} 
                    ${
                      hasSelection && !isSelected ? 'opacity-50' : 'opacity-100'
                    }
                  `}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
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
        {selectedEmotion && (
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
          {selectedEmotion && selectedTaste && (
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <button
                onClick={handleNext}
                className="w-full h-16 rounded-2xl flex items-center justify-center bg-main-200"
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

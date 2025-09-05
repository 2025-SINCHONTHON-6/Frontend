import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import RecordTab from '@/components/home/recordTab';
import Challenge from '@/components/record/challenge';
import { teaImageMap } from '@/constants/teaImageData';
import noRecordIcon from '../../../public/svg/no_record.svg';

export default function Record() {
  const navigate = useNavigate();
  const [currentTea, setCurrentTea] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTea() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/challenges/recommendations/recent/`,
          {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${window.localStorage.getItem(
                'accessToken'
              )}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('something went wrong');
        }
        const data = await response.json();
        setCurrentTea(data.name);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTea();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] w-auto bg-black flex justify-center">
        <main className="relative w-full max-w-[390px] pl-[20px] pr-[20px] items-center bg-white">
          <div className="flex flex-col items-center gap-[20px]">
            <Outlet />
            <h3>loading...</h3>
          </div>
        </main>
      </div>
    );
  }

  const teaImageSource = teaImageMap[currentTea];

  if (!currentTea) {
    return (
      <div className="min-h-[100dvh] w-auto bg-black flex justify-center">
        <main className="relative w-full max-w-[390px] pl-[20px] pr-[20px] items-center bg-white">
          <div className="flex flex-col items-center gap-[20px]">
            <Outlet />

            <div className="flex-col items-center justify-center w-[100%] h-auto p-[30px] mb-[15px] rounded-[30px] bg-main-100 ">
              <div className="flex flex-col items-center w-[100%]">
                <h2 className="text-[24px] font-[700] text-main-300">
                  추천받은 차를 다 기록했어요!
                </h2>
                <img src={noRecordIcon} alt="" className="m-1" />
              </div>
              <div className="flex justify-center ">
                <button
                  className="text-main-300 w-[100%] p-5 text-[24px] font-[700] rounded-[20px] bg-white"
                  onClick={() => navigate('/recommend/moodpick')}
                >
                  새로운 차 추천받기
                </button>
              </div>
            </div>

            <div className="flex flex-col items-start h-auto w-[100%]">
              <p className="flex text-[24px] text-black font-bold pb-1">
                나의 차 기록
              </p>
              <p className="text-[16px] text-[#8B8B8B] font-normal pb-3">
                매일매일 차를 마시고 기록해봐요
              </p>
              <RecordTab />
            </div>

            <div className="flex flex-col items-start w-[100%]">
              <p className="flex text-[24px] text-black font-bold pb-1">
                나의 차 챌린지
              </p>
              <p className="text-[16px] text-[#8B8B8B] font-normal pb-3">
                차를 마시며 매일매일 챌린지를 해요
              </p>
              <Challenge /> 
            </div>
           
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] w-auto bg-black flex justify-center">
      <main className="relative w-full max-w-[390px] pl-[20px] pr-[20px] items-center bg-white">
        <div className="flex flex-col items-center gap-[20px]">
          <Outlet />

          <div className="flex-col items-center justify-center w-[100%] h-auto p-[30px] mb-[15px] rounded-[30px] bg-main-100 ">
            <div className="flex justify-between gap-2">
              <div className="flex-col">
                <h2 className="text-[24px] font-[700] mb-[50px]">
                  추천받은 차
                </h2>
                <h4 className="text-main-300 text-[16px] font-[700]">
                  오늘의 추천은
                </h4>
                <h3 className="text-black text-[24px] font-[400]">
                  {currentTea}
                </h3>
              </div>
              <div className="w-[150px] flex items-center">
                {teaImageSource && (
                  <img
                    src={teaImageSource}
                    alt={currentTea}
                    className="w-[150px] h-[150px] border-none rounded-[19px]"
                  />
                )}
                {!teaImageSource && <p>이미지 없음</p>}
              </div>
            </div>
            <div className="flex justify-center ">
              <button
                className="text-main-300 w-[100%] p-5 mt-9 text-[24px] font-[700] rounded-[20px] bg-white"
                onClick={() => navigate('/record/write')}
              >
                차 기록하기
              </button>
            </div>
          </div>

          <div className="flex flex-col items-start w-[100%]">
            <h2 className="text-[24px] font-[700] mb-2">나의 차 기록</h2>
            <h4 className="text-gray-400 text-[16px] font-[700] mb-1">
              매일매일 차를 마시고 기록해봐요
            </h4>
          </div>

          <div className="flex-col justify-center w-[100%] h-auto rounded-[30px] bg-[#FFFDE3] ">
            <div className="m-[36px] flex justify-between gap-2">
              <div className="flex-col">
                <h2 className="text-[28px] font-[700]">챌린지 판</h2>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { teaImageMap } from '@/constants/teaImageData';
import good_green from '../../../public/svg/good_green.svg';
import soso_green from '../../../public/svg/soso_green.svg';
import bad_green from '../../../public/svg/bad_green.svg';

export default function RecordDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const date = searchParams.get('created_at');

    const [teaInfo, setTeaInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const reviewIcons = {
      '좋았어요': good_green,
      '그냥그래요': soso_green,
      '별로예요': bad_green,
    };
  
    useEffect(() => {
      async function fetchTeaRecord() {
        if (!date) {
          setIsLoading(false);
          return;
        }

        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/challenges/records/daily/?created_at=${date}`,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem(
                  "accessToken"
                )}`,
              },
            }
          );
  
          if (!response.ok) {
            throw new Error("something went wrong");
          }
          const data = await response.json();
          setTeaInfo(data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }finally{
          setIsLoading(false);
        }
      }
      fetchTeaRecord();
    }, [date]);
  
    if (isLoading) {
      return (
        <div className="min-h-[100dvh] w-auto bg-black flex justify-center">
        <main className="relative w-full max-w-[390px] pl-[20px] pr-[20px] items-center bg-white">
          <div className='flex flex-col items-center gap-[20px]'>
              <Outlet />
              <h3>loading...</h3>
          </div>
          </main>
        </div>
      )
    }
  

  if (!teaInfo) {
    return (
      <div className="min-h-[100dvh] w-auto bg-black flex justify-center">
        <main className="relative w-full max-w-[390px] pl-[20px] pr-[20px] items-center bg-white">
          <div className='flex flex-col items-center gap-[20px]'>
            <Outlet />
            <p>해당 날짜의 기록을 찾을 수 없습니다.</p>
          </div>
        </main>
      </div>
    );
  }

  const teaImageSource = teaImageMap[teaInfo.tea.name];
  const feelingIcon = reviewIcons[teaInfo.feeling];

  return (
    <div className="min-h-[100dvh] w-auto bg-black flex justify-center">
      <main className="relative w-full max-w-[390px] bg-white">
        <div className='flex flex-col items-center gap-[20px] pl-[20px] pr-[20px]'>
          <Outlet />
          
          <div className='flex w-[100%] items-center justify-between'>
            <div>
              <h4 className='text-main-300 text-[17px] font-[600] mb-1'>감상 기록</h4>
              <h1 className='text-black text-[24px] font-[300]'>{teaInfo.created_at}</h1>
            </div>
            <div className='w-[150px] flex items-center justify-center'>
              {/* {teaImageSource ? (
                <img src={teaImageSource} alt={teaInfo.tea.name} className='w-[150px] h-[150px] border-none rounded-[19px]' />
              ) : (
                <p>이미지 없음</p>
              )} */}
            </div>
          </div>
          
          <div className="flex-col items-center justify-center w-[100%] h-auto p-[30px] rounded-[30px] bg-main-100 ">
            <div className='flex justify-between gap-2'>
              <div className='flex-col'>
                <h2 className='text-[24px] font-[700] mb-[10px]'>추천받은 차</h2>
                <div className='p-[5px] flex justify-center items-center gap-2 mb-[20px] bg-main-200 rounded-[30px]'>
                  <img src={feelingIcon} alt={teaInfo.feeling} className='w-[21px] h-[21px]'/>
                  <p className='text-[12px] font-[500] text-main-300'>{teaInfo.feeling}</p>
                </div>
                <h4 className='text-main-300 text-[16px] font-[700]'>이날의 추천은</h4>
                <h3 className='text-black text-[24px] font-[400]'>{teaInfo.tea.name}</h3>
              </div>
              <div className='w-[150px] flex items-center'>
                {teaImageSource && <img src={teaImageSource} alt={teaInfo.tea.name} className='w-[150px] h-[150px] border-none rounded-[19px]' />}
              </div>
            </div>
            <p className='mt-4 text-[13px] font-[300]'>{teaInfo.tea.description}</p>
          </div>

          <div className='w-[100%] h-[145px] bg-gray-100 p-4 rounded-[20px]'>
            <p>{teaInfo.comment}</p>
          </div>

          <button className='w-[100%] pt-[18px] pb-[18px] flex justify-center items-center rounded-[20px] bg-main-200 text-main-300 text-[24px] font-[700]'
            onClick={() => navigate('/record')}>
            기록 보러가기
          </button>
        </div>
      </main>
    </div>
  );
}

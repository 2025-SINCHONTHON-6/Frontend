import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import teaDum from '../../../public/img/blackTea_1.jpg'
import good_green from '../../../public/svg/good_green.svg'

export default function RecordDetail() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100dvh] w-auto bg-black flex justify-center">
      <main className="relative w-full max-w-[390px] bg-white">
        <div className='flex flex-col items-center gap-[20px] pl-[20px] pr-[20px]'>
          <Outlet />

          <div className='flex w-[100%]'>
            <div>
              <h4 className='text-main-300 text-[17px] font-[600] mb-1'>감상 기록</h4>
              <h1 className='text-black text-[24px] font-[300]'>2025년 9월 6일</h1>
            </div>
            <img src="" alt="" />
          </div>
          
          <div className="flex-col items-center justify-center w-[100%] h-auto p-[30px] rounded-[30px] bg-main-100 ">
            <div className='flex justify-between gap-2'>
                <div className='flex-col'>
                  <h2 className='text-[24px] font-[700] mb-[10px]'>추천받은 차</h2>
                  <div className='p-[5px] flex justify-center items-center gap-2 mb-[20px] bg-main-200 rounded-[30px]'>
                    <img src={good_green} alt="" className='w-[21px] h-[21px]'/>
                    <p className='text-[12px] font-[500] text-main-300'>좋았어요</p>
                  </div>
                  <h4 className='text-main-300 text-[16px] font-[700]'>이날의 추천은</h4>
                  <h3 className='text-black text-[24px] font-[400]'>세작</h3>
                </div>
                <div className='w-[150px] flex items-center'>
                  <img src={teaDum} alt="" className='w-[150px] h-[150px] border-none rounded-[19px]'/>
                </div>
              </div>
              <p className='mt-4 text-[13px] font-[300]'>잘 익은 생차는 떫은맛이 사라지고 대추나 약재 같은 기분 좋은 단맛이 납니다.</p>
            </div>

            <div className='w-[100%] h-[145px] bg-gray-100 p-4 rounded-[20px]'>
              <p>리뷰리뷰리뷰</p>
            </div>

              <button className='w-[100%] pt-[18px] pb-[18px] flex justify-center items-center rounded-[20px] bg-main-200 text-main-300 text-[24px] font-[700]'
                onClick={()=>navigate('/record')}>
                기록 보러가기
              </button>
        </div>
      </main>
    </div>
  );
}

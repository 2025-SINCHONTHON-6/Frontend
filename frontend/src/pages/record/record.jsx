import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import teaDum from '../../../public/img/blackTea_1.jpg'
import RecordTab from '@/components/home/recordTab';

export default function Record() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] w-auto bg-black flex justify-center">
      <main className="relative w-full max-w-[390px] pl-[20px] pr-[20px] items-center bg-white">
        <div className='flex flex-col mt-[10px] items-center gap-[20px]'>
            <Outlet />

            <div className="flex-col items-center justify-center w-[100%] h-auto p-[30px] mb-[15px] rounded-[30px] bg-main-100 ">
                <div className='flex justify-between gap-2'>
                    <div className='flex-col'>
                        <h2 className='text-[24px] font-[700] mb-[50px]'>추천받은 차</h2>
                        <h4 className='text-main-300 text-[16px] font-[700] mb-1'>피곤한 오늘에는!</h4>
                        <h3 className='text-black text-[24px] font-[400]'>세작</h3>
                    </div>
                    <div className='w-[150px] flex items-center'>
                        <img src={teaDum} alt="" className='w-[150px] h-[150px] border-none rounded-[19px]'/>
                    </div>
                </div>
                <div className='flex justify-center '>
                    <button className='text-main-300 w-[100%] p-5 mt-9 text-[24px] font-[700] rounded-[20px] bg-white' onClick={()=>navigate('/record/write')}>차 기록하기</button>
                </div>
            </div>

            <div className='flex flex-col items-start w-[100%]'>
              <p className="flex text-[24px] text-black font-bold pb-1">나의 차 기록</p>
              <p className="text-[16px] text-[#8B8B8B] font-normal pb-3">매일매일 차를 마시고 기록해봐요</p>
              <RecordTab />
            </div>

        </div>
      </main>
    </div>
  );
}
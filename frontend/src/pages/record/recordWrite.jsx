import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import teaDum from '../../../public/img/blackTea_1.jpg'


export default function RecordWrite() {
  const [reviewSelect, setReviewSelect] = useState("");
  const reviewStates = ["좋았어요", "그저그럼", "별로예요"];

  return (
    <div className="min-h-[100dvh] w-screen bg-black flex justify-center">
      <main className="relative w-full max-w-[390px] bg-white">
        <div className='flex flex-col mt-[107px] items-center gap-[20px] m-[20px]'>
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
            </div>

            <div className='flex flex-col items-start justify-start w-[100%] gap-4'>
              <h4 className='text-[16px] font-[700]'> 차에 대한 감상은 어떠셨나요?</h4>
              <div className='flex gap-3 w-[100%] justify-around'>
                {reviewStates.map((reviewState) => (
                  <button key={reviewState} className='' onClick={()=>setReviewSelect(reviewState)}>
                    <div className={`w-[49px] h-[71px] rounded-[19px] mb-[11px] ${reviewSelect === reviewState ?  'bg-main-200' : 'bg-gray-200' }`}></div>
                    <p className='text-[16px] font-[400]'>{reviewState}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className='w-[100%]'>
              <h4 className='text-[16px] font-[700] mb-[16px]'>감상 기록</h4>
              <textarea placeholder='차에 대한 감상평을 남겨주세요!' className='w-[100%] h-[145px] m- bg-gray-200 p-4'/>
            </div>

            <button className='w-[100%] pt-[18px] pb-[18px] flex justify-center items-center bg-main-200 text-[28px] font-[700]'>기록 등록</button>

        </div>
      </main>
    </div>
  );
}

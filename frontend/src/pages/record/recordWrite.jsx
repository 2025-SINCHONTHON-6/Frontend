import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import teaDum from '../../../public/img/blackTea_1.jpg'
import good_green from '../../../public/svg/good_green.svg'
import good_grey from '../../../public/svg/good_grey.svg'
import soso_green from '../../../public/svg/soso_green.svg'
import soso_grey from '../../../public/svg/soso_grey.svg'
import bad_green from '../../../public/svg/bad_green.svg'
import bad_grey from '../../../public/svg/bad_grey.svg'
import { motion, AnimatePresence } from 'framer-motion';


export default function RecordWrite() {
  const [reviewSelect, setReviewSelect] = useState("");
  const [recordStatus, setRecordStatus] = useState("writing");
  const navigate = useNavigate();
  const reviewStates = [
    { name: "좋았어요", iconOn: good_green, iconOff: good_grey, id: "good" },
    { name: "그냥그럼", iconOn: soso_green, iconOff: soso_grey, id: "soso" },
    { name: "별로예요", iconOn: bad_green, iconOff: bad_grey, id: "bad" },
  ];

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  if (recordStatus === "writing"){
    return (
      <div className="min-h-[100dvh] w-auto bg-black flex justify-center">
        <main className="relative w-full max-w-[390px] bg-white">
          <div className='flex flex-col items-center gap-[20px] pl-[20px] pr-[20px]'>
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
  
              <div className='flex flex-col items-center justify-center w-[100%] gap-4'>
                <h4 className='text-main-300 text-[16px] font-[700]'> 차에 대한 감상은 어떠셨나요?</h4>
                <div className='flex gap-[48px] w-[100%] justify-center'>
                  {reviewStates.map((reviewState) => (
                    <button
                      key={reviewState.id}
                      className='flex flex-col items-center'
                      onClick={()=>setReviewSelect(reviewState.id)}
                    >
                    {reviewSelect === reviewState.id ?
                      <img src={reviewState.iconOn} alt="" />
                    : <img src={reviewState.iconOff} alt="" />
                    }
                      <p className={`text-[14px] font-[400] mt-2 ${reviewSelect === reviewState.id ?  'text-main-300' : 'text-gray-300'}`}>{reviewState.name}</p>
                    </button>
                  ))}
                </div>
              </div>
              {/* 리뷰 */}
              <AnimatePresence>
              {reviewSelect && (
                <motion.div
                  className='w-[100%] flex flex-col items-center mt-4'
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <h4 className='text-main-300 text-[16px] font-[700] mb-[16px]'>감상 기록</h4>
                  <textarea placeholder='차에 대한 감상평을 남겨주세요!' className='w-[100%] h-[145px] m- bg-gray-100 p-4 rounded-[20px]' />
                </motion.div>
              )}
            </AnimatePresence>
  
            <AnimatePresence>
              {reviewSelect && (
                <motion.button
                  className='w-[100%] pt-[18px] pb-[18px] flex justify-center items-center rounded-[20px] bg-main-200 text-main-300 text-[24px] font-[700]'
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  onClick={()=>setRecordStatus("recordFinish")}
                >
                  기록 등록
                </motion.button>
              )}
            </AnimatePresence>
  
          </div>
        </main>
      </div>
    );
  } else{
    return (
      <div className="min-h-[100dvh] w-auto bg-black flex justify-center">
        <main className="relative w-full max-w-[390px] bg-white">
          <div className='flex flex-col items-center gap-[20px] pl-[20px] pr-[20px]'>
              <Outlet />
  
              <div className="flex-col items-center justify-center w-[100%] h-auto p-[30px] mb-[15px] rounded-[30px] bg-main-100 ">
                  <div className='flex justify-between gap-2'>
                      <div className='flex-col'>
                        <h2 className='text-[24px] font-[700] mb-[10px]'>추천받은 차</h2>
                        <div className='p-[5px] flex justify-center items-center gap-2 mb-[20px] bg-main-200 rounded-[30px]'>
                          <img src={good_green} alt="" className='w-[21px] h-[21px]'/>
                          <p className='text-[12px] font-[500] text-main-300'>좋았어요</p>
                        </div>
                          <h4 className='text-main-300 text-[16px] font-[700]'>피곤한 오늘에는!</h4>
                          <h3 className='text-black text-[24px] font-[400]'>세작</h3>
                      </div>
                      <div className='w-[150px] flex items-center'>
                        <img src={teaDum} alt="" className='w-[150px] h-[150px] border-none rounded-[19px]'/>
                      </div>
                  </div>
              </div>

              <div className='w-[100%] h-[145px] mb-[80px] bg-gray-100 p-4 rounded-[20px]'>
                <p>리뷰리뷰리뷰</p>
              </div>

              <h4 className='text-[16px] font-[400] text-gray-500'>차 기록이 등록되었어요!</h4>
              <button className='w-[100%] pt-[18px] pb-[18px] flex justify-center items-center rounded-[20px] bg-main-200 text-main-300 text-[24px] font-[700]'
                onClick={()=>navigate('/record')}>
                기록 보러가기
              </button>
  
          </div>
        </main>
      </div>
    );
  }

  
}

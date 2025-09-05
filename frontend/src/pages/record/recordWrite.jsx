import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import good_green from '../../../public/svg/good_green.svg'
import good_grey from '../../../public/svg/good_grey.svg'
import soso_green from '../../../public/svg/soso_green.svg'
import soso_grey from '../../../public/svg/soso_grey.svg'
import bad_green from '../../../public/svg/bad_green.svg'
import bad_grey from '../../../public/svg/bad_grey.svg'
import { motion, AnimatePresence } from 'framer-motion';
import { teaImageMap } from '@/constants/teaImageData';


export default function RecordWrite() {
  const [reviewSelect, setReviewSelect] = useState("");
  const [writeReview, setWriteReview] = useState("");
  const [recordStatus, setRecordStatus] = useState("writing");
  const [currentTea, setCurrentTea] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const reviewStates = [
    { name: "좋았어요", iconOn: good_green, iconOff: good_grey},
    { name: "그냥그래요", iconOn: soso_green, iconOff: soso_grey},
    { name: "별로예요", iconOn: bad_green, iconOff: bad_grey},
  ];

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  useEffect(() => {
      async function fetchTea() {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/challenges/recommendations/recent/`,
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
          setCurrentTea(data.name);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }finally{
          setIsLoading(false);
        }
      }
      fetchTea();
    }, []);
  
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
  
    const teaImageSource = teaImageMap[currentTea];

    const handleReviewSubmit = async () => {  
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/challenges/log/`,
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${window.localStorage.getItem("accessToken")}`,
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify({
              "feeling": reviewSelect,
              "comment": writeReview,
            }),
          }
        );
  
        if (!response.ok) {
          throw new Error("리뷰 등록 실패");
        }
  
        alert("리뷰가 성공적으로 등록되었습니다.");
        setRecordStatus("recordFinish");
  
      } catch (error) {
        console.error("리뷰 작성 중 오류 발생:", error);
        alert("리뷰 등록에 실패했습니다. 다시 시도해 주세요.");
      }
    };
  
  const selectedReview = reviewStates.find(state => state.name === reviewSelect);

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
                          <h4 className='text-main-300 text-[16px] font-[700] mb-1'>오늘의 추천은</h4>
                          <h3 className='text-black text-[24px] font-[400]'>{currentTea}</h3>
                      </div>
                      <div className='w-[150px] flex items-center'>
                        {teaImageSource && <img src={teaImageSource} alt={currentTea} className='w-[150px] h-[150px] border-none rounded-[19px]' />}
                        {!teaImageSource && <p>이미지 없음</p>}                      
                      </div>
                  </div>
              </div>
  
              <div className='flex flex-col items-center justify-center w-[100%] gap-4'>
                <h4 className='text-main-300 text-[16px] font-[700]'> 차에 대한 감상은 어떠셨나요?</h4>
                <div className='flex gap-[48px] w-[100%] justify-center'>
                  {reviewStates.map((reviewState) => (
                    <button
                      key={reviewState.name}
                      className='flex flex-col items-center'
                      onClick={()=>setReviewSelect(reviewState.name)}
                    >
                    {reviewSelect === reviewState.name ?
                      <img src={reviewState.iconOn} alt="" />
                    : <img src={reviewState.iconOff} alt="" />
                    }
                      <p className={`text-[14px] font-[400] mt-2 ${reviewSelect === reviewState.name ?  'text-main-300' : 'text-gray-300'}`}>{reviewState.name}</p>
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
                  <textarea value={writeReview} placeholder='차에 대한 감상평을 남겨주세요!' className='w-[100%] h-[145px] m- bg-gray-100 p-4 rounded-[20px]' onChange={(e) => setWriteReview(e.target.value)}/>
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
                  onClick={handleReviewSubmit}
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
                          <img src={selectedReview.iconOn} alt="" className='w-[21px] h-[21px]'/>
                          <p className='text-[12px] font-[500] text-main-300'>{reviewSelect}</p>
                        </div>
                          <h4 className='text-main-300 text-[16px] font-[700]'>오늘의 추천은</h4>
                          <h3 className='text-black text-[24px] font-[400]'>{currentTea}</h3>
                      </div>
                      <div className='w-[150px] flex items-center'>
                        {teaImageSource && <img src={teaImageSource} alt={currentTea} className='w-[150px] h-[150px] border-none rounded-[19px]' />}
                        {!teaImageSource && <p>이미지 없음</p>}                      
                      </div>
                  </div>
              </div>

              <div className='w-[100%] h-[145px] mb-[80px] bg-gray-100 p-4 rounded-[20px]'>
                <p>{writeReview}</p>
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

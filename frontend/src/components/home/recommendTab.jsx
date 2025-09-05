export default function Recommend() {
  return (
    <div className="flex flex-col justify-center bg-main-100 rounded-[30px] px-7 py-9">
        <div className="flex justify-start items-start text-[24px] font-normal"><p>오늘의 <strong>차추천</strong><br/>받으시겠어요?</p></div>
        <img src="/svg/teaHomeLogo.svg" alt="teaLogo" className="w-[186px] ml-auto"/>
        <button className="text-center text-[24px] text-main-300 font-bold bg-white w-[307px] h-[77px] rounded-[20px] mt-1">차 추천받기</button>
    </div>
  );
}
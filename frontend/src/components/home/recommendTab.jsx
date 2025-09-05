import { NavLink } from 'react-router-dom';

export default function RecommendTab() {
  return (
    <div className="flex flex-col justify-center bg-main-100 rounded-[30px] px-7 py-5 mb-10">
      <div className="flex justify-start items-start text-[24px] font-normal">
        <p>
          오늘의 <strong>차추천</strong>
          <br />
          받으시겠어요?
        </p>
      </div>

      <img
        src="/svg/teaHomeLogo.svg"
        alt="teaLogo"
        className="w-[186px] ml-auto"
      />

      <NavLink
        to="/recommend/moodpick"
        className="mt-1 w-[307px] h-[77px] rounded-[20px] bg-white text-main-300 text-[24px] font-bold flex items-center justify-center text-center"
      >
        차 추천받기
      </NavLink>
    </div>
  );
}

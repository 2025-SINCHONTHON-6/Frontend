export default function MyPage() {
  return (
    <div>
    <div className="flex flex-row justify-center items-center px-7 py-7 mt-2 gap-5 bg-main-100 rounded-[20px]">
      <div>
        <p className="text-[22px] text-left mb-6">
          <strong>김멋사님</strong>의 <br />
          페이지
        </p>
        <div className="text-[16px] text-center flex items-center justify-center font-bold text-main-300 bg-main-200 w-[153px] h-[35px] rounded-[30px]">
          챌린지 7개 달성!
        </div>
      </div>
      <img src="/svg/profile.svg" alt="profile" />
    </div>

    <div className="w-screen h-[14px] bg-[#F6F6F6] mt-11 mb-11"></div>
    <div className="flex flex-col gap-8 text-left">
        <p className="text-[12px] text-[#686868] font-semibold">내 정보</p>
        <botton className="text-[16px] text-black font-bold">내 정보 수정하기</botton>

        <p className="text-[12px] text-[#686868] font-semibold">가이드</p>
        <botton className="text-[16px] text-black font-bold">차 입문 가이드</botton>
        <botton className="text-[16px] text-black font-bold">다구 사용 가이드</botton>

        <p className="text-[12px] text-[#686868] font-semibold">내 기록</p>
        <botton className="text-[16px] text-black font-bold">내 기록 관리하기</botton>
    </div>
</div>
  );
}

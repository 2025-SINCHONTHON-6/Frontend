import RecommendTab from '@/components/home/recommendTab';
import RecordTab from '@/components/home/recordTab';

export default function Home() {
  return (
    <div className="flex flex-col px-5 pt-5">
      <div className="pt-8 mb-20 ml-2 flexitems-start">
        <p className="flex text-[24px] text-black font-bold pb-1">
          나의 차 기록
        </p>
        <p className="text-[16px] text-[#8B8B8B] font-normal pb-3">
          매일매일 차를 마시고 기록해봐요
        </p>
        <RecordTab />
      </div>
    </div>
  );
}

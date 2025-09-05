import { useMemo, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { recordData } from "@/data/record"; // 이 코드는 더 이상 필요하지 않습니다.

const PER_PAGE = 10;

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const YMD_RE = /^(\d{4})[-./](\d{1,2})[-./](\d{1,2})(?:T.*)?$/;
function parseYMD(value) {
  const m = String(value ?? "").match(YMD_RE);
  if (!m) return null;
  const y = +m[1], mo = +m[2], d = +m[3];
  const dt = new Date(y, mo - 1, d);
  return (dt.getFullYear() === y && dt.getMonth() === mo - 1 && dt.getDate() === d) ? dt : null;
}
function formatLabelDate(value) {
  const dt = parseYMD(value);
  if (!dt) return String(value ?? "");
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1);
  const d = String(dt.getDate());
  return `${y}.${m}.${d}`;
}

export default function RecordTab() {
  const [dates, setDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pages = useMemo(() => chunk(dates, PER_PAGE), [dates]);
  const [page, setPage] = useState(0);
  const max = pages.length - 1;

  useEffect(() => {
    async function fetchDates() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/challenges/logs/dates/`,
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
          throw new Error("Failed to fetch dates");
        }
        const data = await response.json();
        setDates(data); // API에서 받은 날짜 배열로 상태 업데이트
      } catch (error) {
        console.error("Error fetching dates:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDates();
  }, []);

  const startX = useRef(null);
  const onTouchStart = (e) => (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    const TH = 40;
    if (dx < -TH && page < max) setPage((p) => p + 1);
    if (dx > TH && page > 0) setPage((p) => p - 1);
    startX.current = null;
  };

  const items = pages[page] ?? [];
  const missing = Math.max(0, PER_PAGE - items.length);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-20 text-gray-500">
        <p>기록을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-[#FFFDE3] p-5">
      <div className="relative select-none" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <ul className="grid grid-cols-5 pb-5 gap-x-6 gap-y-7">
          {items.map((item, index) => (
            <li key={item + index} className="flex flex-col items-center">
              <Link to={`/challenges/records/daily/?created_at=${item}`}>
              <div
                className="w-10 rounded-full shadow-inner h-14"
                style={{ backgroundColor: `hsl(${(index * 30 + 100) % 360}, 70%, 80%)` }} // 임의의 색상 할당
                aria-label={formatLabelDate(item)}
                title={formatLabelDate(item)}
              />
              <span className="mt-2 text-[10px] text-gray-700">
                {formatLabelDate(item)}
              </span>
              </Link>
            </li>
          ))}
          {Array.from({ length: missing }).map((_, i) => (
            <li
              key={`ghost-${i}`}
              className="opacity-0 pointer-events-none select-none"
              aria-hidden="true"
            >
              <div className="w-10 rounded-full h-14" />
              <span className="mt-2 block text-[10px]">00.00.00</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between mt-4">
          <button
            className="px-3 py-1 text-sm border rounded-xl disabled:opacity-40"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            이전
          </button>
          <span className="text-xs text-gray-500">
            {pages.length > 0 ? `${page + 1} / ${pages.length}` : '0 / 0'}
          </span>
          <button
            className="px-3 py-1 text-sm border rounded-xl disabled:opacity-40"
            onClick={() => setPage((p) => Math.min(max, p + 1))}
            disabled={page === max}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
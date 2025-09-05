import { useMemo, useRef, useState } from "react";
import { recordData } from "@/data/record";

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
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const d = String(dt.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}

export default function RecordTab() {
  const pages = useMemo(() => chunk(recordData, PER_PAGE), []);
  const [page, setPage] = useState(0);
  const max = pages.length - 1;


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

  return (
    <div className="rounded-3xl bg-[#FFFDE3] p-5 mb-20">
      <div className="relative select-none" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      
        <ul className="grid grid-cols-5 gap-x-6 gap-y-7 pb-5">
          {items.map((item) => (
            <li key={item.id} className="flex flex-col items-center">
             
              <div
                className="h-14 w-10 rounded-full shadow-inner"
                style={{ backgroundColor: item.color }}
                aria-label={formatLabelDate(item.date)}
                title={formatLabelDate(item.date)}
              />
           
              <span className="mt-2 text-[10px] text-gray-700">
                {formatLabelDate(item.date)}
              </span>
            </li>
          ))}

          
          {Array.from({ length: missing }).map((_, i) => (
            <li
              key={`ghost-${i}`}
              className="pointer-events-none select-none opacity-0"
              aria-hidden="true"
            >
              <div className="h-14 w-10 rounded-full" />
              <span className="mt-2 block text-[10px]">0000.00.00</span>
            </li>
          ))}
        </ul>

        {/* 페이지 네비 */}
        <div className="mt-4 flex items-center justify-between">
          <button
            className="rounded-xl border px-3 py-1 text-sm disabled:opacity-40"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            이전
          </button>
          <span className="text-xs text-gray-500">
            {page + 1} / {pages.length}
          </span>
          <button
            className="rounded-xl border px-3 py-1 text-sm disabled:opacity-40"
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

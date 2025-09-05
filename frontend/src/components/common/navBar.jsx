import { NavLink } from "react-router-dom";

function NavItem({ to, label, icon, iconActive, end }) {
  return (
    <NavLink to={to} end={end} className="grid h-full w-full place-items-center">
      {({ isActive }) => (
        <span
          className={[
            "px-9 py-3 flex flex-col items-center justify-center rounded-full",
       
            isActive ? "bg-main-100 text-main-300" : "text-black",
          ].join(" ")}
        >
          <img
            className="mb-1"
            src={isActive ? iconActive : icon}
            alt={label}
          />
          <span className={isActive ? "font-bold" : "font-medium"}>{label}</span>
        </span>
      )}
    </NavLink>
  );
}

export default function NavBar() {
  return (
    <nav
      className="
        fixed bottom-0 left-1/2 -translate-x-1/2
        w-[390px] z-50 pt-3 pb-6 border-main-300 border-t bg-white text-[12px]
      "
    >
      <div className="grid h-full grid-cols-3">
        <NavItem
          to="/"
          end
          label="홈"
          icon="/svg/home.svg"
          iconActive="/svg/home1.svg"
        />
        <NavItem
          to="/record"
          label="기록"
          icon="/svg/record.svg"
          iconActive="/svg/record1.svg"
        />
        <NavItem
          to="/mypage"
          label="마이페이지"
          icon="/svg/mypage.svg"
          iconActive="/svg/mypage1.svg"
        />
      </div>
    </nav>
  );
}

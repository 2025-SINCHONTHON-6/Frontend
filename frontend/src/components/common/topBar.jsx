import { NavLink } from "react-router-dom";

export default function TopBar() {
  return (
    <nav className="flex justify-start items-start px-3 pt-5 pb-5">
      <NavLink to="/"><img src="/svg/logo.svg" alt="tea-bti" /></NavLink>
    </nav>
  );
}
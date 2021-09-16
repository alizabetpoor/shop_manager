import { NavLink } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <div className="header w-full bg-green-400 h-14 flex justify-center">
      <ul className="flex w-3/5 h-full items-stretch justify-between space-x-1 space-x-reverse">
        <div className="flex w-3/5 h-full items-stretch py-2 space-x-1 space-x-reverse">
          <NavLink
            activeClassName="active-nav"
            exact
            to="/"
            className="flex items-center w-28 justify-center"
          >
            خانه
          </NavLink>
          <NavLink
            activeClassName="active-nav"
            to="/addproduct"
            className="flex items-center w-28 px-2 min-w-max justify-center"
          >
            اضافه کردن محصول
          </NavLink>
          <NavLink
            activeClassName="active-nav"
            to="/groups"
            className="flex items-center w-28 justify-center"
          >
            دسته بندی ها
          </NavLink>
        </div>
        <div className="flex items-center text-gray-700">
          <li>سایت مدیریت فروشگاه</li>
        </div>
      </ul>
    </div>
  );
};

export default Header;

import { FC } from "react";
import { NavLink } from "react-router-dom";

const Header: FC = () => {
  return (
    <header className="bg-blue-700 p-4 mx-auto md:w-[50%] mt-6 rounded-3xl">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="text-lg font-bold text-white">VHS</div>
        <ul className="flex space-x-4">
          <li className="flex items-center">
            <NavLink to="/vhs/new" className="mr-5">
              <div className=" text-white hover:text-gray-400 font-bold">
                Create new VHS
              </div>
            </NavLink>
            <NavLink to="/">
              <div className=" text-white hover:text-gray-400 font-bold">
                Home Page
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex flex-col sm:flex-row justify-center items-center">
        <div className="logo">Logo</div>
        <div className="site-title text-lg mt-2 sm:mt-0 sm:ml-4">
          Site Title
        </div>
      </div>
      <div className="header-image bg-gray-700 h-48 sm:h-64 lg:h-72 xl:h-80 mt-4 w-full rounded-lg shadow-md"></div>
    </header>
  );
};

export default Header;

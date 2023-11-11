import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-500 flex justify-between p-4 items-center">
      <h1 className="text-white">COVID-19</h1>
      <p className="text-white h-8 w-32 rounded-md bg-blue-500 focus:outline-none">
        <span>국내 코로나 현황</span>
      </p>
    </header>
  );
};

export default Header;

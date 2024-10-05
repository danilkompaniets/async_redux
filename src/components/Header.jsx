import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-center bg-neutral-100">
      <div className="container py-3 flex justify-between">
        <h1 className=" text-violet-600 text-3xl ">Redux Blog</h1>
        <div className="flex gap-2 items-center justify-center">
          <Link className="hover:text-violet-600" to={"/"}>
            Home
          </Link>
          <Link className="hover:text-violet-600" to={"post"}>
            Posts
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

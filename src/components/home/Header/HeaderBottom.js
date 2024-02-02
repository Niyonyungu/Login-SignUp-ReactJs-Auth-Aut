import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import header from "./HeaderBottom.module.css";

const HeaderBottom = () => {
  const [showUser, setShowUser] = useState(false);

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div onClick={() => setShowUser(!showUser)} className="flex">
        <div className={header.head}>
          <FaUser className={header.icon} />
          <FaCaretDown className={header.iconn} />
        </div>
      </div>
      {showUser && (
        <motion.ul
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`absolute bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6 ${header.modal}`}
        >
          <Link to="/signin">
            <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
              Login
            </li>
          </Link>
          <Link onClick={() => setShowUser(false)} to="/signup">
            <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
              Sign Up
            </li>
          </Link>
        </motion.ul>
      )}
    </div>
  );
};

export default HeaderBottom;

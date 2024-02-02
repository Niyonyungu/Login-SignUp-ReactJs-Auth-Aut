import React from "react";
import home from "./Home.module.css";
import { FaCaretDown } from "react-icons/fa";

const Home = () => {
  // ============== Getting The User Who Logged in ==========================
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user, "userrr");
  const usermail = user?.email;
  console.log(usermail, "email");
  // ============== End Getting The User Who Logged in ==========================

  return (
    <div className={home.container}>
      <h1 className={home.title}>
        {" "}
        Welcome <span className={home.name}>{usermail}</span>
      </h1>
      <p className={home.p}>
        To <span className={home.span}>Login/SignUp</span> Click on the dropdown
        arrow <FaCaretDown className={home.arr} /> Above
      </p>
    </div>
  );
};

export default Home;

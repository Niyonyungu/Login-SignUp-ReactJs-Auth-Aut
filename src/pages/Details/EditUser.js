import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import edito from "./Users.module.css";

const EditUser = () => {
  // ===================  initial Decralation =======================
  const [newUserLoading, setNewUserLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  let userId = params.id;

  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userRole, setUserRole] = useState();

  // =================== End initial Decralation =======================

  // ===================  Getting the user details Before Editing them =======================

  const fetchUser = () => {
    let token = localStorage.getItem("token");
    axios({
      method: "GET",
      url: `https://holiday-planner-4lnj.onrender.com/api/v1/auth/users/getOne/?fieldName=_id&value=${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUserName(response?.data?.fullName);
        setUserEmail(response?.data?.email);
        setUserRole(response?.data?.role);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ===================  Getting the user details Before Editing them =======================

  // =================== Submitting New Info  ================================================

  const submitNewUser = (e) => {
    e.preventDefault();
    setNewUserLoading(true);
    const data = {
      fullName: userName,
      email: userEmail,
      role: userRole,
    };

    let token = localStorage.getItem("token");

    axios({
      method: "PUT",
      url: `https://holiday-planner-4lnj.onrender.com/api/v1/auth/users/update/${userId}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((Response) => {
        setNewUserLoading(false);
        console.log(Response);
        toast.success("User Updated Succesfully", {
          className: `${edito.succe}`,
        });
        setTimeout(() => {
          navigate("/userdetails");
        }, 2000);
      })
      .catch((error) => {
        setNewUserLoading(false);
        console.log(error);
        toast.error(error.message, {
          className: `${edito.error}`,
        });
      });
  };

  // =================== Submitting New Info  =======================

  return (
    <form action="" className={edito.addTrurForm}>
      <h4> Edit & Update User</h4>
      <label htmlFor="">User Name</label>
      <input
        value={userName}
        type="text"
        placeholder="mention New User"
        onChange={(e) => {
          e.preventDefault();
          setUserName(e.target.value);
        }}
      />

      <label htmlFor=""> User Email</label>
      <input
        value={userEmail}
        type="text"
        placeholder=" New User Email"
        onChange={(e) => {
          e.preventDefault();
          setUserEmail(e.target.value);
        }}
      />

      <label htmlFor="">New User Role</label>
      <input
        value={userRole}
        type="text"
        placeholder="New User Role"
        onChange={(e) => {
          e.preventDefault();
          setUserRole(e.target.value);
        }}
      />

      <button className={edito.addTourbu} onClick={submitNewUser}>
        {newUserLoading ? (
          <ScaleLoader
            color="black"
            height={18}
            radius={3}
            width={9}
            className={edito.loader}
          />
        ) : (
          "Update"
        )}
      </button>
      <ToastContainer />
    </form>
  );
};

export default EditUser;

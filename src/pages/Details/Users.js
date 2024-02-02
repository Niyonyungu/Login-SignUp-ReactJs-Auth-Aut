import usersa from "./Users.module.css";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import PuffLoader from "react-spinners/PuffLoader";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";

function Users() {
  // ============= Getting the user Who logged in ==================
  const usar = JSON.parse(localStorage.getItem("user"));
  console.log(usar, "user");
  const admin = usar?.role;
  console.log(admin, "admin");
  // ============= End Getting the user Who logged in ==================

  // loading =========================

  const [userLoading, setUserLoading] = useState(false);

  // loading End =====================
  // ============== fetching users/accounts =====================

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  let token = localStorage.getItem("token");

  const fetchUsers = () => {
    setUserLoading(true);
    axios({
      method: "GET",
      url: "https://holiday-planner-4lnj.onrender.com/api/v1/auth/users",
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((Response) => {
        setUserLoading(false);
        setUsers(Response.data);
        console.log(Response);
      })
      .catch((error) => {
        setUserLoading(false);
        console.log(error);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ============== End fetching users =====================

  // ============== Deleting users/accounts =====================

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete This Account ?")) {
      let token = localStorage.getItem("token");
      axios({
        url: `https://holiday-planner-4lnj.onrender.com/api/v1/auth/users/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          toast.success("Account deleted successfully", {
            className: `${usersa.succe}`,
          });
          console.log(response, "Response");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          toast.error(error.message, {
            className: `${usersa.error}`,
          });
          console.log(error, "Error");
        });
    }
  };

  // ============== End Deleting  users =====================

  // ============== pagination =========================
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;
  const displayUsers = users
    ?.slice(pagesVisited, pagesVisited + usersPerPage)
    ?.map((user) => {
      return (
        <tr>
          <td>{user.fullName}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>

          <td className={usersa.righttd}>
            <td className={usersa.righttdd}>
              <span className={usersa.actionss}>
                <BsFillTrashFill
                  className={usersa.deletebtns}
                  onClick={() => handleDeleteUser(user._id)}
                />

                <BsFillPencilFill
                  className={usersa.editbuttonns}
                  onClick={() => navigate(`/edituser/${user._id}`)}
                />
              </span>
            </td>
          </td>
        </tr>
      );
    });

  const pageCount = Math.ceil(users.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  // ============== End Pagination =====================

  /*      ============  Logout  =============      */

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  /*      ==========  End Logout =============      */

  return (
    <div className={usersa.container}>
      <h1 className={usersa.adminName}>
        <span onClick={handleLogOut} className={usersa.out}>
          Log out
        </span>
        Welcome <span className={usersa.ad}>{admin}</span>
      </h1>
      <div className={usersa.right}>
        <div className={usersa.sidebarrrightsidee}>
          {userLoading ? (
            <PuffLoader color="black" size="380" />
          ) : (
            <div>
              <table class={usersa.tablee}>
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>User Role</th>
                    <th className={usersa.actionf}>Action</th>
                  </tr>
                </thead>
                <tbody>{displayUsers}</tbody>
              </table>
              <div className={usersa.downn}>
                <ReactPaginate
                  previousLabel={"Prev"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={usersa.paginationButtons}
                  previousLinkClassName={usersa.previousButton}
                  nextLinkClassName={usersa.nextButton}
                  activeClassName={usersa.activePage}
                />
              </div>
            </div>
          )}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Users;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Admin_Login_Signup_GET, DeleteUserThunk } from "../../ReduxStore/LibrarySlice";
import { toast } from "react-toastify";

export const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.LibraryProject);
  console.log(users);

  const userToken = localStorage.getItem("userTOKEN");

  const handleDelete = (userId) => {
  
    dispatch(DeleteUserThunk(userId)).then((res) => {
      console.log(res);
      if (res?.meta?.requestStatus === "fulfilled") {
         toast.error("User Delete SuccessFully");
         dispatch(Admin_Login_Signup_GET(userToken));
      }
    })
  };

  useEffect(() => {
    dispatch(Admin_Login_Signup_GET(userToken));
  }, [dispatch, userToken]);


  return (
    <>
      <div>
        <h2>👤 Users</h2>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users?.User_SignUP_Login_Data?.userLoginData?.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(u._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

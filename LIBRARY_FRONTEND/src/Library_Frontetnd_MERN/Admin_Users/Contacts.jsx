import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserConatctGET } from "../../ReduxStore/LibrarySlice";
import "./Contacts.css";

export const Contacts = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(
    (state) => state.LibraryProject
  );

  useEffect(() => {
    dispatch(UserConatctGET());
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (confirmDelete) {
      console.log("Delete Contact:", id);

      // dispatch(DeleteContactThunk(id))
    }
  };

  return (
    <div className="contacts-container">
      <div className="contacts-header">
        <h2>📞 Contact Messages</h2>

        <span className="contact-count">
          {contacts?.User_Contact_Data?.length || 0} Messages
        </span>
      </div>

      {contacts?.User_Contact_Data?.length === 0 ? (
        <div className="empty-contact">
          <h3>No Contact Messages Found</h3>
        </div>
      ) : (
        <div className="contacts-grid">
          {contacts?.User_Contact_Data?.map((c) => (
            <div
              key={c._id}
              className="contact-card"
            >
              <div className="contact-top">
                <div className="avatar">
                  {c.username?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h4>{c.username}</h4>
                  <p>{c.email}</p>
                </div>
              </div>

              <div className="message-box">
                <h5>Message</h5>
                <p>{c.message}</p>
              </div>

              <div className="card-footer">
                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(c._id)
                  }
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleDeleteAccount() {
    try {
      await dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  }

  return (
    <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">
      <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
        <FiTrash2 className="text-3xl text-pink-200" />
      </div>
      <div className="flex flex-col space-y-2">
        <h2 className="text-lg font-semibold text-richblack-5">
          Would you like to delete your account?
        </h2>
        <button
          type="button"
          className="w-fit cursor-pointer italic text-pink-300"
          onClick={handleDeleteAccount}
        >
          <b>I want to delete my account.</b>
        </button>
      </div>
    </div>
  );
}

const deleteProfile = (token, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/delete-account",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Account deleted successfully", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error deleting account:", error.message);
      alert("Failed to delete account. Please try again later.");
    }
  };
};

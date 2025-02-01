import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IconBtn from "./IconBtn";
import "./EditProfile.css";

export default function EditProfile() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
      about: user?.additionalDetails?.about || "",
      phoneNumber: user?.additionalDetails?.phoneNumber || "",
    },
  });

  const submitProfileForm = async (data) => {
    try {
      setLoading(true);
      setErrorMessage(""); // Reset previous error message
      const response = await axios.put(
        "http://127.0.0.1:8000/edit-profile",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update profile in Redux store
        dispatch({
          type: "UPDATE_PROFILE",
          payload: response.data,
        });
        setIsUpdated(true);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      setErrorMessage("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-header"></div>
      <form onSubmit={handleSubmit(submitProfileForm)} className="edit-profile-form">
        <h2 style={{ color: "white", fontSize: "15px", fontWeight: "bold" }}>Edit Details</h2>

        {/* Display error message if any */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="form-grid">
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="firstName" className="label-style">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter First Name"
                className="form-style"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <span className="error-message">Please enter your First Name.</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="lastName" className="label-style">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter Last Name"
                className="form-style"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <span className="error-message">Please enter your Last Name.</span>
              )}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="email" className="label-style">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              className="form-style"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="error-message">Please enter your Email.</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="dateOfBirth" className="label-style">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              className="form-style"
              {...register("dateOfBirth", { required: true })}
            />
            {errors.dateOfBirth && (
              <span className="error-message">Please enter your Date of Birth.</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="phoneNumber" className="label-style">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Enter Phone Number"
              className="form-style"
              {...register("phoneNumber", {
                required: true,
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number.",
                },
              })}
            />
            {errors.phoneNumber && (
              <span className="error-message">
                {errors.phoneNumber.message || "Please enter your Phone Number."}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="about" className="label-style">
              About
            </label>
            <textarea
              name="about"
              id="about"
              placeholder="Write something about yourself"
              className="form-style"
              rows="4"
              {...register("about")}
            ></textarea>
          </div>
        </div>

        <button
        style={{backgroundColor: "black", color: "white",fontSize: "15px", fontWeight: "bold",width: "100%",height: "40px",borderRadius: "5px",border: "none",cursor: "pointer",marginTop: "10px"}}
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>

        {isUpdated && <p className="success-message">Profile updated successfully!</p>}
      </form>
    </div>
  );
}

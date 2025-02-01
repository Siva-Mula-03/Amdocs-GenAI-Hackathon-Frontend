import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import axios from "axios";

export default function ChangeProfilePicture() {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const token = "your-token-here";  // Replace with your token or fetch from localStorage
  const user = { firstName: "John", lastName: "Doe", image: "/default-avatar.png" };  // Replace with user data from your state

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = async () => {
    if (!imageFile) {
      alert("Please select a file to upload.");
      return;
    }
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("displayPicture", imageFile);

      // Send PUT request to backend
      const response = await axios.put("http://127.0.0.1:8000/update-picture", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Profile picture updated successfully!");
        setPreviewSource(response.data.imageUrl); // Update preview

        // Simulate updating Redux state locally (since we're not using Redux here)
        // Call your method to update profile picture
        localStorage.setItem("userProfileImage", response.data.imageUrl);  // Update local storage or global state if needed
      } else {
        alert("Failed to update profile picture.");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("An error occurred while uploading.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
      <div className="flex items-center gap-x-4">
        <img
          src={previewSource || user.image}
          alt={`profile-${user.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div className="space-y-2">
          <p>Change Profile Picture</p>
          <div className="flex flex-row gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              {!loading && <FiUpload className="text-lg text-richblack-900" />}
              {loading ? "Uploading..." : "Upload"}
            </button>
            <button
              onClick={handleFileUpload}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

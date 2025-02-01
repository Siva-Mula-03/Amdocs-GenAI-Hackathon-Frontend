import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function ViewProfile() {
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    if (user?.firstName) {
      // Optionally, trigger a confirmation or other side effect
      console.log("Profile updated:", user);
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-richblack-900">
      <div className="w-full max-w-4xl">
        <h1 className="mb-14 text-3xl font-medium text-white">Profile</h1>

        {/* Profile Overview */}
        <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <div className="flex items-center gap-x-4">
            <img
              src={user?.image || "/default-avatar.png"}
              alt={`profile-${user?.firstName || "User"}`}
              className="aspect-square w-[78px] rounded-full object-cover"
            />
            <div className="space-y-1">
              <p className="text-lg font-semibold text-white">
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : "User Name"}
              </p>
              <p className="text-sm text-white">{user?.email || "Email not available"}</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <p className="text-lg font-semibold text-white">About</p>
          <p className="text-sm font-medium text-white">
            {user?.additionalDetails?.about || "Write Something About Yourself"}
          </p>
        </div>

        {/* Personal Details Section */}
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <p className="text-lg font-semibold text-white">Personal Details</p>
          <div className="flex max-w-[500px] justify-between">
            <div className="flex flex-col gap-y-5">
              <div>
                <p className="mb-2 text-sm text-white">First Name</p>
                <p className="text-sm font-medium text-white">{user?.firstName}</p>
              </div>
              <div>
                <p className="mb-2 text-sm text-white">Email</p>
                <p className="text-sm font-medium text-white">{user?.email}</p>
              </div>
            </div>
            <div className="flex flex-col gap-y-5">
              <div>
                <p className="mb-2 text-sm text-white">Last Name</p>
                <p className="text-sm font-medium text-white">{user?.lastName}</p>
              </div>
              <div>
                <p className="mb-2 text-sm text-white">Phone Number</p>
                <p className="text-sm font-medium text-white">{user?.additionalDetails?.contactNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

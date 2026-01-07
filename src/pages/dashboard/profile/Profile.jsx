import React, { useEffect, useRef, useState } from "react";
import Edit_profile from "./Edit_profile";
import Update_Password from "./Update_Password";
import logo from "../../../assets/images/Profile2.png";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from "../../../../const";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("editProfile");
  const formRef = useRef(null);

  const [users, setUser] = useState(null);
  const userId = users?._id;
 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);
  

  // ✅ Trigger Save button
  const handleSave = () => {
    if (activeSection === "editProfile" && formRef.current) {
      formRef.current(); // Triggers validation in Edit_profile
    } else {
      console.log("Password updated!");
    }
  };

  // ✅ Handle successful validation
  const handleProfileSave = async (data) => {
   
    try {
      const payload = {
        name: data.fullName,
        email: data.email,
        phonenumber: Number(data.phoneNumber), // ✅ convert to number
      };
  
      console.log("UPDATE PAYLOAD 👉", payload);
  
      const res = await axios.put(
        `${API}/profile/update/${userId}`,
        payload
      );
  
      localStorage.setItem("user", JSON.stringify(res.data.data));
      setUser(res.data.data);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("API ERROR 👉", error.response?.data);
      toast.error(error.response?.data?.message || "Profile update failed");
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white mb-14 mr-0 sm:mr-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-black">My Profile</h1>
          <p className="text-sm text-light-grey">
            Manage your personal details and account settings.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="bg-darkest-blue text-white px-6 py-2.5 cursor-pointer rounded-md"
        >
          Save
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-7 p-6 rounded-lg mb-2">
        <div className="rounded-lg pt-6 shadow-md pl-10 pr-10 flex flex-col items-center space-y-1 h-120">
          <img
            src={logo}
            alt="avatar"
            className="w-40 h-40 sm:w-56 sm:h-56 rounded-full object-cover mb-4"
          />
          {users && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">
                {users.name || "User"}
              </h2>

              <p className="text-light-grey text-sm">{users.role || "User"}</p>

              <p className="text-light-grey text-sm break-words">
                {users.email}
              </p>
            </div>
          )}

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setActiveSection("editProfile")}
              className={`px-4 py-3 rounded-md text-sm font-medium cursor-pointer transition ${
                activeSection === "editProfile"
                  ? "bg-darkest-blue text-white"
                  : "bg-[#FBFBFB] text-black"
              }`}
            >
              Edit Profile
            </button>
            <button
              onClick={() => setActiveSection("updatePassword")}
              className={`px-4 py-3 rounded-md text-sm font-medium cursor-pointer transition ${
                activeSection === "updatePassword"
                  ? "bg-darkest-blue text-white"
                  : "bg-[#FBFBFB] text-black"
              }`}
            >
              Update Password
            </button>
          </div>
        </div>

        <div>
          {activeSection === "editProfile" ? (
            <Edit_profile
              onSave={handleProfileSave}
              refCallback={(fn) => (formRef.current = fn)}
              user={users}
            
            />
          ) : (
            <Update_Password />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

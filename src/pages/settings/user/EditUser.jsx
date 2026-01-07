import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Title from "../../../components/Title";
import { IoSave } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../../const";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";

const Editschema = yup.object().shape({
  name: yup
    .string()

    .required("Name is required"),

  email: yup
    .string()

    .required("email is required"),
  phonenumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone Number must be 10 digits")
    .required("PhoneNumber is required"),

  role: yup
    .string()

    .required("Role is required"),
});

const Changeschema = yup.object().shape({
  newPassword: yup
    .string()
    .required("New password is required")
    .min(9, "Password must be at least 9 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

const ChangeInputField = ({ label, name, register, errors, type = "text" }) => (
  <div className="grid grid-cols-8 items-center gap-4">
    <label className="col-span-3 text-sm font-medium">{label}</label>
    <input
      type={type}
      autoComplete={"off"}
      placeholder="Type Here"
      {...register(name)}
      className={`col-span-5 border border-input-bordergrey rounded-lg outline-none py-3 px-3 w-full placeholder:text-xs placeholder:font-light placeholder-black ${
        errors[name] ? "border-red-500" : ""
      }`}
    />
    {errors[name] && (
      <p className="text-red-500 text-xs col-span-8 text-end">
        {errors[name].message}
      </p>
    )}
  </div>
);

const InputField = ({
  label,
  name,
  register,
  errors,
  placeholder,
  type = "text",
  options = [],
}) => (
  <div className="grid grid-cols-8 items-center gap-4">
    <label className="sm:col-span-3 col-span-8 text-sm font-medium">
      {label}
    </label>
    {type === "select" ? (
      <select
        defaultValue=""
        {...register(name)}
        className={`col-span-5 border border-input-bordergrey rounded-lg outline-none py-4 pl-2 text-xs font-light 
          ${errors[name] ? "border-red-500" : ""}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`sm:col-span-5 col-span-8 w-full border border-input-bordergrey rounded-lg outline-none py-3  px-3 placeholder:text-start placeholder:text-xs placeholder:font-light placeholder-black ${
          errors[name] ? "border-red-500" : ""
        }`}
      />
    )}
    {errors[name] && (
      <p className="text-red-500 text-xs col-span-8 text-end">
        {errors[name].message}
      </p>
    )}
  </div>
);

const EditUser = ({ onclose  }) => {
  const [roles, setRoles] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const item = location.state?.item;

  const {
    register,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm({
    resolver: yupResolver(Editschema),
  });
  
  useEffect(() => {
    if (item) {
      reset({
        name: item.name ,
        email: item.email ,
        phonenumber: item.phonenumber,
        role: item.role ,
      });
    }
  }, [item, reset]);

  useEffect(() => {
    axios
      .get(`${API}/roles/getroles`)
      .then((response) => {
        setRoles(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.put(`${API}/user/updateuserbyid/${item._id}`, data);

      toast.success("User updated successfully");

      reset();
      navigate("/settings/users");
    } catch (error) {
      toast.error("Update failed");
      console.error(error);
    }
  };

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset: resetPassword,
  } = useForm({
    resolver: yupResolver(Changeschema),
  });

  const onSubmitPassword = async (data) => {
    try {
      await axios.put(`${API}/user/changepassword/${item._id}`, {
        newPassword: data.newPassword,
      });

      toast.success("Password updated successfully");
      resetPassword();
      navigate("/settings/users");
    } catch (error) {
      toast.error("Password update failed");
      console.error(error);
    }
  };

  return (
    <div className="h-screen ">
      <Title title="Settings" sub_title="User" page_title="Edit User" />
      <div className="grid grid-cols-12  gap-2 my-4 mr-4">
        <div className="sm:col-span-6 col-span-12 w-full py-9 rounded-lg bg-white shadow-lg">
          <p className="w-full text-2xl font-semibold flex justify-center items-center">
            {" "}
            Edit user
          </p>
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-c gap-4 px-6 py-6">
                <div className="space-y-4">
                  <InputField
                    label="Name"
                    name="name"
                    placeholder="Type Here"
                    register={register}
                    errors={errors}
                  />

                  <InputField
                    label="Email"
                    name="email"
                    placeholder="Type Here"
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="Phone Number"
                    name="phonenumber"
                    register={register}
                    errors={errors}
                    placeholder="Type Here"
                  />

                  <InputField
                    label="Role"
                    name="role"
                    register={register}
                    errors={errors}
                    placeholder="Type Here"
                    type="select"
                    options={roles.map((role) => ({
                      value: role.role_name,
                      label: role.role_name,
                    }))}
                  />
                </div>
              </div>
              <div className="mx-5 text-xs flex lg:justify-end md:justify-center justify-center gap-2 mb-4">
                <button
                  type="submit"
                  className="flex gap-2 text-base items-center p-3 cursor-pointer px-6 bg-darkest-blue text-white rounded"
                >
                  <IoSave size={23} />
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="sm:col-span-6 col-span-12 w-full py-5 rounded-lg bg-white shadow-lg">
          <p className="w-full text-2xl font-semibold flex justify-center items-center">
            Change Password
          </p>
          <div className="px-6 py-6">
            <form
              onSubmit={handleSubmitPassword(onSubmitPassword)}
              className="space-y-4"
            >
              <ChangeInputField
                label="New password"
                name="newPassword"
                register={registerPassword}
                errors={errorsPassword}
                type="password"
              />
              <ChangeInputField
                label="Confirm Password"
                name="confirmPassword"
                register={registerPassword}
                errors={errorsPassword}
                type="password"
              />
              <p className="text-xs text-gray-700">
                "Make sure your password has: one capital letter, one small
                letter, one number, one special symbol, and is at least 9
                characters long."
              </p>
              <p className="text-sm mt-1">
                <strong>Example:</strong> Design@2024
              </p>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-darkest-blue text-white rounded"
                >
                  <IoSave size={20} /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

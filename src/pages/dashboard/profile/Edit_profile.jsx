import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router";


const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
    .required("Phone number is required"),
  
});

const Edit_profile = ({ onSave, refCallback,user }) => {
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) {
      setValue("fullName", user.name || "");
      setValue("email", user.email || "");
      setValue("phoneNumber", user.phonenumber || "");
    }
  }, [user, setValue]);

  const onSubmit = (data) => {
    onSave(data);
  };

  // ✅ Pass handleSubmit to parent so that “Save” button in Profile triggers validation
  useEffect(() => {
    if (refCallback) refCallback(handleSubmit(onSubmit));
  }, [refCallback, handleSubmit,onSubmit]);

  return (
    
    <form className="space-y-3">
      
      
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-sm">Full Name</p>
        <input
          type="text"
          {...register("fullName")}
          className="w-96 py-3 text-black px-2 outline-0 text-md rounded-md bg-light-blue"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName.message}</p>
        )}
      </div>

      
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-sm">Email ID</p>
        <input
          type="email"
          {...register("email")}
          className="w-96 py-3 text-black px-2 outline-0 text-md rounded-md bg-light-blue"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-sm">Phone Number</p>
        <input
          type="tel"
          {...register("phoneNumber")}
          className="w-96 py-3 text-black px-2 outline-0 text-md rounded-md bg-light-blue"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}
      </div>

     
      
      
    </form>
  );
};

export default Edit_profile;

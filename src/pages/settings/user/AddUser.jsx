import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoClose } from "react-icons/io5";
import { InputField } from "../../../components/InputField";

import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../../const";

const schema = yup.object().shape({
  name: yup
    .string()

    .required("Name is required"),
  zone: yup
    .string()
    
    .required("Zone is required"),
  ward: yup
    .string()
   
    .required("Ward is required"),
  phonenumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone Number must be 10 digits")
    .required("PhoneNumber is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  role: yup
    .string()

    
    .required("Role is required"),
});

const AddUser = ({ onclose, }) => {
  const [roles, setRoles] = useState([]);
  const [zone,setZone] = useState([]);
  const [ward,setWard] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const selectedZone = watch("zone");

  const filteredWards = ward.filter(
    (wards) => wards.zonename === selectedZone
  );
  
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
  useEffect(() => {
    axios.get(`${API}/ward/getwards`).then((res) => {
      setWard(res.data.data || []);
    });
  }, []);

  useEffect(() => {
    axios.get(`${API}/zone/getzones`).then((res) => {
      setZone(res.data.data || []);
    });
  }, []);
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${API}/user/createuser`,
        data
      );
      localStorage.setItem(
        "lastUser",
        JSON.stringify({
          name: data.name,
          role: data.role,
          phonenumber: data.phonenumber,
        })
      );
      console.log("User Created:", res.data);
      reset();
    
      onclose();
      toast.success("User Added Successfully!");
    } catch (error) {
      console.log("AXIOS ERROR:", error.response.data);
  }
  };

  return (
    <div className="font-roboto-flex fixed inset-0 grid justify-center items-center backdrop-blur-xs backdrop-grayscale-50  drop-shadow-lg z-20">
      <div className=" shadow-lg py-2  bg-white  rounded-md  ">
        <div className="grid">
          <button
            onClick={onclose}
            className=" place-self-end   cursor-pointer bg-white rounded-full lg:-mx-4 md:-mx-4 -mx-2 lg:-my- md:-my-5  -my-3 lg:shadow-md md:shadow-md shadow-none lg:py-2.5 md:py-2.5 py-1 lg:px-2.5 md:px-2.5 px-1 "
          >
            <IoClose className="size-[24px]" />
          </button>
          <h1 className="text-center font-medium text-2xl py-2">Add User</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" px-7 py-6">
              <div className=" lg:space-y-4 space-y-3.5">
                <InputField
                  label="Name"
                  name="name"
                  placeholder="Type Here"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Zone"
                  name="zone"
                  placeholder="Type Here"
                  type="select"
                  register={register}
                  errors={errors}
                  options={zone.map((zone) => ({
                    value: zone.zonename,
                    label: zone.zonename,
                  }))}
                />
                <InputField
                  label="Ward"
                  name="ward"
                
                  register={register}
                  type="select"
                  errors={errors}
                  placeholder={
                    selectedZone ? "Select Ward" : "Select Zone First"
                  }
                  options={filteredWards.map((w) => ({
                    value: w.wardname,
                    label: w.wardname,
                  }))}
                />
                <InputField
                  label="Phone Number"
                  name="phonenumber"
                  register={register}
                  errors={errors}
                  placeholder="Type Here"
                />
                <InputField
                  label="Email"
                  name="email"
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
            <div className="mx-7 text-xs flex lg:justify-end md:justify-center justify-center gap-2 mb-4">
              <button
                type="button"
                onClick={onclose}
                className="cursor-pointer  border  border-light-grey  text-light-grey px-6 py-2   rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer px-6 bg-darkest-blue text-white py-2   rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;

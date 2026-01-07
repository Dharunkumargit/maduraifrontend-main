import React from "react";
import { BiFilterAlt } from "react-icons/bi";
import { TbFileExport } from "react-icons/tb";
import Button from "../../components/Button";
import Title from "../../components/Title";
import pic from "../../assets/images/Profile.png";
import { CheckCircle, Flag, MapPin, User, Wrench } from "lucide-react";

const ViewEmployeeManagement = () => {
  const activities = [
    {
      icon: <CheckCircle className=" w-5 h-5" />,
      title: "Resolved Alert in Zone A",
      time: "2 hours ago",
    },
    {
      icon: <Wrench className=" w-5 h-5" />,
      title: "Completed Maintenance in Ward 1",
      time: "Yesterday",
    },
    {
      icon: <Flag className=" w-5 h-5" />,
      title: "Reported Misuse in Zone B",
      time: "3 days ago",
    },
    {
      icon: <MapPin className=" w-5 h-5" />,
      title: "Assigned to Zone A",
      time: "1 week ago",
    },
    {
      icon: <User className=" w-5 h-5" />,
      title: "Joined EcoTrack",
      time: "1 month ago",
    },
  ];
  return (
    <div>
      <div className="flex justify-between ">
        <Title
          title="Employee Management"
          page_title="Employee Management"
          sub_title="Table"
        />
        <div className="flex items-center gap-2 mr-4">
          <Button
            button_icon={<TbFileExport size={22} />}
            button_name="Export"
            bgColor="bg-white"
            textColor="text-dark-brown"
          />
          <Button
            button_icon={<BiFilterAlt size={22} />}
            button_name="Filter"
            bgColor="bg-white"
            textColor="text-dark-brown"
          />
        </div>
      </div>
      <div className="bg-lightest-blue p-6 rounded-2xl  border-4 border-white  mt-4 mr-4 mb-15 ">
        <div className="grid  md:grid-cols-2 lg:grid-cols-5 gap-4   ">
          {[
            { label: "Alerts Handled", value: "125" },
            { label: "On-Time Resolutions", value: "95%" },
            { label: "Avg.Response Time", value: "2 hours" },
            { label: "Escalations", value: "5" },
            { label: "Misuse Reports Filed", value: "2" },
          ].map((item, i) => (
            <div
              key={i}
              className="col-span-1 flex flex-col gap-2 pl-7 rounded-md border-input-bordergrey border bg-light-blue py-7"
            >
              <p className="text-sm font-inter font-medium">{item.label}</p>
              <p className="text-xl font-inter font-bold">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:items-start  gap-10 lg:gap-0 mt-10 mb-6 px-4 md:px-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full lg:w-1/3">
            <img
              src={pic}
              alt="Profile"
              className="w-40 h-40 md:w-48 md:h-48 rounded-lg object-cover"
            />
            <div className="mt-4 space-y-1 font-inter">
              <h2 className="text-lg font-semibold">Priya Sharma</h2>
              <p className="text-gray-600 text-sm">Operations</p>
              <p className="text-[#5E758C] text-sm">Employee ID: 78901</p>
              <p className="text-[#5E758C] text-sm">Department: Maintenance</p>
              <p className="text-[#5E758C] text-sm">Status: Active</p>
              <p className="text-[#5E758C] text-sm">Phone: +91 9876543210</p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
              Recent Activity Log
            </h3>

            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    {activity.icon}
                    {index !== activities.length - 1 && (
                      <div className="w-0.5 h-8 bg-gray-300 mt-1"></div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-black">{activity.title}</p>
                    <p className="text-sm font-inter text-[#5E758C]">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeManagement;

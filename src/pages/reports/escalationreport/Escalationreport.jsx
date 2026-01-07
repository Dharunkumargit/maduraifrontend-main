import React from "react";
import logo from "../../../assets/images/MaduraiLogo.png";
import { IoMdArrowDropdown } from "react-icons/io";
import Title from "../../../components/Title";

const EscalationReport = () => {
  const reportData = [
    {
      
      employee: "#565",
      ward:"12",
      zone:"Name",
      escalationcount:"12",
      l1:"L1",
      l2:"l2",
      delayduration:"30 mins"
    },
    {
      
      employee: "#565",
      ward:"12",
      zone:"Name",
      escalationcount:"12",
      l1:"L1",
      l2:"l2",
      delayduration:"30 mins"
    },
    {
      
      employee: "#565",
      ward:"12",
      zone:"Name",
      escalationcount:"12",
      l1:"L1",
      l2:"l2",
      delayduration:"30 mins"
    },
    {
      
      employee: "#565",
      ward:"12",
      zone:"Name",
      escalationcount:"12",
      l1:"L1",
      l2:"l2",
      delayduration:"30 mins"
    },
    
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-4 mr-4">
        <div>
          <Title title="Reports" sub_title="Table" page_title="Reports" />
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="date"
              placeholder="From"
              className=" bg-white rounded-md pl-6 pr-4 py-3 focus:outline-none"
            />
          </div>

          <div className="relative">
            <input
              type="date"
              placeholder="To"
              className=" bg-white rounded-md pl-6 pr-4 py-3 focus:outline-none"
            />
          </div>

          <button className="flex items-center justify-between bg-white rounded-md px-4 py-3 text-gray-700">
            Export <IoMdArrowDropdown className="ml-1" />
          </button>

          <button className="bg-darkest-blue text-white rounded-md px-5 py-3">
            Continue
          </button>
        </div>
      </div>

      <div className="bg-white rounded-t-lg  pl-10 pt-5 h-34 ml-5 mr-7 pr-10  ">
        <div className="flex items-center justify-between w-full">
          <div className="">
            <img src={logo} alt="Logo" className="w-22  rounded-full mr-2" />
          </div>

          <div className=" ">
            <h2 className="text-xl text-center font-semibold">Esclation Report</h2>
            <p className="text-gray-500  text-center text-sm">01.10.2025 - 10.10.2025</p>
          </div>

          <div className="text-right ">
            <p className="text-sm font-medium">
              <span className="text-black font-semibold">Date:</span> 10.10.2025
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-b-lg  pt-2 ml-5 mr-7  mt-1.5 mb-13">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full border border-light-grey text-sm  text-black">
            <thead className="bg-[#EBEBEB] h-35">
              <tr>
                <th className="border border-light-grey p-5  ">S.no</th>
                
                <th className="border border-light-grey p-4 ">
                  Employee
                </th>
                <th className="border border-light-grey p-3 ">
                  Zone
                </th>
                <th className="border border-light-grey p-3 ">
                  Ward
                </th>

                <th className="border border-light-grey p-3 ">
                  Escalation Count
                </th>
                <th className="border border-light-grey p-3 ">
                  L1
                </th>
                <th className="border border-light-grey p-3 ">
                  L2
                </th>
                <th className="border border-light-grey p-3 ">
                  Delay Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item, index) => (
                <tr key={item.id} className="  text-center text-input-grey ">
                  <td className="border border-input-grey p-4">{index + 1}</td>
                  <td className="border border-input-grey p-4">
                    {item.employee}
                  </td>
                  <td className="border border-input-grey p-4">
                    {item.zone}
                  </td>
                  <td className="border border-input-grey p-4">
                    {item.ward}
                  </td>
                  <td className="border border-input-grey p-4">
                    {item.escalationcount}
                  </td>
                  <td className="border border-input-grey p-4">
                    {item.l1}
                  </td>
                  <td className="border border-input-grey p-4">
                    {item.l2}
                  </td>

                  <td className="border border-input-grey p-4">
                    {item.delayduration}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-input-grey text-sm  py-4">
          Report generated on 10.01.2025 &nbsp; &nbsp; Powered by{" "}
          <span className="font-semibold">madurai municipal corporation</span>
        </p>
      </div>
    </div>
  );
};

export default EscalationReport;

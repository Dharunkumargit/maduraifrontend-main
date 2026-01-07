import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../../assets/images/MaduraiLogo.png";
import { IoMdArrowDropdown } from "react-icons/io";
import Title from "../../../components/Title";
import { API } from "../../../../const"; // Your API base URL

const Binwisereport = () => {
  const [reportData, setReportData] = useState([]);

  // Fetch bin report from backend
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(`${API}/bins/getbinreport`);
        if (res.data.success) {
          setReportData(res.data.data); // Update state with fetched report
        }
      } catch (error) {
        console.error("Failed to fetch bin report:", error);
      }
    };

    fetchReport();
  }, []);

  return (
    <div>
      {/* Header and Date Filters */}
      <div className="flex items-center justify-between mb-4 mr-4">
        <div>
          <Title title="Reports" sub_title="Table" page_title="Reports" />
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="date"
              placeholder="From"
              className="bg-white rounded-md pl-6 pr-4 py-3 focus:outline-none"
            />
          </div>

          <div className="relative">
            <input
              type="date"
              placeholder="To"
              className="bg-white rounded-md pl-6 pr-4 py-3 focus:outline-none"
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

      {/* Report Title Section */}
      <div className="bg-white rounded-t-lg pl-10 pt-5 h-34 ml-5 mr-7 pr-10">
        <div className="flex items-center justify-between w-full">
          <div>
            <img src={logo} alt="Logo" className="w-22 rounded-full mr-2" />
          </div>

          <div>
            <h2 className="text-xl text-center font-semibold">Bin-wise Report</h2>
            <p className="text-gray-500 text-center text-sm">01.10.2025 - 10.10.2025</p>
          </div>

          <div className="text-right">
            <p className="text-sm font-medium">
              <span className="text-black font-semibold">Date:</span> 10.10.2025
            </p>
          </div>
        </div>
      </div>

      {/* Report Table */}
      <div className="bg-white rounded-b-lg pt-2 ml-5 mr-7 mt-1.5 mb-13">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full border border-light-grey text-sm text-black">
            <thead className="bg-[#EBEBEB] h-35">
              <tr>
                <th className="border border-light-grey p-5">S.no</th>
                <th className="border border-light-grey p-4">Bin ID</th>
                <th className="border border-light-grey p-4">Ward No</th>
                <th className="border border-light-grey p-4">Zone Name</th>
                <th className="border border-light-grey p-3">Total Bins Installed</th>
                <th className="border border-light-grey p-3">Active Alerts</th>
                <th className="border border-light-grey p-3">No of Times cleared</th>
                <th className="border border-light-grey p-3">Average Response Time</th>
                <th className="border border-light-grey p-3">TAT Compliance (%)</th>
                <th className="border border-light-grey p-3">No. of Escalations</th>
                <th className="border border-light-grey p-3">Total Garbage Collected (Tons)</th>
              </tr>
            </thead>
            <tbody>
              {reportData.length > 0 ? (
                reportData.map((item) => (
                  <tr key={item.id} className="text-center text-input-grey">
                    <td className="border border-input-grey p-4">{item.id}</td>
                    <td className="border border-input-grey p-4">{item.binid}</td>
                    <td className="border border-input-grey p-4">{item.wardno}</td>
                    <td className="border border-input-grey p-4">{item.zone}</td>
                    <td className="border border-input-grey p-4">{item.totalBins}</td>
                    <td className="border border-input-grey p-4">{item.activeAlerts}</td>
                    <td className="border border-input-grey p-4">{item.cleared}</td>
                    <td className="border border-input-grey p-4">{item.responseTime}</td>
                    <td className="border border-input-grey p-4">{item.compliance}</td>
                    <td className="border border-input-grey p-4">{item.escalations}</td>
                    <td className="border border-input-grey p-4">{item.garbage}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center p-4 text-gray-500">
                    Loading report data...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-center text-input-grey text-sm py-4">
          Report generated on 10.01.2025 &nbsp;&nbsp; Powered by{" "}
          <span className="font-semibold">madurai municipal corporation</span>
        </p>
      </div>
    </div>
  );
};

export default Binwisereport;


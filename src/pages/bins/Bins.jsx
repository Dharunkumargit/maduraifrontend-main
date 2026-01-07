import React, { useEffect, useState } from 'react'
import Table from '../../components/Table'
import { HiOutlineTrash } from 'react-icons/hi'
import { Binsdata } from '../../components/Data';
import AddNewBin from './AddNewBin';
import axios from "axios";
import { API } from '../../../const';
import { toast } from 'react-toastify';
import ViewBins from './ViewBins';
import EditBins from './EditBins';

const Bins = () => {
  const [binData, setBinData] = useState([]);
   const fetchbins = async () => {
     try {
       const res = await axios.get(`${API}/bins/getallbins`, binData);
       setBinData(res.data.data); 
     } catch (error) {
       console.log("Bin Fetch Error:", error);
     }
   }

   useEffect(() => {
     fetchbins();
   }, []);

   const handleDeleteBin = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bin?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/bins/deletebinbyid/${id}`);
      toast.success("Bin deleted successfully");

      // Remove row instantly
      setBinData((prev) => prev.filter((bin) => bin._id !== id));
    } catch (error) {
      toast.error("Failed to delete bin");
      console.error(error);
    }
  };
    const Columns = [
        { label: "Bin ID", key: "binid" },
        { label: "Zone", key: "zone" },
        { label: "Ward", key: "ward" },
        { label: "Bin Type", key: "bintype" },
        { label: "Location", key: "location" },
        { label: "Filled%", key: "filled" },
        { label: "Last Updated", key: "lastcollected" },
        { label: "Status", key: "status" },
      ];
  return (
    <div>
      <Table title="Bins"
      sub_title="Table"
      pagetitle="Bins"
      addButtonLabel="Add New Bin"
      addButtonIcon={<HiOutlineTrash size={22} />}
      colomns={Columns}
      tabledata={binData}
      onDelete={handleDeleteBin}
      AddModal={(modalProps) => <AddNewBin {...modalProps} onclose={() => {
        modalProps.onclose();
        fetchbins(); 
      }} />}
      ViewModel={true}
      EditModal={EditBins}
      routepoint={"viewbins"}/>
    </div>
  )
}

export default Bins

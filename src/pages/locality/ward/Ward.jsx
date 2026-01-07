import React, { useEffect, useState } from 'react'
import Table from '../../../components/Table'
import { Warddata } from '../../../components/Data';
import axios from "axios";
import { RiUserAddLine } from 'react-icons/ri';
import AddWard from './AddWard';
import { API } from '../../../../const';
import EditWard from './EditWard';
import { toast } from 'react-toastify';

const Ward = () => {
  const [wards, setWards] = useState([]);
  const getWards = async () => {
    try {
      const res = await axios.get(`${API}/ward/getwards`, wards);
      setWards(res.data.data); 
    } catch (error) {
      console.log("Ward Fetch Error:", error);
    }
  };

  useEffect(() => {
    getWards();
  }, []);

    const Columns = [
        { label: "Zone", key: "zonename" },
        { label: "Ward", key: "wardname" },
        { label: "Total Bins", key: "totalbins" },
        { label: "Active Bins", key: "activebins" },
        { label: "Inactive Bins", key: "inactivebins" },
        { label: "Status", key: "status" },
      ];

      const handleWarddelete = async (id) => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this ward?"
        );
        if (!confirmDelete) return;
        try {
          await axios.delete(`${API}/ward/deleteward/${id}`);
          toast.success("Ward deleted successfully");
          // Remove row instantly
          setWards((prev) => prev.filter((ward) => ward._id !== id));
        } catch (error) {
          toast.error("Failed to delete ward");
        }
      }
  return (
    <div>
        <Table title="Locality" sub_title="Ward" 
        pagetitle="Ward"
        colomns={Columns}
        EditModal={EditWard}
        showViewButton={false}
        tabledata={wards} 
        onDelete={handleWarddelete}
        addButtonLabel="Add Ward"
        addButtonIcon={<RiUserAddLine size={22} />}
        AddModal={(props) => <AddWard {...props} onRefresh={getWards} />}/>
    </div>
  )
}

export default Ward
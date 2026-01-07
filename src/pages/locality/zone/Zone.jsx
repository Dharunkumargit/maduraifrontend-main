import React, { useEffect, useState } from 'react'
import Table from '../../../components/Table'
import { Zonedata } from '../../../components/Data';
import axios from "axios";
import { LuMapPin } from 'react-icons/lu';
import AddZone from './AddZone';
import { API } from '../../../../const';
import { Edit } from 'lucide-react';
import EditZone from './EditZone';
import { toast } from 'react-toastify';


const Zone = () => {
  const [zones, setZones] = useState([]);
  const getZones = async () => {
    try {
      const res = await axios.get(`${API}/zone/getzones`,);
      setZones(res.data.data); 
    } catch (error) {
      console.log("Zone Fetch Error:", error);
    }
  };

  useEffect(() => {
    getZones();
  }, []);

  const Columns = [
    { label: "Zone Name", key: "zonename" },
    { label: "Total Bins", key: "totalbins" },
    { label: "Active Bins", key: "activebins" },
    
    { label: "Inactive Bins", key: "inactivebins" },
    { label: "Status", key: "status" },
  
    
  ];
  const handleZonedelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this zone?"
    );
  
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`${API}/zone/deletezonebyid/${id}`);
      toast.success("Zone deleted successfully");
  
      // Remove row instantly
      setZones((prev) => prev.filter((zone) => zone._id !== id));
    } catch (error) {
      toast.error("Failed to delete zone");
    }
  };
  return (
    <div>
        <Table title="Locality" sub_title="Zone" 
        pagetitle="Zone"
        colomns={Columns}
        tabledata={zones}
        showViewButton={false}
        addButtonLabel="Add Zone"
         EditModal={EditZone}
         onDelete={handleZonedelete}
        addButtonIcon={<LuMapPin size={22}/>}
        AddModal={(props) => <AddZone {...props} onRefresh={getZones} />}/>
    </div>
  )
}

export default Zone
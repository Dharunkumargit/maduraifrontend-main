import React from 'react'
import Table from '../../../components/Table'
import { RiUserAddLine } from 'react-icons/ri'
import { Userdata } from '../../../components/Data';
import AddUser from './AddUser';
import { useState, useEffect } from "react";

import axios from "axios";
import { API } from '../../../../const';
import EditUser from './EditUser';
import { toast } from 'react-toastify';
import AddEmploye from '../../employeemanagement/AddEmploye';

const User = () => {
  const [users, setusers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${API}/user/getuser`,);
      console.log(res.data.data); // check structure
      setusers(res.data.data); // ⬅ correct
    } catch (error) {
      console.log("GET Users Error: ", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bin?"
    );

    if (!confirmDelete) return;
    try {
      await axios.delete(`${API}/user/deleteuserbyid/${id}`);
      toast.success("User deleted successfully");
      // Remove row instantly
      setusers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
    }
  }

  const Columns = [
    { label: "Name", key: "name" },
    { label: "Role", key: "role" },
    { label: "Phone Number", key: "phonenumber" },
    
    { label: "Email", key: "email" },
    { label: "Status", key: "status" },
    { label: "Created By", key: "createdby" },
    
  ];
  return (
    <div>
      <Table title="Settings" sub_title="User" pagetitle="User"
      addButtonLabel="Add User"
      addButtonIcon={<RiUserAddLine size={22}/>}
      colomns={Columns}
      tabledata={users}
      showViewButton={false}
      onDelete={handleDeleteUser}
      AddModal={(modalProps) => <AddUser {...modalProps} onclose={() => {
        modalProps.onclose();
        getAllUsers(); // Refresh on close
      }} />}
      EditModal={true}
      
      
      editroutepoint={"edituser"}
      onEdit={(row) => {
        console.log("ROW CLICKED:", row); // ✅ DEBUG
        setSelectedUser(row);
      }}
      
      />
      
    </div>
  )
}

export default User

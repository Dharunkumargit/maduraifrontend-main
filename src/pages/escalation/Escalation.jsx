import React, { useEffect, useState } from 'react'
import Table from '../../components/Table'
import { Excalationdata } from '../../components/Data';
import axios from "axios";
import { API } from '../../../const';

const Escalation = () => {

  const [data, setData] = useState([]);

  const getEscalations = async () => {
    try {
      const res = await axios.get(`${API}/escalation/getescalations`);
      setData(res.data.data);
    } catch (err) {
      console.log("Escalation Fetch Error", err);
    }
  };

  useEffect(() => {
    getEscalations();
  }, []);
  const Columns = [
    { label: "Bin id", key: "binid" },
    { label: "Ward", key: "ward" },
    { label: "Zone", key: "zone" },
    
    { label: "Engineer", key: "engineer" },
    { label: "Escalation Level", key: "escalationlevel" },
    
  ];
  return (
    <div>
      <Table 
          title="Escalation" 
          sub_title="Table" 
          pagetitle="Escalation"
          colomns={Columns} 
          tabledata={data}
          showEditButton={false}
          showDeleteButton={false}
          ViewModel={true}
          routepoint={"viewescalation"}/>
    </div>
  )
}

export default Escalation

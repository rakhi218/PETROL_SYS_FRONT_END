import axios from 'axios';
import React, { useState,useEffect } from 'react'
//import './DeleteStaffRecord.css'

const showDetails = async(event) => {
  const obj  = {
    tblStaffId : document.getElementById("StaffId").value,
    tblDate : document.getElementById("AttaindanceDate").value
  }
  try {
    const res = await axios.get("https://localhost:7086/api/StaffAttendance",obj);
    console.log(res);
  }catch(err){
    console.log(err);
  }
}

function DeleteStaffRecord (){

  const [staffs,setStaffs] = useState([]);

  useEffect(() => {
    async function GetStaffData() {
      try {
        const res = await axios.get("https://localhost:7215/api/staff");
        console.log(res);
        setStaffs(res.data);
      }catch(err){
        console.log(err);
      }
    }
    GetStaffData();
  },[])

  return (
    <>
    <div>
    <h1 className= "head" align = "center">Delete Staff Record </h1>
    <form className="formclassName">
            <div>
        <label>Staff ID </label>
        <select className ="button" name="StaffIDs" id="StaffId">
          {staffs.map((record) => (
            <option key={record.tblStaffID} value={record.tblStaffID} id="tblStaffId">
              {record.tblStaffID}
            </option>
          ))}
        </select>
                        
    </div>
    <div>
    <label>Attendance </label>
     <input type="text" id="attendance" name="Attendance" className = "textbox" />&ensp;&ensp;
    </div>
    <div>
        <label>Date </label>
    <input type="date" id="AttaindanceDate"/>
    </div>
    <div>
    <label>Pump </label>
    <input type="text" id="pump" name="Pump" className = "textbox" />&ensp;&ensp;
    </div>
    <button type = "submit" className="button">Delete </button>
    <button type = "button" className="button" onClick={showDetails}> Show Details </button>
    </form>
    </div>
    </>
  )
}

export default DeleteStaffRecord;

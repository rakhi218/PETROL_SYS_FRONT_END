import axios from 'axios';
import React, { useState,useEffect } from 'react'

//import './DeleteStaffRecord.css'
function DeleteStaffRecord (){

  const [staffs,setStaffs] = useState([]);
  const [absentButton,setAbsentButton] = useState(true);

  async function showDetails() {
   
    const obj  = {
      tblStaffId : document.getElementById("StaffId").value,
      tblDate : document.getElementById("AttaindanceDate").value
    }
    try {
      const res = await axios.post("https://localhost:7086/api/StaffAttendance",obj);
      console.log(res);
      document.getElementById("attendance").value = res.data.tblAttendance;
      document.getElementById("pump").value = res.data.tblShiftPump;
      if(res.data.tblAttendance === 'Absent'){
        setAbsentButton(false);
      }
    }catch(err){
      console.log(err);
    }
  }

  async function DelteStaff(){
    const obj  = {
      tblStaffId : document.getElementById("StaffId").value,
      tblDate : document.getElementById("AttaindanceDate").value
    } 
    console.log(obj);
    try {
      const res = await axios.post("https://localhost:7086/api/StaffAttendance/deleteStaff",obj);
      console.log(res);
      document.getElementById("AttaindanceDate").value="";
      document.getElementById("pump").value = "";
      document.getElementById("attendance").value = "";
      setAbsentButton(true);
    }catch(err){
      console.log(err)
    }
  }

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
        <label>Staff Name </label>
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
    <button type = "button" className="button" disabled={absentButton} onClick={DelteStaff}>Delete </button>
    <button type = "button" className="button" onClick={showDetails}> Show Details </button>
    </form>
    </div>
    </>
  )
}

export default DeleteStaffRecord;

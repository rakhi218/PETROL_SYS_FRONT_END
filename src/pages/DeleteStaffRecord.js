import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import '../styles/DeleteStaffRecord.css'
function DeleteStaffRecord (){

  const [staffs,setStaffs] = useState([]);
  const [absentButton,setAbsentButton] = useState(true);

  async function showDetails() {
   
    const obj  = {
      tblStaffId : document.getElementById("StaffId").value,
      tblDate : document.getElementById("AttaindanceDate").value
    }
    try {
      const res = await axios.post("https://localhost:7086/api/StaffAttendance",obj,{headers:{'Authorization':'Bearer'+" "+localStorage.getItem("Token")}});
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
      const res = await axios.post("https://localhost:7086/api/StaffAttendance/deleteStaff",obj,{headers:{'Authorization':'Bearer'+" "+localStorage.getItem("Token")}});
      console.log(res);
      document.getElementById("AttaindanceDate").value="";
      document.getElementById("pump").value = "";
      document.getElementById("attendance").value = "";
      setAbsentButton(true);
      toast("Staff entry deleted");
      document.getElementById("staffForm").submit();
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    async function GetStaffData() {
      try {
        const res = await axios.get("https://localhost:7215/api/staff",{headers:{'Authorization':'Bearer'+" "+localStorage.getItem("Token")}});
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
    <div className='body'>
    <h1 className= "head" align = "center"><u>Delete Staff Record</u></h1>
    
    <form className="" id="staffForm">
      <label For="">Staff Name</label>
      <select className="" name="StaffIDs" id="StaffId">
        {staffs.map((record) => (
          <option key={record.tblStaffID} value={record.tblStaffID} id="tblStaffId">
            {record.tblStaffID}
          </option>
        ))}
      </select>

      <label For="attendance">Attendance</label>
      <input type="text" class="input" id="attendance" name="Attendance" placeholder="Attendance..."></input>

      <label For="AttaindanceDate">Date</label>
      <input type="date" class="input" id="AttaindanceDate" name="AttaindanceDate" ></input>

      <label For="pump">Pump</label>
      <input type="text" class="input" id="pump" name="Pump" placeholder="Pump..."></input>
      
      <button type = "button" className="buttonn" disabled={absentButton} onClick={DelteStaff}>Delete </button>&nbsp; 
      <button type = "button" className="buttonn" onClick={showDetails}> Show Details </button>
  
    </form>
    </div>
    <ToastContainer />
    </>
  )
}

export default DeleteStaffRecord;

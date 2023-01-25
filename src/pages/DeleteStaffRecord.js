import axios from 'axios';
import React, { useEffect } from 'react'
//import './DeleteStaffRecord.css'

const handleSubmit = async(event) => {
  // event.preventDefault();
  // const data = new FormData(event.currentTarget);
  // try {
  //   const res = await axios.delete("https://localhost:7086/api/StaffAttendance",{tblStaffId: data.get('')});
  // }catch(err){
  //   console.log(err);
  // }
}

function DeleteStaffRecord (){

  // useEffect(() => {
  //   async function GetStaffData() {
  //     try {
  //       const res = await axios.get("https://localhost:7086/api/StaffAttendance",{tblStaffId: "CS-2001-005",tblDate : Date().toLocaleString()});
  //       console.log(res);
  //     }catch(err){
  //       console.log(err);
  //     }
  //   }
  //   GetStaffData();
  // })

  return (
    <>
    <div>
    <h1 className= "head" align = "center">Delete Staff Record </h1>
    <form className="formclassName" onSubmit={handleSubmit}>
            <div>
        <label>Staff ID </label>
        <select className ="button">   <option selected>Choose...</option>
                    <option>...</option>
                 </select>
                        
    </div>
    <div>
    <label>Attendance </label>
     <input type="text" id="attendance" name="Attendance" className = "textbox" />&ensp;&ensp;
    </div>
    <div>
        <label>Date </label>
    <input type="datetime-local" />
    </div>
    <div>
    <label>Pump </label>
    <input type="text" id="pump" name="Pump" className = "textbox" />&ensp;&ensp;
    </div>
    <button type = "submit" className="button">Delete </button>
    </form>
    </div>
    </>
  )
}

export default DeleteStaffRecord;

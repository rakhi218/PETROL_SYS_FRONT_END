import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useLocation} from 'react-router-dom';
import React, { useState,useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sales = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    // document.getElementById("StaffIds").value = state.tblStaffID;
    // document.getElementById("date").value = state.tblDate;
    // document.getElementById("shifts").value = state.tblShift;
    // document.getElementById("Litres").value = state.tblshiftLitres;
    // document.getElementById("Amount").value = state.tblAmount;

    useEffect(() => {
        async function GetStaffs() {
          try {
            const res = await axios.get("https://localhost:7215/api/Staff");
            console.log(res.data);
            const IDS=[];
            const stff=[]
            await res.data.map((record) => {
              IDS.push(record.tblStaffID);
              stff.push(record)
          })
            setStaffid(IDS);
            setStaffs(stff);
          }catch(err){
            console.log(err);
          }
        }
        GetStaffs();
      },[])

      async function SaveRecord() {
        console.log(state);
        try {
            const obj = {
                tblDate : state.tblDate,
                tblStaffID : state.tblStaffID,
                tblAttendance : document.getElementsByName('attendance'),
                tblShift : state.tblShift,
                tblShiftPump : state.tblShiftPump,
                tblshiftLitres : state.tblshiftLitres,
                tblTarget : state.tblTarget,
                tblIncentive : state.tblIncentive,
                tblAmount : state.tblAmount
            }
            const res = await axios.post("https://localhost:7086/api/PumpSales/CreateSalesEntry",obj);
            console.log(res);
        }catch(err){
            console.log(err);
        }
          toast("Record saved successfully!");
      }

      async function HelpNavigate() {
        const staffID = document.getElementById("StaffIds").value;
        const index = staffid.indexOf(staffID)
        console.log(index)
        const res = staffs[index];
        console.log(res)
        navigate("/CalculateLitSold",{
            state : {
                staff_id : staffID,
                staff_name : res.tblFirstName + " " + res.tblSurname,
                date : document.getElementById("date").value,
                shift : document.getElementById("shifts").value
            }
        });
      }

      const [staffid, setStaffid] = useState([]);
      const [staffs,setStaffs] = useState([]);
   
    
    return (
        <>
           <br/> <h1 align="center" class="head">Staff Management</h1>
               <form class="formclass" >
                <div class = "maindiv">
            <div class="leftdiv">
                <div class="col-md-6">
                    <label >Staff Identification<br/></label>  </div>  </div>
                    <label for="inputRegistrationNo" style={{align: "left"}}class="form-label">Staff ID&ensp;&ensp;  </label>
                 <select name="StaffIds" id="StaffIds"> 
                    {staffid.map((record) => (
                        <option key={record} value={record} id="pumps">
                            {record}
                        </option>
                    ))}
                </select>
            <div>
                <label><br/>Date and Time </label>
                <input type="datetime-local" id="date" name="date" />
            </div>
            <div>
                <label>Shifts </label>
                <select name="shifts" id="shifts">
                   <option value="morning">Morning</option>
                   <option value="night">Night</option>
                </select>
            </div>

            <div>
                <label>Sales Information <br/></label>
                <label for="Litres">Litres &ensp;</label>
                    <input type="number" id="Litres" name="Litres"></input>
                <label for="Amount"><br />Amount &ensp;</label>
                    <input type="number" id="Amount" name="Amount"></input>
                   <br /> <button type = "calculate" class="button" onClick={HelpNavigate}>Calculate</button>
            </div>
            <div>
                <label>Present/Absent</label><br/>
                <input type="radio" value="Present" name="attendance" /> Present  <br/>
                <input type="radio" value="Absent" name="attendance" /> Absent  <br/>
                <input type="radio" value="Off With Permisssion" name="attendance" /> Absent with Permission<br/>
                <input type="radio" value="Off" name="attendance" /> Off
                
            </div>
            <button type = "button" class="button" onClick={SaveRecord}>Save Record </button>&ensp;&ensp;&ensp;&ensp;
            <button type = "button" class="button">UnderBonnet <br/></button>
            </div> </form>
                <ToastContainer />
        </>
    )
}
export default Sales;

import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react'
import { ClickAwayListener } from '@mui/material';
// import './styles/MasterDelete.css'


function MasterDelete() {

    const [readings ,setReadings] = useState([]);
    const [pumps,setPumps] = useState([]);

    useEffect(() => {
        
        async function getAllPumpsRecord() {
            try {
                const res = await axios.get("https://localhost:7144/api/PumpManagement");
                const l=[]
                const r=[]
                await res.data.map((record) => {
                    l.push(record.tblPumpID);
                    r.push(record.tblLastReading);
                })
                setPumps(l);
                setReadings(r);
            }catch(err){
                console.log(err)
            }
        }
        getAllPumpsRecord();
    },[])

     
    async function Populate() {
        const index = document.getElementById("PumpIDS").value;
        document.getElementById("lastreading").value = readings[index-1];
        console.log(index);
        console.log(readings)
        const obj ={
            tblPumpID:index,
            tblFinalLitres:readings[index-1]
        }
        const res = await axios.post("https://localhost:7086/api/RemovePump",obj);
        console.log(res.data);
        document.getElementById("PumpNumber").value = res.data.tblPumpID;
        document.getElementById("PumpDate1").value = res.data.tblDate1;
        document.getElementById("PumpInitialReading").value = res.data.tblInitialLitres;
        document.getElementById("PumpLastReading").value = res.data.tblFinalLitres;
        document.getElementById("PumpSaleNumber").value = res.data.tblPumpID;
        document.getElementById("PumpDate2").value =  res.data.tblDate2;
        document.getElementById("StaffID").value = res.data.tblStaffID;
        document.getElementById("PumpShift").value = res.data.tblShift;
    }
    
    async function deleteForm() {
        const obj = {
            tblPumpID: document.getElementById("PumpNumber").value,
            tblStaffID : document.getElementById("StaffID").value,
            tblDate2 : document.getElementById("PumpDate2").value,
            tblFinalLitres : document.getElementById("PumpLastReading").value,
            tblInitialLitres : document.getElementById("PumpInitialReading").value,
            tblDate1 : document.getElementById("PumpDate1").value,
            tblShift : document.getElementById("PumpShift").value
        }
        const res = await axios.post("https://localhost:7086/api/RemovePump/deletepump",obj);
        console.log(res);
    }

    return (
        
        <>
        <div>
        <h1 className= "head" align = "center">Master Delete</h1>
            <form classNameName="formclassName">
            <div>
        <label>Select Pump </label>
        <select className ="button" name="PumpID" id="PumpIDS"> 
        {pumps.map((record) => (
            <option key={record} value={record} id="pumps">
                {record}
            </option>
        ))}
        </select>
        
    </div>
    <label>Last Reading </label>
     <input type="text" id="lastreading" name="Last Reading" className = "textbox"/>&ensp;&ensp;
     <button type = "button" className="button" onClick={Populate}>Show</button>

     <div>
        <text>Pump Record Detail </text> <br />
        <label>Pump Number </label>
     <input type="text" id="PumpNumber" name="Pump Number" className = "textbox" /><br/>
     <label>Date </label>
     <input type="datetime" id="PumpDate1" name="Date" className = "textbox"/><br/>
     <label>Initial Reading </label>
     <input type="text" id="PumpInitialReading" name="Initial Reading" className = "textbox" /><br/>
     <label>Final Reading </label>
     <input type="text" id="PumpLastReading" name="Final Reading" /><br/>
     </div>


     <div> 
        <text>Sales Record Detail </text> <br />
        <label>Pump Number </label>
     <input type="text" id="PumpSaleNumber" name="Pump Number" /><br/>
     <label>Date </label>
     <input type="datetime" id="PumpDate2" name="Date" /><br/>
     <label>Staff ID </label>
     <input type="text" id="StaffID" name="Staff Name" /><br/>
     <label>Shift </label>
     <input type="text" id="PumpShift" name="Shift" /><br/>
     </div>
     <button type = "button" className="button" onClick={deleteForm}>Delete</button>

            </form>
            
        </div>
        </>
    )
}
export default MasterDelete;

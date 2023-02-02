import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react'
import { ClickAwayListener } from '@mui/material';
// import '../styles/MasterDelete.css'
import '../styles/MasterDelete.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
        const index = parseInt(document.getElementById("PumpIDS").value);
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
            tblStaffId : document.getElementById("StaffID").value,
            tblDate2 : document.getElementById("PumpDate2").value,
            tblFinalLitres : document.getElementById("PumpLastReading").value,
            tblInitialLitres : document.getElementById("PumpInitialReading").value,
            tblDate1 : document.getElementById("PumpDate1").value,
            tblShift : document.getElementById("PumpShift").value
        }
        const res = await axios.post("https://localhost:7086/api/RemovePump/deletepump",obj);
        toast("Deleted Pump Record");
        document.getElementById("pumpForm").submit();
        console.log(res);
    }

    return (
        
        <>
        <div class="container">
            <h1>Master Delete</h1>
            <form className="" id="pumpForm">
                <label For="PumpIDS">Select Pump</label>
                <select className="PumpId" id="PumpIDS">
                    {pumps.map((record) => (
                        <option key={record} value={record} id="pumps">
                            {record}
                        </option>
                    ))}
                </select>

                <label for="lastreading">Last Reading</label>
                <input type="number" class="input" id="lastreading" name="Last Reading" placeholder="Last Reading...."></input>
                <button type = "button" class="buttonn" onClick={Populate}>Show</button>

                <h1>Pump Record Details</h1>
                <label for="PumpNumber">Pump Number</label>
                <input type="number" class="input" id="PumpNumber" name="Pump Number" placeholder="Pump Number.."></input>

                <label for="PumpDate1">Date </label>
                <input type="datetime" id="PumpDate1" class="input" name="pumpDate"></input>
                
                <label for="PumpInitialReading">Initial Reading </label>
                <input type="number" id="PumpInitialReading" class="input" name="Initial Reading" placeholder="Initial Reading"></input>
                
                <label for="PumpLastReading">Final Reading </label>
                <input type="number" id="PumpLastReading" class="input" name="Final Reading" placeholder="Final Reading..."></input>

                <h1>Sales Record Detail </h1>
                <label for="PumpSaleNumber">Pump Number </label>
                <input type="text" id="PumpSaleNumber" class="input" name="Pump Number" placeholder="Pump Number..."></input>
                
                <label for="PumpDate2">Date </label>
                <input type="datetime" id="PumpDate2" class="input" name="saleDate"></input>
                
                <label for="StaffID">Staff ID </label>
                <input type="text" id="StaffID" class="input" name="Staff Name" placeholder="Staff ID..."></input>
                
                <label for="PumpShift">Shift </label>
                <input type="text" id="PumpShift" class="input" name="Shift" placeholder="Shift.."></input>

                <button type = "button" class="buttonn" onClick={deleteForm}>Delete</button>
            </form>
        </div>
        <ToastContainer />
        </>
    )
}
export default MasterDelete;
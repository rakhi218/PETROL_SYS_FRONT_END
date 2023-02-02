import React, { useState,useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/PumpsManagement.css'

function PumpsManagement (){

  useEffect(() => {
    async function GetPumps() {
      try {
        const res = await axios.get("https://localhost:7144/api/pumpmanagement");
        console.log(res.data);
        const IDS=[];
        const stff=[]
        await res.data.map((record) => {
          IDS.push(record.tblPumpID);
          stff.push(record)
      })
      setPumpIds(IDS);
      setPumps(stff);
      }catch(err){
        console.log(err);
      }
    }
    GetPumps();
  },[])

  async function DisplayChange() {
    try{
      const pumpId = parseInt(document.getElementById("PumpIDS").value);
      const index = pumpids.indexOf(pumpId)
      const pumpDetails = pump[index];
      document.getElementById("productType").value = pumpDetails.tblPumpType;
      document.getElementById("highval").value = pumpDetails.tblResetValue;
    }catch(err){
      console.log(err);
    }
  }

  async function SetEditButton() {
    setEditPump(!editPump);
  }

  async function EditPump() {

    if(!hiddenPumpId){
      try {
        const obj = {
          tblPumpID : parseInt(document.getElementById("PumpId").value),
          tblPumpType : document.getElementById("productType").value,
          tblLastReading : 0,
          tblResetValue : document.getElementById("highval").value,
        }
        const res = await axios.post("https://localhost:7144/api/pumpmanagement",obj);
        console.log(res);
        toast("New Pump Created");
        document.getElementById("pumpForm").submit();
      }catch(err){
        console.log(err);
      }
    }else {
        try {
          const pumpId = parseInt(document.getElementById("PumpIDS").value);
          const index = pumpids.indexOf(pumpId)
          const pumpDetails = pump[index];
          const obj = {
            tblPumpID : parseInt(document.getElementById("PumpIDS").value),
            tblPumpType : document.getElementById("productType").value,
            tblLastReading : pumpDetails.tblLastReading,
            tblResetValue : document.getElementById("highval").value
          }
          const res = await axios.post("https://localhost:7144/api/pumpmanagement/updatepump",obj);
          console.log(res);
          toast("Updated Pump Record");
          document.getElementById("pumpForm").submit();
        }catch(err){
          console.log(err);
        }
    }

  }

  async function DeletePump(){
    try {
      const obj = {
        tblPumpID : parseInt(document.getElementById("PumpIDS").value),
        tblPumpType : "PMS",
        tblLastReading : 1000,
        tblResetValue : 0
      }
      const res = await axios.post("https://localhost:7144/api/pumpmanagement/deletepump",obj);
      console.log(res);
      toast("Deleted Pump Record");
      document.getElementById("pumpForm").submit();
    }catch(err){
      console.log(err);
    }
  }

  async function CreatePump(){
    setHiddenPumpId(!hiddenPumpId);
    setEditPump(!editPump);
  }

  const [pumpids,setPumpIds] = useState([]);
  const [pump,setPumps] = useState([]);
  const [editPump,setEditPump] = useState(true);
  const [hiddenPumpId,setHiddenPumpId] = useState(true);

  return (

    <>

    <body>
      <div className="container">
    <h1 align = "center"><u>Pumps Management</u></h1>

    <form className="" id="pumpForm">
    <label For="PumpIDS" hidden={!hiddenPumpId}>Select Pump</label>
      <select id="PumpIDS" name="PumpID" disabled={!editPump} onChange={DisplayChange} hidden={!hiddenPumpId}>
        {pumpids.map((record) => (
          <option key={record} value={record} id="pumps">
            {record}
          </option>
        ))}
      </select>
      <label For="productType">Product</label>
      <select className="" id="productType" disabled={editPump}>
        <option selected>Choose...</option>
        <option>AGO</option>
        <option>DPK</option>
        <option>PMS</option>
        <option>BULK</option>
      </select>

      <label For="highval">Highest Value</label>
      <input type="text" class="input" id="highval" name="highval"  disabled={editPump} />

      
      <label For="PumpId" hidden={hiddenPumpId}>Enter Pump Id</label>
      <input type="text" id="PumpId" name="PumpId" class="input" hidden={hiddenPumpId}></input>

      <button type = "button" className="buttonn" onClick={EditPump} >SAVE </button> &nbsp;
      <button type = "button" className="buttonn" onClick={SetEditButton} hidden={!hiddenPumpId}>Edit Pump Details </button>&nbsp;
      <button type = "button" className="buttonn" onClick={DeletePump} hidden={!hiddenPumpId}>Remove Pump </button>&nbsp;
      <button type = "button" className="buttonn" onClick={CreatePump}>Create Pump </button>
    </form>
    </div>
    </body>
    <ToastContainer />
    </>

  )

}



export default PumpsManagement;
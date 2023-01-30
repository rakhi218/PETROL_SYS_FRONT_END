import React, { useState,useEffect } from "react";
import axios from 'axios';

// import '../styles/PumpsManagement.css'

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
      document.getElementById("highval").value = pumpDetails.tblLastReading;
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
      }catch(err){
        console.log(err);
      }
    }else {
        try {
          const obj = {
            tblPumpID : parseInt(document.getElementById("PumpIDS").value),
            tblPumpType : document.getElementById("productType").value,
            tblLastReading : document.getElementById("highval").value,
            tblResetValue : 0
          }
          const res = await axios.post("https://localhost:7144/api/pumpmanagement/updatepump",obj);
          console.log(res);
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

    <div>

    <h1 className= "head" align = "center">Pumps Management </h1>

    <form className="formclassName">
            <div>
        <label>Product &ensp;&ensp;&ensp;&ensp;&ensp;&ensp; </label>
        <select className ="button" id="productType" disabled={editPump}>   <option selected>Choose...</option>
                    <option>AGO</option>
                    <option>DPK</option>
                    <option>PMS</option>
                    <option>BULK</option>
        </select>
    </div>

    <br />

    <div>
    <label>Highest Value &ensp;&ensp;</label>
     <input type="text" id="highval" name="highval" className = "textbox" disabled={editPump} />&ensp;&ensp;
    </div>

    <div>
    <label hidden={!hiddenPumpId}>Select Pump &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</label>
        <select className ="button" name="PumpID" id="PumpIDS" disabled={!editPump} onChange={DisplayChange} hidden={!hiddenPumpId}> 
        {pumpids.map((record) => (
            <option key={record} value={record} id="pumps">
                {record}
            </option>
        ))}
        </select>
    </div>

    <div>
    <label hidden={hiddenPumpId}>Enter Pump Id &ensp;&ensp;</label>
     <input type="text" id="PumpId" name="PumpId" className = "textbox" hidden={hiddenPumpId}/>&ensp;&ensp;
    </div>

    <br/>

    <button type = "button" className="button" onClick={EditPump} >SAVE </button>&ensp;&ensp;

    <button type = "button" className="button" onClick={SetEditButton} hidden={!hiddenPumpId}>Edit Pump Details </button>&ensp;&ensp;

    <button type = "button" className="button" onClick={DeletePump} hidden={!hiddenPumpId}>Remove Pump </button>&ensp;&ensp;

    <button type = "button" className="button" onClick={CreatePump}>Create Pump </button>&ensp;&ensp;

    </form>

    </div>

    </>

  )

}



export default PumpsManagement;
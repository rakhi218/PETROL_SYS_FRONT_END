import '../styles/CalculateLitSold.css'
import axios from 'axios';
import React, { useState,useEffect } from "react";
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function CalculateLitSold() {

  const navigate = useNavigate();
  const { state } = useLocation();

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
      const products = await axios.get("https://localhost:7119/api/product");
      const prds=[]
      products.data.map((record) => {
        prds.push(record);
      })
      setProducts(prds);
      }catch(err){
        console.log(err);
      }
    }
    GetPumps();
  },[])

  async function DisplayPump() {
    try {
      const pumpId = parseInt(document.getElementById("PumpIDS").value);
      const index = pumpids.indexOf(pumpId)
      const pumpDetails = pump[index];
      document.getElementById("prod").value = pumpDetails.tblPumpType;
      document.getElementById("lastreading").value = pumpDetails.tblLastReading;
      var cost=0;
      await product.map((record) => {
        if(record.tblProductType == pumpDetails.tblPumpType){
          cost = record.tblCost;
        }
      })
      console.log(cost);
      document.getElementById("prodcost").value = cost;
      console.log(product);
    }catch(err){
      console.log(err);
    }
  }

  async function ComputePetrol() {
    try{
      const presentReading = parseInt(document.getElementById("presentreading").value);
      const lastreading = parseInt(document.getElementById("lastreading").value);
      if(presentReading < lastreading){
        // left for toast message
      }else{
        console.log("hi");
        document.getElementById("sold").value = presentReading - lastreading;
        document.getElementById("amount").value = (presentReading - lastreading)*(document.getElementById("prodcost").value)
      }
    }catch(err){
      console.log(err);
    }
  }

  async function PetrolRecord() {
    try {
      const obj = {
        tblPumpID : parseInt(document.getElementById("PumpIDS").value),
        tblDate : state.date,
        tblShift : state.shift,
        tblStaffId : state.staff_id,
        tblInitialLitres : parseFloat(document.getElementById("lastreading").value),
        tblFinalLitres : parseFloat(document.getElementById("presentreading").value),
        tblWasteLitres : parseFloat(document.getElementById("quant").value),
        tblLitresSold : parseInt(document.getElementById("sold").value),
        tblUnitCost : parseFloat(document.getElementById("prodcost").value),
        tblTotalCost : parseFloat(document.getElementById("amount").value),
        tblReturn : document.getElementById("reason").value,
        tblStaffName : state.staff_name
      }
      var incentive;
        if(parseFloat(document.getElementById("amount").value) > 4000){
          incentive = 100;
        }else{
          incentive = 0;
        }
      console.log(obj);
      navigate("/Staff",{
        state : {
        tblShiftPump : parseInt(document.getElementById("PumpIDS").value),
        tblshiftLitres : parseInt(document.getElementById("sold").value),
        tblTarget : 100,
        tblIncentive : incentive,
        tblAmount : parseFloat(document.getElementById("amount").value),
        tblDate : state.date,
        tblStaffID : state.staff_id,
        tblShift : state.shift,
        tblStaffName : state.staff_name
        }
      });
      const res = await axios.post("https://localhost:7086/api/PumpSales/CreatePumpRecordEntry",obj);
    }catch(err){
      console.log(err);
    }
  }

  const [pumpids,setPumpIds] = useState([]);
  const [pump,setPumps] = useState([]);
  const [product,setProducts] = useState([]);

  return (
   <> <div>
      <h1 class= "head" align = "center">Calculate Litres Sold</h1>
    </div>
    <form class="formclass" align = "center">
    <div>
        <label>Select Pump </label>
        <select className ="compute" name="PumpID" id="PumpIDS" onChange={DisplayPump}> 
        {pumpids.map((record) => (
            <option key={record} value={record} id="pumps">
                {record}
            </option>
        ))}
        </select>
        
    </div>
    <div class = "pumpdet">
     <label>Pump Details</label><br/>
     <label>Product Type </label>
     <input type="text" id="prod" name="Product Type" disabled={true}/><br/>
     <label>Last Reading </label>
     <input type="text" id="lastreading" name="Last Reading" disabled={true}/><br/>
     <label>Product Cost </label>
     <input type="text" id="prodcost" name="Product Cost" disabled={true}/><br />
    
    <label>Present Reading </label>
     <input type="text" id="presentreading" name="Present Reading"/><br/>
     <input type="checkbox" id="quantreturn" name="quantreturn" value="Quant Return" />
     <label for="quantreturn">Quantity Return To Tank</label><br />
     </div>
     <label>Quantity Returned </label>
     <input type="text" id="quant" name="Quant" /><br/>
     <label>Reason </label>
     <input type="text" id="reason" name="Reason" /><br/>
     <button class= "compute" type="button" onClick={ComputePetrol}>Compute</button><br/>
     
     <label>Litres Sold </label>
     <input type="text" id="sold" name="Sold" /><br/>
     <label>Amount </label>
     <input type="text" id="amount" name="Amount" /><br/>
     
     <br/>
     <button class= "compute" type="button" onClick={PetrolRecord}> OK </button><br/>
     <br/>
     <input type="checkbox" id="backdate" name="backdate" value="backdate" />
     <label for="backdate">Temporary Backdate </label><br />
     </form>
    </>
  )
}

export default CalculateLitSold;

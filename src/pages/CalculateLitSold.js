
import axios from 'axios';
import React, { useState,useEffect } from "react";
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CalculateLitSold() {

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    async function GetPumps() {
      try {
        const res = await axios.get("https://localhost:7144/api/pumpmanagement",{headers:{'Authorization':'Bearer'+" "+localStorage.getItem("Token")}});
        console.log(res.data);
        const IDS=[];
        const stff=[]
        await res.data.map((record) => {
          IDS.push(record.tblPumpID);
          stff.push(record)
      })
      setPumpIds(IDS);
      setPumps(stff);
      const products = await axios.get("https://localhost:7119/api/product",{headers:{'Authorization':'Bearer'+" "+localStorage.getItem("Token")}});
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
        toast("Present Reading shoud be greater than last reading");
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
      const res = await axios.post("https://localhost:7086/api/PumpSales/CreatePumpRecordEntry",obj,{headers:{'Authorization':'Bearer'+" "+localStorage.getItem("Token")}});
      toast("Pump record updated");
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
    }catch(err){
      console.log(err);
    }
  }

  const [pumpids,setPumpIds] = useState([]);
  const [pump,setPumps] = useState([]);
  const [product,setProducts] = useState([]);

  return (
   <> <div style={{backgroundColor:"aliceblue",width:"100%"}}><div>
      
      <h1 class= "head" align = "center"><u>Calculate Litres Sold</u></h1>
    </div>
    <form class="formclass" align = "center">
    <div>
        <label><b>Select Pump </b></label>
        <div >
          <center>
        <select className ="compute" name="PumpID" id="PumpIDS" style={{ width:"auto",
    "marginLeft": "10px"}}onChange={DisplayPump}> 
        {pumpids.map((record) => (
            <option key={record} value={record} id="pumps">
                {record}
            </option>
        ))}
        </select>
        </center>
        </div>
    </div>
    <div className = "pumpdet">
     <label><b>Pump Details</b></label><br/>
     <div style={{paddingTop:"10px"}}>
     <label>Product Type: </label>
     <input type="text" id="prod" name="Product Type" disabled={true}/>
     </div>
     <div style={{paddingTop:"5px"}}>
     <label>Last Reading: </label>
     <input type="text" id="lastreading" name="Last Reading" disabled={true}/>
     </div>
     <div style={{paddingTop:"5px"}}>
     <label>Product Cost: </label>
     <input type="text" id="prodcost" name="Product Cost" disabled={true}/>
     </div>
     <div style={{paddingTop:"5px"}}>
    <label>Present Reading: </label>
     <input style={{marginRight: "21px"}}type="text" id="presentreading" name="Present Reading"/>
     </div>
     {/* <div >
     <input type="checkbox" id="quantreturn" name="quantreturn" value="Quant Return" />
     <label for="quantreturn">Quantity Return To Tank</label></div> */}
     </div>
     <div style={{paddingTop:"5px"}}>
     <label>Quantity Returned: </label>
     <input style={{marginRight: "30px"}} type="text" id="quant" name="Quant" /></div>
     <div style={{paddingTop:"5px"}}>
     <label>Reason: </label>
     <input style={{marginRight: "-47px"}} type="text" id="reason" name="Reason" /></div>
     <div style={{paddingTop:"10px"}}>
     <button class= "buttonn" type="button" onClick={ComputePetrol}>Compute</button><br/>
     </div>
     <div style={{paddingTop:"5px"}}>
     <label>Litres Sold: </label>
     <input style={{marginRight:"-24px"}}type="text" id="sold" name="Sold" /></div>
     <div style={{paddingTop:"5px",marginRight:"-43px"}}>
     <label>Amount: </label>
     <input type="text" id="amount" name="Amount" /></div>
     
     
     <div style={{paddingTop:"5px"}}>
     <button class= "buttonn" type="button" onClick={PetrolRecord}> OK </button>
     </div>
     {/* <br/>
     <input type="checkbox" id="backdate" name="backdate" value="backdate" />
     <label for="backdate">Temporary Backdate </label><br /> */}
     </form>
     </div>
     <ToastContainer />
    </>
  )
}

export default CalculateLitSold;

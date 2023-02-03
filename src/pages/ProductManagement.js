//Pumps Management
import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import '../styles/prodMgmt.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function submitdata(event) {
  event.preventDefault();
  var cost1 = document.getElementById("AGO").value;
  var cost2 = document.getElementById("BULK").value;
  var cost3 = document.getElementById("DPK").value;
  var cost4 = document.getElementById("PMS").value;
  const obj = {
    cost1 : cost1,
    cost2 : cost2,
    cost3 : cost3,
    cost4 : cost4
  }
  try {
    
    const res = await axios({
      method: 'post',
      url: 'https://localhost:7119/api/product',
      data: obj,
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer'+" "+localStorage.getItem("Token")
      },
    })
    toast("Product data updated");
    document.getElementById("PumpForm").submit();
    console.log(res);
  }catch(err){
    console.log(err)
  }
  
}

function ProductManagement() {

  const [unlockClicked ,setUnlockClicked] = useState("true");

  useEffect(() => {
    async function axiosReq(){
      try {
        const res = await axios.get("https://localhost:7119/api/product",{headers:{'Authorization':'Bearer'+" "+localStorage.getItem("Token")}});
        document.getElementById("AGO").value = res.data[0].tblCost;
        document.getElementById("BULK").value = res.data[1].tblCost;
        document.getElementById("PMS").value = res.data[3].tblCost;
        document.getElementById("DPK").value = res.data[2].tblCost;
      }catch(err){
        console.log(err)
      }
    }
  
    axiosReq();
  })

  function enableEditing() {
    if(unlockClicked){
      setUnlockClicked(false);
    }else{
      setUnlockClicked(true);
    }
    
  }

  return (
    <div >
      <body style={{backgroundColor:"aliceblue",height:"75vh"}}>
      <h1 className= "heading" align = "center"><u>Product Management</u> </h1>
      <center>
        <form id="PumpForm">
        <label>Unit Cost per Litre of AGO </label>
       <input type="text" id="AGO" name="AGO" className = "textbox" style={{marginLeft:"20px",width:"60px"}} disabled={unlockClicked}/>&ensp;&ensp;
       <br/><label>Unit Cost per Litre of DPK </label>
       <input type="text" id="DPK" name="DPK" className = "textbox"  style={{marginLeft:"22px",width:"60px"}} disabled={unlockClicked}/>&ensp;&ensp;
       <br/><label>Unit Cost per Litre of PMS </label>
       <input type="text" id="PMS" name="PMS" className = "textbox" style={{marginLeft:"19px",width:"60px"}} disabled={unlockClicked}/>&ensp;&ensp;
       <br/><label>Unit Cost per Litre of BULK </label>
       <input type="text" id="BULK" name="BULK" className = "textbox" style={{marginLeft:"14px",width:"60px"}} disabled={unlockClicked}/>&ensp;&ensp;
  
       <br/><br/><button type = "button" className="buttonn" onClick={enableEditing}>Unlock </button>&ensp;&ensp;
       <button type = "button" className="buttonn" onClick={submitdata}>Save Changes </button>&ensp;&ensp;
       <button type = "button" className="buttonn" onClick={enableEditing}>Cancel </button>
        </form>
        </center>
        </body>
        <ToastContainer />
    </div>
    )

}

export default ProductManagement;
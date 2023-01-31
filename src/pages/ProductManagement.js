//Pumps Management
import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import '../styles/prodMgmt.css';

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
      },
    })
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
        const res = await axios.get("https://localhost:7119/api/product");
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
    <div>
	  <h1 className= "heading" align = "center">Product Management </h1>
      <form onSubmit={submitdata} id="PumpForm">
      <label>Unit Cost per Litre of AGO </label>
     <input type="text" id="AGO" name="AGO" className = "textbox"  disabled={unlockClicked}/>&ensp;&ensp;
     <br/><label>Unit Cost per Litre of DPK </label>
     <input type="text" id="DPK" name="DPK" className = "textbox" disabled={unlockClicked}/>&ensp;&ensp;
     <br/><label>Unit Cost per Litre of PMS </label>
     <input type="text" id="PMS" name="PMS" className = "textbox" disabled={unlockClicked}/>&ensp;&ensp;
     <br/><label>Unit Cost per Litre of BULK </label>
     <input type="text" id="BULK" name="BULK" className = "textbox" disabled={unlockClicked}/>&ensp;&ensp;

     <br/><button type = "button" className="button" onClick={enableEditing}>Unlock </button>&ensp;&ensp;
     <button type = "submit" className="button">Save Changes </button>&ensp;&ensp;
     <button type = "button" className="button" onClick={enableEditing}>Cancel </button>
      </form>
	</div>
  )
}

export default ProductManagement;
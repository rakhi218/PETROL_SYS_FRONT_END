import React from "react";
import '../styles/staffmgmt.css'
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState } from 'react'

//Post Request


const Sales = () => {
    const navigate = useNavigate();
    
    return (
        <>
           <br/> <h1 align="center" class="head">Staff Management</h1>
            <form class="formclass" >
                <div class = "maindiv">
            <div class="leftdiv">
                <div class="col-md-6">
                    <label >Staff Identification<br/></label>  </div>  </div>
                    <label for="inputRegistrationNo" style={{align: "left"}}class="form-label">Staff ID&ensp;&ensp;  </label>
                 <select>   <option selected>Choose...</option>
                    <option>...</option>
                 </select>
                              
          
            <div>
                <label><br/>Date and Time </label>
                <input type="date" id="date"  name="date" />
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
                   <br /> <button type = "submit" class="button" onClick={() => navigate("/CalculateLitSold")}>Calculate</button>
            </div>
            <div>
                <label>Present/Absent</label><br/>
                <input type="radio" value="present" name="attendance" /> Present  <br/>
                <input type="radio" value="absent" name="attendance" /> Absent  <br/>
                <input type="radio" value="abpermission" name="attendance" /> Absent with Permission<br/>
                <input type="radio" value="off" name="attendance" /> Off
                
            </div>
            <button type = "submit" class="button">Save Record </button>&ensp;&ensp;&ensp;&ensp;
            <button type = "submit" class="button">UnderBonnet <br/></button>
            </div> </form>
        </>
    )
}
export default Sales;

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../styles/Sales.css";
// import CalculateLitSold from "./CalculateLitSold";

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
        const IDS = [];
        const stff = [];
        await res.data.map((record) => {
          IDS.push(record.tblStaffID);
          stff.push(record);
        });
        setStaffid(IDS);
        setStaffs(stff);
      } catch (err) {
        console.log(err);
      }
    }
    GetStaffs();
  }, []);

  async function SaveRecord() {
    console.log(state);
    var ele = document.getElementsByName("attendance");
    var val;
    for (var i = 0; i < ele.length; i++) {
      if (ele[i].checked) val = ele[i].value;
    }
    try {
      const obj = {
        tblDate: state.tblDate,
        tblStaffID: state.tblStaffID,
        tblAttendance: val,
        tblShift: state.tblShift,
        tblShiftPump: state.tblShiftPump,
        tblshiftLitres: state.tblshiftLitres,
        tblTarget: state.tblTarget,
        tblIncentive: state.tblIncentive,
        tblAmount: state.tblAmount,
      };
      console.log(obj);
      const res = await axios.post(
        "https://localhost:7086/api/PumpSales/CreateSalesEntry",
        obj
      );
      document.getElementById("salesForm").submit();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function HelpNavigate() {
    const staffID = document.getElementById("StaffIds").value;
    const index = staffid.indexOf(staffID);
    console.log(index);
    const res = staffs[index];
    console.log(res);
    navigate("/CalculateLitSold", {
      state: {
        staff_id: staffID,
        staff_name: res.tblFirstName + " " + res.tblSurname,
        date: document.getElementById("date").value,
        shift: document.getElementById("shifts").value,
      },
    });
  }

  function EnableCalculate(allow){
    SetDisableCalculate(allow);
  }

  const [staffid, setStaffid] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [disableCalculate,SetDisableCalculate] = useState(true);

  return (
    <body>
      <div className="SalesForm">
        <br />{" "}
        <h1 align="center" class="head">
          <u>Staff Management</u>
        </h1>
        <form class="formclass" id="salesForm">
          <div class="maindiv">
            <div class="leftdiv">
              <div class="col-md-6">
                <label>
                  <b>
                    <u>Staff Identification</u>
                  </b>
                  <br />
                </label>
              </div>
            </div>
            <div className="StaffID">
              <label
                for="inputRegistrationNo"
                style={{ align: "left" }}
                class="form-label"
              >
                Staff ID:&ensp;&ensp;{" "}
              </label>
            </div>
            <div className="selectStaff">
              <select name="StaffIds" id="StaffIds">
                {staffid.map((record) => (
                  <option key={record} value={record} id="pumps">
                    {record}
                  </option>
                ))}
              </select>
            </div>
            <div className="Date">
              <label>
                <br />
                Date and Time:
              </label>
              <input
                style={{ marginLeft: "10px" }}
                type="datetime-local"
                id="date"
                name="date"
              />
            </div>
            <div className="Shifts">
              <label>Shifts: </label>
              <div className="ShiftsSelect">
                <select name="shifts" id="shifts">
                  <option value="morning">Morning</option>
                  <option value="night">Night</option>
                </select>
              </div>
            </div>
            
            <div className="Present_Absent">
              <label><b>Present/Absent</b></label>
              <br />
              <input
                type="radio"
                value="Present"
                name="attendance"
                onClick={e => EnableCalculate(false)}
              /> Present <br />
              <input
                type="radio"
                value="Absent"
                name="attendance"
                onClick={e => EnableCalculate(true)}
              /> Absent <br />
              <input
                type="radio"
                value="Off With Permisssion"
                name="attendance"
                onClick={e => EnableCalculate(true)}
              />{" "}
              Absent with Permission
              <br />
              <input type="radio" value="Off" name="attendance" onClick={e => EnableCalculate(true)}/> Off
            </div>
            <button style={{marginLeft:"20px"}}type="button" class="buttonn" onClick={HelpNavigate} disabled={disableCalculate}>
              Calculate{" "}
            </button>
            
            <div className="SalesInfo">
              <label>
                <b>
                  <u>Sales Information</u>
                </b>
                <br />
              </label>
              <div className="litres">
                <label for="Litres">Litres:&ensp;</label>
              
              <input style={{"marginLeft": "20px"}} type="number" id="Litres" name="Litres"></input>
              </div>
              <div className="Amount">
              <label for="Amount">
                Amount: &ensp;
              </label>
              <input type="number" id="Amount" name="Amount"></input>
              </div>
              <button style={{marginTop:"10px"}} type="calculate" class="buttonn" onClick={SaveRecord}>
                Save Record
              </button>
            </div>
          </div>{" "}
        </form>
      </div>
    </body>
  );
};
export default Sales;

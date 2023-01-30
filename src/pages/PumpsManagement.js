import React from 'react'

// import '../styles/PumpsManagement.css'

function PumpsManagement (){

  return (

    <>

    <div>

    <h1 className= "head" align = "center">Pumps Management </h1>

    <form className="formclassName">

            <div>

        <label>Product &ensp;&ensp;&ensp;&ensp;&ensp;&ensp; </label>

        <select className ="button">   <option selected>Choose...</option>

                    <option>...</option>

                 </select>

                       

    </div><br />

    <div>

    <label>Highest Value &ensp;&ensp;</label>

     <input type="text" id="highval" name="highval" className = "textbox" />&ensp;&ensp;

    </div>

    <div>

        <label>Pump List &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; </label>

    <input type="datetime-local" />

    </div><br />

    <div>

    <label>Pump &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</label>

    <input type="text" id="pump" name="Pump" className = "textbox" />&ensp;&ensp;

    </div><br/>

    <button type = "submit" className="button">SAVE </button>&ensp;&ensp;

    <button type = "submit" className="button">Edit Pump Details </button>&ensp;&ensp;

    <button type = "submit" className="button">Remove Pump </button>&ensp;&ensp;

    </form>

    </div>

    </>

  )

}



export default PumpsManagement;
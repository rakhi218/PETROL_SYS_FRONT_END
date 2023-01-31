import React from 'react'
import '../styles/CalculateLitSold.css'

function CalculateLitSold() {
  return (
   <> <div>
      <h1 class= "head" align = "center">Calculate Litres Sold</h1>
    </div>
    <form class="formclass" align = "center">
    <div>
        <label>Select Pump </label>
        <select class ="compute">   <option selected>Choose...</option>
                    <option>...</option>
                 </select>
        
    </div>
    <div class = "pumpdet">
     <label>Pump Details</label><br/>
     <label>Product Type </label>
     <input type="text" id="prod" name="Product Type" /><br/>
     <label>Last Reading </label>
     <input type="text" id="lastreading" name="Last Reading"/><br/>
     <label>Product Cost </label>
     <input type="text" id="prodcost" name="Product Cost"/><br />
    
    <label>Present Reading </label>
     <input type="text" id="presentreading" name="Present Reading"/><br/>
     <input type="checkbox" id="quantreturn" name="quantreturn" value="Quant Return" />
     <label for="quantreturn">Quantity Return To Tank</label><br />
     </div>
     <label>Quantity Returned </label>
     <input type="text" id="quant" name="Quant" /><br/>
     <label>Reason </label>
     <input type="text" id="reason" name="Reason" /><br/>
     <button class= "compute"  >Compute</button><br/>
     
     <label>Litres Sold </label>
     <input type="text" id="sold" name="Sold" /><br/>
     <label>Amount </label>
     <input type="text" id="amount" name="Amount" /><br/>
     
     <br/>
     <button class= "compute"  > OK </button><br/>
     <br/>
     <input type="checkbox" id="backdate" name="backdate" value="backdate" />
     <label for="backdate">Temporary Backdate </label><br />
     </form>
    </>
  )
}

export default CalculateLitSold;

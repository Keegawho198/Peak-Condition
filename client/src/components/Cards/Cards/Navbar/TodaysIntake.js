import React from 'react';
import './style.css'

export function TodaysIntake({children}){
    return(

  <div class="card-head" id="mainSection">
    <div className="row">
    <div className="col">
    <h2>{children}</h2>

  </div>

</div>
   
  <div className="row"> 
  <br></br>
  
    </div>
  </div>
    )
}


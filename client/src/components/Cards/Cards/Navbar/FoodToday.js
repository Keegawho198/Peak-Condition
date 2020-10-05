import React from 'react';
import './style.css'

export function FoodToday({children}){
    return(
<div class="cardDash" id="daysFood">
  <div class="card-body">
   
   {children}
  </div>
</div>
    )
}


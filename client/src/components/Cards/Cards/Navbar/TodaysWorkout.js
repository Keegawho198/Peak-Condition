import React from 'react';
import './style.css'

export function TodaysWorkout({children}){
    return(
<div class="cardDash" id="daysWorkout">
  <div class="card-body">
  {children}
  </div>
</div>
    )
}


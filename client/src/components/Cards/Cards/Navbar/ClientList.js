import React from 'react';
import './style.css';



function ClientList({children}){
    return(
    <div class="card" id="client">
  <div class="card-body" id="clientBody">
{children}
  </div>
</div>
    )
}

export default ClientList;
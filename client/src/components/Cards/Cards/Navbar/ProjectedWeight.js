import React from 'react';
import './style.css';
import Chart from './SubComponents/Chart'


function ProjectedWeight(props){
    return(

        <div className ="card" id="chartId">
          <Chart user={props.user}/>
     </div>

    )
}

export default ProjectedWeight;
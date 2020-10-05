import React, { useState, useEffect }  from "react";
import "./style.css";
import { Navbar } from '../components/Cards/Cards/Navbar/Navbar';
import API from '../utils/api'



function NutritionSearch(){
    const [nutrition, setNutrition] = useState({});
    const [search, setSearch] = useState("");


    
    useEffect(() => {
        SearchFood("apple")
       
      }, [])

    function SearchFood(query){
        API.getNutrition(query)
        .then(res => setNutrition(res.data)
          
          
          
        )
        
        .catch(err => console.log(err));
    }
    
    function handleInputChange(event) {
        const { value } = event.target;
        
      

        setSearch(value)
      
       
      };
    
    
      function handleFormSubmit(event) {
        event.preventDefault();
        SearchFood(search);
        console.log(nutrition);
        
       
      
        
   
      };



    return(  

        <div>
 <Navbar />
 <br></br>
 <br></br>
 <br></br>
    
<div className="jumbotron jumbotron-fluid" id="jumboSearch">
  <div className="container">
    <h1 className="display-4" style= {{textAlign:"center"}}>Search Your Food</h1>
    <br></br>
    <br></br>
    
    <form class="form-inline" id="searchBar">
  
  <div class="form-group mx-sm-3 mb-2">
   
    <input type="text" class="form-control" placeholder="E.g: Fried Rice" name="search" onChange={handleInputChange} ></input>
  </div>
  <button type="submit" class="btn btn-primary mb-2" onClick={SearchFood}  onClick={handleFormSubmit} >Search</button>
</form>
  </div>
</div>

<div className="container"style={{marginLeft: "19%"}}>

  <div class="row">
    
        {nutrition.hints  && nutrition.hints.map((foods)=>{
            return(
                <div class="col-lg-6">
                <div class="foodCard" style={{width: "30rem"}}>
                <img class="card-img-top"  src={foods.food.image} style={{height: "17rem"}} id="foodImage"></img>
                <div class="card-body"  style={{height: "10rem"}}>
                    <div>
            <h4 style={{textAlign:"center"}}>{foods.food.label}</h4>
           
                 <div class="d-inline"><h5>Calories:{foods.food.nutrients.ENERC_KCAL}</h5></div>
           
              
                </div>
              
              
              
              
                </div>
              </div>
              <br></br>
              <br></br>
              </div>
            )
        })}
  
    
  
  </div>



</div>

</div>

    )


}


export default NutritionSearch
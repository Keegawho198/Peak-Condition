import React,  { useState, useEffect } from 'react';
import API from "../../utils/api";
function ProgramSelected(props){
    const [userList,setUserList] = useState({
        id:"",
        tag:"",
        email: "",
        password: "",
        name: "",
        qualifications: "",
        bio: "",
        image: "",
        users: [],
        
       })
    useEffect(() => {
        loaduserList()
       
      }, [])
    
      function loaduserList() {
        API.getMaster("5e7d85ab5c04ae499851c955")
          .then(res => 
            setUserList({
               users:res.data.users
      
      
              })
            
          )
          
          .catch(err => console.log(err));
      };
     
return(
    <div class="form-group">
    <label for="exampleFormControlSelect1">Select a client</label>
    <select className="form-control" id="exampleFormControlSelect1" onChange={props.onChange} name="select">
    <option>Click to Choose</option>
        {userList.users.map((user)=>{
            return(
            <option key={user._id} value={user._id}>{user.name}</option>
            )
        })}
   
    </select>
  </div>
)
}
export default ProgramSelected;


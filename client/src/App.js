import React, {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import UserCreate from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import MasterCreate from './pages/MasterSignUp';
import MasterDashboard from './pages/MasterDashboard';
import UserLogin from "./pages/UserLogin";
import MasterLogin from "./pages/MasterLogin"
import NutritionSearch from './pages/NutritionSearch';
import Program from "./pages/Program"
import FoodCal from "./pages/FoodCal"
import ViewProgram from "./pages/ViewPrograms"
import AddExercise from "./pages/AddExercise"
import viewExercise from "./pages/ViewExercise"
import viewClient from "./pages/ViewClient"
import AuthContext from "./utils/auth.contect"
import Cookies from 'js-cookie'


function App() {
 
  useEffect(() => {
 checkCookie()
    
  }, [])

  const [state, setState] = useState({
    token: null,
    userId: null,
    master:false
  })

  

  function checkCookie(){
    const user = Cookies.get("token")
  const masters= Cookies.get("master")
   const id=Cookies.get("id");
    if(!masters){
  
    {setState({token: user,userId:id})}
    }
else 
  
  {setState({token: user,master:masters,userId:id})}

  }


  const login = (token, userId, tokenExpiration,master) => {

   
       
    {setState({ token: token,userId: userId, master:master})}

  }

   const logout = (token, userId, tokenExpiration) => {
    const removeCookie= Cookies.remove("token")
    Cookies.remove("master")
    Cookies.remove("id")
    setState({token: removeCookie, userId: null, })
  }



  

  return (
    <div className="App">

     <Router>
    <div>
    <AuthContext.Provider value={{
    
        token:state.token,
        userId: state.userId,
        master:state.master,
        login: login, 
        logout: logout,
        
      }}>
   
      <Switch>
        {state.token &&  !state.master && <Redirect from="/login" to="/" exact/>}
        {state.token && !state.master && <Route path="/" component={Dashboard} exact/>}
        {!state.token && <Route path="/login" component={UserLogin} exact />}
        {!state.token && <Redirect from="/" to="/login" exact/>}
        {state.token && state.master && <Redirect from="/" to="/master-dashboard" exact/>}
        {state.token && state.master && <Redirect from="/master-login" to="/master-dashboard" exact/>}
        {state.token && state.master && <Route path="/master-dashboard" component={MasterDashboard} exact/>}
        {!state.token && <Route path="/master-login" component={MasterLogin} exact />}
        {!state.token && <Redirect from="/master-dashboard" to="/master-login" exact />}
        <Route exact path="/signup" component={UserCreate} />
        <Route exact path="/master" component={MasterCreate} />
         <Route exact path="/nutrition-search" component={NutritionSearch} />
         <Route exact path="/program/:id" component={Program} />
         <Route exact path="/user/viewprogram/:id" component={ViewProgram} />
         <Route exact path="/foodCal" component={FoodCal} />
         <Route exact path="/addExercise" component={AddExercise} />
         <Route exact path="/viewExercise" component={viewExercise} />
         <Route exact path="/viewClient/:id" component={viewClient} />
         
          </Switch>
          </AuthContext.Provider>
        </div>
        
      </Router>


    </div>
  );
}

export default App;

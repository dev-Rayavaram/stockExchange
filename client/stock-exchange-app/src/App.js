import React ,{Component} from 'react';
import './App.css';
import Login,{Signup} from './components/Login';
import Profile from './components/Profile';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import firebase  from './config/fireauth';
import {} from 'react-bootstrap';

class  App extends Component{
  constructor(props){
    super();
    this.state={
      user:null
    }
  }
  componentDidMount(){
    this.authListener();
  }
  authListener(){
    firebase.auth().onAuthStateChanged((user)=>{
      //console.log(user);
      if(user){
        this.setState({user});
      }
      
    })
  }

  routeProtectionCheck() {
    console.log("this.state.user is "+this.state.user);
    if(this.state.user!==null && this.state.user!==undefined ) {

      return (

              <div className="App">
              <Router>
                <div id="navContainer">
                  <nav>
                    <ul>
                      <li>
                        <Link to="/"></Link>
                      </li>
                      <li>
                        <Link to="/Profile">Profile</Link>
                      </li>
                    </ul>
                  </nav>
                  <Switch>
                    <Route path="/Profile">
                      <Profile />
                    </Route>
                    </Switch>
                </div>
              </Router>
            </div>




      )
    } else {
      return (
                <div className="App">
                <Router>
                  <nav>
                  <Link to="/Login" ></Link>
                  <Link to="/Signup" ></Link>
                  <Link to="/" ></Link>
                  </nav>
                  <Route exact path="/Login" component={Login}>
                  </Route>
                    <Route exact path="/Signup" component={Signup}>
                  </Route>
                  <Route exact path="/" component={Login}>
                  </Route>
                </Router>
              </div>
          )
    }
  }
  render(){
    return (
      <div>
        { this.routeProtectionCheck() }
      </div>
    )
  }

}

export default App;

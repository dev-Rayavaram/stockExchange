import React ,{Component} from 'react';
import './App.css';
import Login,{Signup} from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Wizard from './components/Wizard';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import firebase  from './config/fireauth';
import 'semantic-ui-css/semantic.min.css'

class  App extends Component{
  constructor(props){
    super();
    this.state={
      user:{}
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
      else{
        this.setState({user:null});
      }
    })
  }

  routeProtectionCheck() {
    if(!this.state.user) {
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
    } else {
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
                  <li>
                    <Link to="/Home">Home</Link>
                  </li>
                  <li>
                    <Link to="/Wizard">Wizard</Link>
                  </li>
                </ul>
              </nav>

              <Switch>
                <Route path="/Home">
                  <Home />
                </Route>
                <Route path="/Profile">
                  <Profile />
                </Route>
                <Route path="/Wizard">
                  <Wizard />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
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
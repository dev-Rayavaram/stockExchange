import React ,{Component} from 'react';
import './styles/App.scss';
import Login,{Signup} from './components/Login';
import firebase  from './config/fireauth';
import { BrowserRouter as Router, Route,Switch,  Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Stocks from './components/Stocks'
import Home from './components/Home'
class  App extends Component{
  constructor(props){
    super();
    this.state={
      user:null
    }
    this.logout=this.logout.bind(this)
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
  logout=()=>{
    firebase.auth().signOut().then(() =>{
        console.log("Logout called ");
        this.setState({user:null})
        this.setState({state:this.state})
    }).catch(function(error) {
        // An error happened.
      });
      // window.location.reload(false);
      this.setState({state:this.state})
      ReactDOM.render(<Login/>, document.getElementById('root'));

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
            <button className = " ui button" style={{color:'teal'  ,size:'large'}} onClick={this.logout}>
                Logout
            </button>
              <div id="menu">
                <nav>
                  <ul>
                     <li>
                      <Link to="/Stocks">My Saved List</Link>
                    </li>
                    <li>
                      <Link to="/Home">Search</Link>
                    </li>
                    <li>
                      <Link exact to="/"></Link>
                    </li>
 
                    </ul>
                </nav>
  
                <Switch>
                  <Route path="/Home">
                    <Home />
                  </Route>
                  <Route path="/Stocks">
                    <Stocks />
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

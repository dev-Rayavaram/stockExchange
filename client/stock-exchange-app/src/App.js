import React ,{Component} from 'react';
import './styles/App.scss';
import Login,{Signup} from './components/Login';
import firebase  from './config/fireauth';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route,  Link} from 'react-router-dom';
import Navbar from './components/Navbar'
import ReactDOM from 'react-dom';
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

    }).catch(function(error) {
        // An error happened.
      });
      // window.location.reload(false);
      this.setState({state:this.state})
      ReactDOM.render(<Login/>, document.getElementById('root'));

    }
  routeProtectionCheck() {
    console.log("this.state.user is "+this.state.user);
    if(this.state.user!==null && this.state.user!==undefined ) {

      return (
                <div className="App">
                  <div className="header">
                      <button className = " ui button" style={{color:'teal'  ,size:'large'}} onClick={this.logout}>
                      Logout
                       </button>
                      <Navbar/>
                   </div>
                   <div className="main">
                   </div>
                  <div className="footer">
                      <Footer/>
                  </div>
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

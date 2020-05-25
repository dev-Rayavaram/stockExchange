import React ,{Component} from 'react';
import './styles/App.scss';
import Login,{Signup} from './components/Login';
import { BrowserRouter as Router, Route,  Link} from 'react-router-dom';
import firebase  from './config/fireauth';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home'
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
                  <div className="header">
                      <Header/>
                   </div>
                   <Home/>
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

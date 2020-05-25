import React ,{Component} from 'react';
import './styles/App.scss';
import Login,{Signup} from './components/Login';
import firebase  from './config/fireauth';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home'
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import StockDetails from './components/StocksDetails'
import Stocks from './components/Stocks'
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

    }
  routeProtectionCheck() {
    console.log("this.state.user is "+this.state.user);
    if(this.state.user!==null && this.state.user!==undefined ) {

      return (
                <div className="App">
                  <div className="header">
                      <Header/>
                      <button className = " ui button" style={{color:'teal'  ,size:'large'}} onClick={this.logout}>
                      Logout
                       </button>
                   </div>
                   <div className="main">
                        <Router>  
                            <nav> 
                            <ul className="menu">
                           
                            <li>
                                <Link  exact  to='/StocksDetails/symbol' >Stocks Details</Link>
                            </li>
                            <li>
                                <Link  exact  to='/Stocks' >Stocks</Link>
                            </li>

                            <li>
                                <Link  exact  to='/Home' >Symbols</Link>
                            </li>
                            <li>
                                <Link  exact  to='/' ></Link>
                            </li>
                         
                            </ul>
                            </nav>
                            <Switch>

                                <Route exact path="/StocksDetails/:symbol" component={StockDetails}>  
                                </Route> 
                                <Route exact path="/Home" component={Home}>  
                                </Route> 
                                <Route exact path="/Stocks" component={Stocks}>  
                                </Route> 
 
                                <Route exact path="/" component={Home}>  
                                </Route> 

                            </Switch>
                            </Router>            

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

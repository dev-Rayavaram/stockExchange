import React from 'react';
import Stocks from './Stocks'
import Home from './Home'
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

/*
    DECLARE stateless component Footer
    add p tag to add text
    export component
*/
function Navbar() {
return (
        <Router>  
        <nav className="menu"> 
        <ul>
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
            <Route exact path="/Home" component={Home}>  
            </Route> 
            <Route exact path="/Stocks" component={Stocks}>  
            </Route> 

            <Route exact path="/" component={Home}>  
            </Route> 

        </Switch>
        </Router>  
    )
}
export default Navbar;
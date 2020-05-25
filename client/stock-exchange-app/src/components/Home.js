import React,{Component} from 'react';
import { Button } from 'react-bootstrap';
import Profile from '../components/Profile';
import { Container,Table } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import axios from 'axios'
import Stocks from './Stocks'
const apiKey=process.env.REACT_APP_API_KEY
const appId=process.env.REACT_APP_ID
class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            isLoaded:false,
            stocks:[],
            phrase:''
        }
        this.handleSearch = this.handleSearch.bind(this);

    }
    handlePhraseChange=(e)=>{
        this.setState({phrase:e.target.value})
    }
    async handleSearch(e){
        e.preventDefault();  
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.phrase}&apikey=${apiKey}`;
        axios.headers={
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json', 
        }
        try{
          const res = await axios.get(url);
          const results = res.data;
          console.log("results are");
          console.log(results);
          this.setState({stocks:results.bestMatches})
           this.setState({isLoaded:true})    
         }
        catch (e){
          console.log(e);
        }
     }
    render=()=>{
                    console.log(" stocks state is");
                    console.log(this.state.stocks)
                        return (
                    <div className="main">
                                              <Container>
                        <Router>  
                            <nav> 
                            <ul className="menu">
                            <li>
                                <Link to="/Profile" >Profile</Link>
                            </li>
                            <li>
                                <Link to='/Home' >Home</Link>
                            </li>
                            <li>
                                <Link to='/' >Stocks</Link>
                            </li>
                          
                            </ul>
                            </nav>
                            <Switch>
                                <Route exact path="/Profile" component={Profile}>  
                                 </Route> 
                                <Route exact path="/Home" component={Home}>  
                                </Route> 
                                <Route exact path="/" component={Stocks}>  
                                </Route> 
                            </Switch>
                            </Router>            
                            </Container>

                        <Container className="search">
                            <input type='text' className='input' name='phrase' placeholder='phrase'  onChange={this.handlePhraseChange}></input>
                            <Button variant="primary" size="lg" type="submit" onClick={this.handleSearch}> Search</Button>
                        </Container>
                        <Container>
                            { //Check if message failed

                                (this.state.isLoaded===true)?
                                <div className="main">
                                        <div className="sub-main-2">
                                        <h3>My Employees List</h3>
                                                    <Table className="mt-4">
                                                        <thead>
                                                        <tr>
                                                        <th width="20%">Symbom</th>
                                                        <th width="20%">Company Name</th>
                                                        <th>type</th>
                                                        <th>Day high</th>
                                                        <th>Day Low</th>
                                                        <th width="10%">Actions</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                            {Object.values(this.state.stocks).map((item,index)=>{return(
                                                        <tr>
                                                        <td>
                                                            {item["1. symbol"]}
                                                        </td>
                                                        <td>
                                                            {item["2. name"]}
                                                        </td>
                                                         <td>
                                                            {item["3. type"]}
                                                        </td>
                                                         <td>
                                                            {item["5. marketOpen"]}
                                                        </td>
                                                         <td>
                                                            {item["6. marketClose"]}
                                                        </td>
                                                       <td>
                                                       <Button color="success" >Add</Button>

                                                       </td>
                                                       <td>
                                                       <Button color="info" >More Details</Button>

                                                       </td>
                                                        </tr>
                                          )})} 
                                                </tbody>
                                            </Table>
                                        </div>
                                </div>

                        :
                        (
                            <div className="main">
                            <div className="sub-main-2">
                                <h3 className="title">Stock</h3>
                            </div>
                            </div>
                         )
                        }
                        </Container>
                    </div>
                );
 }
 };

 
export default Home;

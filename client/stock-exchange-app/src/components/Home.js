import React,{Component} from 'react';
import { Button } from 'react-bootstrap';
import ReactDOM from 'react-dom'

import Profile from './Profile';
import { Container,Table } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import axios from 'axios'
import Stocks from './Stocks'
import StockDetails from './StocksDetails'

const summary = document.getElementById('summary')

const apiKey=process.env.REACT_APP_API_KEY
class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            isLoaded:false,
            stocks:[],
            phrase:'',
            stockDetails:[],
            displayGraph:false
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.getMoreInfo = this.getMoreInfo.bind(this);
        this.addEntries = this.addEntries.bind(this);
    }
    handlePhraseChange=(e)=>{
        this.setState({phrase:e.target.value})
    }
    async addEntries(e){
        e.preventDefault();
        let index = e.target.name;
        let symbol= e.target.value;
            // 1. symbol: "AA"
            // 2. name: "Alcoa Corporation"
            // 3. type: "Equity"
            // 4. region: "United States"
            // 5. marketOpen: "09:30"
            // 6. marketClose: "16:00"
            // 7. timezone: "UTC-05"
            // 8. currency: "USD"
            // 9. matchScore: "1.0000"
        let stockDetail = this.state.stocks[index];
        console.log("stockDetail",stockDetail);
         const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
        axios.headers={
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json', 
        }
        try{
                const res = await axios.get(url);
                const results = res.data;

                console.log("results inside add entries are");
                console.log(results)
                console.log(results["Global Quote"]["05. price"])
                // Global Quote:
                // 01. symbol: "AA"
                // 02. open: "8.3000"
                // 03. high: "8.3683"
                // 04. low: "8.0200"
                // 05. price: "8.2100"
                // 06. volume: "4413516"
                // 07. latest trading day: "2020-05-22"
                // 08. previous close: "8.2800"
                // 09. change: "-0.0700"
                // 10. change percent: "-0.8454%"
                let stock={
                    "customer_id":"1",
                    "name":stockDetail["2. name"],
                    "symbol":stockDetail["1. symbol"],
                    "price":results["Global Quote"]["05. price"]
                }       
                let listItem=
                {"symbol":stockDetail["1. symbol"],
                    "listType":"day"
                }
                
                let quote={
                    "symbol":stockDetail["1. symbol"],
                    "exchange":stockDetail["3. type"],
                    "price":results["Global Quote"]["05. price"],
                    "volume":results["Global Quote"]["06. volume"],
                    "marketCap":20000,
                    "low":results["Global Quote"]["04. low"],
                    "high":results["Global Quote"]["03. high"]           
                }
                console.log("stock object")
                console.log(stock);
                console.log("list object")
                console.log(listItem); 
                 console.log("quote object")
                console.log(quote);             
                 axios.headers={                  
                    'Content-Type': 'application/json'
                    }
                    await fetch(`/stock_watch_api/v1/symbol/stocks`, {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(stock),
                      })
                      await fetch(`/stock_watch_api/v1/quote/quote`, {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(quote),
                      })
                      await fetch(`/stock_watch_api/v1/stocks`, {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(listItem),
                      })


          }
         
        catch (e){
          console.log(e);
        }
       

    }
    async getMoreInfo(e){
        alert("more info clicked")
        e.preventDefault();
        let symbol= e.target.value;
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}outputsize=compact&&apikey=${apiKey}`;
        axios.headers={
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json', 
        }
        try{
          const res = await axios.get(url);
          const results = res.data;
          console.log("results are");
          ReactDOM.render(<StockDetails data={results} />, summary);
         }
         
        catch (e){
          console.log(e);
        }

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
          this.setState({stocks:results.bestMatches})
           this.setState({isLoaded:true})    
         }
        catch (e){
          console.log(e);
        }
     }
    render=()=>{
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
                                <Link to='/StockDetails/symbol' >StockDetails</Link>
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
                                <Route exact path="/StockDetails/:symbol" component={StockDetails}>  
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

                                (this.state.isLoaded===true && this.state.stocks!==null && this.state.stocks!==undefined)?
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
                                                       <Button color="success" type="button" name={index} value={item["1. symbol"]} onClick={this.addEntries}>Add</Button>

                                                       </td>
                                                       <td>
                                                       <Button color="info" value={item["1. symbol"]} type="button" onClick={this.getMoreInfo}>Market Trend</Button>

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

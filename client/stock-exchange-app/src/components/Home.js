import React,{Component} from 'react';
import { Button } from 'react-bootstrap';
import ReactDOM from 'react-dom'

import { Container,Table } from 'semantic-ui-react';
import NewsTrends from './NewsTrends'

import axios from 'axios'
let serverUrl="http://stockserver-env.eba-9aau8b3v.us-east-1.elasticbeanstalk.com"

//let serverUrl="https://stockexchangedev.herokuapp.com"
axios.defaults.baseURL = serverUrl;

const summary = document.getElementById('summary')
const apiKey=process.env.REACT_APP_API_KEY
const apiKey2 = process.env.REACT_APP_API2_KEY
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

                let stock={
                    "customer_id":"1",
                    "name":stockDetail["2. name"],
                    "symbol":stockDetail["1. symbol"],
                    "price":results["Global Quote"]["05. price"]
                }       
                let listItem={
                    "symbol":stockDetail["1. symbol"],
                    "company":stockDetail["2. name"],
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
            let stocksResults= axios.post(`${serverUrl}/stock_watch_api/v1/symbol/stocks`,
                        stock
                      )
             let quoteResults= axios.post(`${serverUrl}/stock_watch_api/v1/quote/quote`, 
                       quote,
                      )
            let watchListResults=  axios.post(`${serverUrl}/stock_watch_api/v1/stocks`,listItem)
                console.log("stocksResults",stocksResults)
                console.log("quoteResults",quoteResults)
                console.log("watchListResults",watchListResults)
        

                }
              
         
        catch (e){
          console.log(e);
        }
 
    }
    async getMoreInfo(e){
        alert("more info clicked")
        e.preventDefault();
        const url = `https://newsapi.org/v2/everything?q=Stock market&apikey=${apiKey2}`;
        axios.headers={
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json', 
        }
        try{
          const res = await axios.get(url);
          const results = res.data;
          const content = results.articles
          console.log("results are",content);
          if(content!==null && content !== undefined)
          {
            ReactDOM.render(<NewsTrends data={content} />, summary);
          }
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
                         <Container className="search">
                            <input type='text' className='input' name='phrase' placeholder='phrase'  onChange={this.handlePhraseChange}></input>
                            <Button variant="primary" size="lg" type="submit" onClick={this.handleSearch}> Search</Button>
                        </Container>
                        <Container>
                            { //Check if message failed

                                (this.state.isLoaded===true && this.state.stocks!==null && this.state.stocks!==undefined)?
                                        <div className="sub-main-2">
                                        <h3>Stocks List</h3>
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
                                                        <tr key={index}>
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
                                                       <Button className="btn btn-primary" type="button" name={index} value={item["1. symbol"]} onClick={this.addEntries}>Add</Button>

                                                       </td>
                                                       <td>
                                                       <Button className="btn btn-info" value={item["1. symbol"]} type="button" onClick={this.getMoreInfo}>Market Trend</Button>

                                                       </td>
                                                        </tr>
                                          )})} 
                                                </tbody>
                                            </Table>
                                        </div>

                        :
                        (
                            <div className="main">
                            <div className="sub-main-2">
                                
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

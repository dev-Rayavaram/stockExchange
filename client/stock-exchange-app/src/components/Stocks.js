import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { Container,Table } from 'semantic-ui-react';
import ReactDOM from 'react-dom'
import StockDetails from './StocksDetails';
import axios from 'axios'


let serverUrl="http://stockserver-env.eba-9aau8b3v.us-east-1.elasticbeanstalk.com"
//let serverUrl="https://stockexchangedev.herokuapp.com"
axios.defaults.baseURL = serverUrl;
class Stocks extends Component {

      constructor(props){
          super(props)
          this.state={
              stocks:[],
              isLoaded:false
          }
          this.remove = this.remove.bind(this);
          this.updateList = this.updateList.bind(this);
          this.handleNameChange = this.handleNameChange.bind(this);
          this.handleTypeChange = this.handleTypeChange.bind(this);

      }
      async componentDidMount() {
          axios.headers={
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
          const response = await axios.get(`${serverUrl}/stock_watch_api/v1/`);
          console.log("result in stocks get ",response);

          const body =response.data;
          console.log(body)
          this.setState({ stocks: body, isLoaded: true });
          console.log("this.state.stocks")
      
          console.log(this.state.stocks)
        }
        handleNameChange(event) {
          const value = event.target.value;
          alert("name change"+this.state.stocks["id"])
          this.setState({stocks:{id:this.state.stocks["id"],symbol:this.state.stocks["symbol"],company:value,listType:this.state.stocks["listType"]} });
          event.preventDefault();
        }
        handleTypeChange(event) {
          alert("type change")

          const value = event.target.value;
          this.setState({stocks:{id:this.state.stocks["id"],symbol:this.state.stocks["symbol"],company:this.state.stocks["company"],listType:value} });
          event.preventDefault();
        }
   
          async updateList(e) {
            let id =parseInt(e.target.value);
            alert("updateList calles"+e.target.value)
            console.log("Update list item");

            const index = this.state.stocks.findIndex(stock => stock.id === id);

            let stockDetail = this.state.stocks[index]
          console.log("Update list item");
          console.log(stockDetail);

          ReactDOM.render(<StockDetails data = {stockDetail}/>, document.getElementById('root'));
          
          }          

          async remove(e) {
            let id =e.target.value;
            alert("delete calles"+e.target.value)
            axios.headers={
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
            const result = await axios.delete(`${serverUrl}/stock_watch_api/v1/stocks/${id}`).then(() => {
             console.log("result in stocks remove ",result);
              let updatedList = [...this.state.stocks].filter(i => i.id !== id);
              this.setState({stocks: updatedList});
            });
            window.location.reload();
            e.preventDefault();
          }          

      render(){
          console.log("Stocks inside render Stocks");
          console.log(this.state.stocks)
          if(this.state.isLoaded && this.state.stocks!==null && this.state.stocks!==undefined){
                return (
                    <div className="main">
                        <a href="/" color='teal'>Home</a>
                         <Container>
                            { //Check if message failed

                                (this.state.isLoaded===true && this.state.stocks!==null && this.state.stocks!==undefined)?
                                        <div className="sub-main-2">
                                        <h3> My Stocks List</h3>
                                                    <Table className="mt-4">
                                                        <thead>
                                                        <tr>
                                                        <th width="10%">ID</th>
                                                        <th width="20%">Company Name</th>
                                                        <th width="20%">Type</th>
                                                        <th width="20%">Symbol</th>
                                                        <th width="10%">Actions</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {Object.values(this.state.stocks).map((item,index)=>{return(
                                                        <tr key={index}>
                                                        <td>
                                                           
                                                            <input type="text" disabled  value={item.id} name ="id"></input>

                                                        </td>
                                                        <td>
                                                        <input type="text"  value= {item.company} name ="company" ></input>
                                                       </td>
                                                         <td>
                                                           <input type="text"  value={item.listType} name ="listType"></input>
                                
                                                        </td>
                                                         <td>
                                                            {item.symbol}
                                                        </td>
   
                                                       <td>
                                                       <Button color="success" type="button" value={item.id}  onClick={this.updateList}>Update</Button>

                                                       </td>
                                                       <td>
                                                        <Button className="btn btn-danger" type="button" value= {item.id} onClick={this.remove}>Delete</Button>

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
                                <h3 className="title">Stock</h3>
                            </div>
                            </div>
                         )
                        }
                        </Container>
                    </div>
                );
    
          }
          else{
              return(
                  <div>
                      Loading...
                  </div>
              )
          }
      }
    }
  

    
 export default Stocks;
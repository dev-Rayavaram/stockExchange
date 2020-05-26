import React, { Component } from 'react';
import { Form, Grid, Header, Segment } from 'semantic-ui-react'
import ReactDOM from 'react-dom'
import Stocks from './Stocks'
class StockDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
        company:'',
        listType:'',
        id:'',
        symbol:'',
      isLoaded:false 
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(event) {
    event.preventDefault();
    const id = this.state.id;
    let listItem={
        "company":this.state.company,
        "listType":this.state.listType,
        "symbol":this.state.symbol
    }
    

      await fetch(`/stock_watch_api/v1/stock/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(listItem),
      })
     
      ReactDOM.render(<Stocks/>, document.getElementById('root'));
    }
  async componentDidMount(props) {
    console.log("EDIT EMPLOYEE CALLED")
    let input =this.props.data;
    this.setState({company:input.company})
    this.setState({id:input.id})
    this.setState({symbol:input.symbol})
    this.setState({listType:input.listType})

    this.setState({isLoaded:true})
  }
  handleNameChange=(event) =>{
        const value = event.target.value;
        this.setState({company:value,id:this.state.id,listType:this.state.listType,symbol:this.state.symbol});
        event.preventDefault();
    }
    handleTypeChange=(event)=>{

        const value = event.target.value;
        this.setState({company:this.state.company,id:this.state.id,listType:value,symbol:this.state.symbol});
        event.preventDefault();
    }
  render() {
    console.log("EDIT EMPLOYEE RENDER CALLED")
    console.log(this.state)
    if(this.state.isLoaded ===true ){
        return(
            <React.Fragment>

                <div className="main">

                <Grid textAlign='center' style={{ height: '100%' ,width:'100%'}} verticalAlign='middle'>

                <Grid  style={{background:'teal',width:'60%' ,height:'50%',maxWidth: 450}}>
                    <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color="violet" textAlign='center'>
                        Update Your list
                    </Header>
                    <Form size='large' >

                        <Segment  stacked>
                            <Form.Input name="company" value={this.state.company} type='text' onChange={this.handleNameChange}/>
                            <Form.Input name="listType" value={this.state.listType} type='text' onChange={this.handleTypeChange} />
                            <Form.Input  name="symbol" disabled value={this.state.symbol} type='text'/>
                            <button className="Button"  type='button' onClick={this.handleSubmit}>Update</button>
           
                        </Segment>
                            </Form>        
                           
                    </Grid.Column>
                </Grid>
                </Grid>
                </div>
            </React.Fragment>
        )


      
     }
    else
    return(
        <div>
            Loading...
        </div>
    )
}
   
}


export default StockDetails;
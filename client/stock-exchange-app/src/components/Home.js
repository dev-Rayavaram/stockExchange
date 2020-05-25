import React,{Component,useState,useEffect} from 'react';
import { Button } from 'react-bootstrap';
import Profile from '../components/Profile';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import axios from 'axios'

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
           this.setState({isLoaded:true})    
         }
        catch (e){
          console.log(e);
        }
     }
    render=()=>{
             //   console.log("inside schoollist render",this.state.schoolsList)
                return (
                    <div className="main">
                        <Container className="search">
                            <input type='text' className='input' name='phrase' placeholder='phrase'  onChange={this.handlePhraseChange}></input>
                            <Button variant="primary" size="lg" type="submit" onClick={this.handleSearch}> Search</Button>
                        </Container>
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
                                <Link to='/' >Home</Link>
                            </li>
                          
                            </ul>
                            </nav>
                            <Switch>
                                <Route exact path="/Profile" component={Profile}>  
                                 </Route> 
                                <Route exact path="/Home" component={Home}>  
                                </Route> 
                                <Route exact path="/" component={Profile}>  
                                </Route> 
                        </Switch>
                        </Router>            
                        </Container>
                    </div>
                );
        }
 };

 
export default Home;

/*  The following function uses react HOOKs for maintaining state in stateless components that are 
    functional components using useState,useEffect. useState is similar to setState in class component
    and useEffect waits for useState to finish job before returning data, so calling
    setSavedList inside useEffect will get the updated data from useState
    https://www.youtube.com/watch?v=-MlNBTSg_Ww
    https://medium.com/javascript-in-plain-english/how-to-add-to-an-array-in-react-state-3d08ddb2e1dc
*/
/*
    create stateless component SchoolData    
*/
const SchoolData=(props)=>{
    const[state,addItem]=useState([]);
/*
    create a method with item one parameter
    add state to current state using HOOK useState
*/
    const setStateHandler=(item)=>{
      //  console.log("inside setStateHandler: ",item)
        addItem(state => [...state, item])
       // console.log("inside setStateHandler state inside function",state)
     }
/*
create an event handler for button
get event target value
call method to handle state
to get updated state each time use REACT HOOK useEffect
*/
    const handleAdd=(e)=>{
        e.preventDefault();
        const schoolName=e.target.value;
        setStateHandler(schoolName); 
    }
    useEffect(() => {
       // console.log("inside setStateHandler state useEffect",state);
        props.setSavedList(state)

      });

  //  console.log("props inside functional ",props)
  /*
      get data from props
      IF ranks list has elemnts
        get data for latest year and rank
      return rendered elements with  props data
  */
    let ranks = props.value.rankHistory
    let latestYear='';
    let latestRank='';
        if(ranks!==null && ranks.length>0){
            latestRank=ranks[0]
            latestYear=ranks[0].year;
            latestRank=ranks[0].rank
        }
      // console.log(" latestRank is :",latestRank) 
    return(
        <React.Fragment>
            <div className="container">
                <h3>School:{props.value.schoolName}</h3>
                <h3>Phone:{props.value.phone}</h3>
                <h5 id="rank">Year:{latestYear} Rank: {latestRank} </h5>  
                <a href={props.value.url}>Link  <i className=" fa fas fa-link"></i></a>
                <Button type="button" value ={props.value.schoolName}  onClick={handleAdd.bind(null)}>My Schools List</Button>

            </div>
         </React.Fragment>

    )
}
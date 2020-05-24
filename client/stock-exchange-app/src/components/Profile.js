import React ,{Component} from 'react'
import firebase from '../config/fireauth'
import {Container, Form, Grid, Header, Segment,Icon ,Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Login,{Signup} from './Login'
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
const url =" http://localhost:3000";
class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            user:{
                displayName:'',
                email:'',
            },
            isLoaded:false,
            isLoggedIn:false
        }
        this.updateProfile = this.updateProfile.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.logout = this.logout.bind(this)
        this.deleteUser = this.deleteUser.bind(this)

    }     
 
    async componentDidMount(){
        const user =  firebase.auth().currentUser;
        if (user != null) {
            this.setState({user:{displayName:user.displayName,email:user.email,uid:user.uid} })
            this.setState({isLoaded:true})
            this.setState({isLoggedIn:true})         
         
        }
        else{
            this.props.history.push('/Login')
        }
    }

    handleNameChange=(event)=>{
      //  console.log(this.state)
        this.setState({user:{displayName:event.target.value,email:this.state.user.email} });
        event.preventDefault();

    }
    
    logout=()=>{
        firebase.auth().signOut().then(() =>{
            console.log("Logout called ");
            this.setState({isLoggedIn:false})
            this.setState({state:this.state})
        }).catch(function(error) {
            // An error happened.
          });
          // window.location.reload(false);
          window.location.assign(url);
    }

     async deleteUser(){
          console.log("delete user called");
          try{
                const result = await firebase.auth().currentUser.delete();
                console.log("delete called");
                console.log("result is "+result)
                this.setState({isLoggedIn:false})
                this.setState({state:this.state})


          }
          catch (e) {
            console.log(e)
          }
        
          window.location.assign(url);

    }
     updateProfile=(e)=>{
        e.preventDefault();
        var user = firebase.auth().currentUser;
       // console.log("inside updateProfile")
        user.updateProfile({
        displayName: this.state.user.displayName,
        }).then(function() {
            alert("profile updated")
          }).catch(function(error) {
            console.log(error)
          });
    }

    render(){
        if(this.state.isLoggedIn===true){
            if(this.state.isLoaded===true && this.state.user!==null && this.state.user!== undefined){
                return (
                    <React.Fragment>
                        <Container style={{ height: '100%' ,weight:'100%'}}>
                            <Menu  sidebar="true" vertical   position="right">
                                        <Icon className="user" size='large'>
                                            {this.state.user.displayName?this.state.user.displayName:''}   
                                        </Icon>  
                                        <Menu fluid vertical tabular>
                                            <Menu.Item
                                            name='DeleteUser'
                                            onClick={this.deleteUser}
                                            />
                                            <Menu.Item
                                            name='logout'
                                            onClick={this.logout}
                                            />
                                          </Menu>
                            </Menu>
                             <Grid textAlign='center' style={{ height: '60%' }} verticalAlign='middle'>
                                <Grid.Column style={{ maxWidth: 450 }}>

                                <Header as='h2' color='teal' textAlign='center'>
                                    User Profile
                                </Header>
                                <Form size='large'>
                                <Header hidden>UID :{(this.state.user.uid)?this.state.user.uid:'0'}</Header>
                                    <Segment stacked>
                                    <Form.Input icon='mail' disable="true" iconPosition='left' placeholder='E-mail address' type="email" value={this.state.user.email} name="email"  
                                    />
                                     <Form.Input  icon='user' iconPosition='left' placeholder='Name' type="text" value={this.state.user.displayName?this.state.user.displayName:''}   name="displayName"
                                        id="Name" onChange = {this.handleNameChange} />
                                        <button className = " ui button" style={{color:'teal'  ,size:'large'}} onClick={this.updateProfile}>
                                        Update Name
                                    </button>
                                    </Segment>
                                </Form>  
                                      
                                </Grid.Column>
                            </Grid>                        
                        </Container>  
                    </React.Fragment>
                )
            }
            else{
                return (
                    <Container>
                        <Login/>
                     </Container>
                )            
            }
    
        }
        else{
                console.log("Inside is logged in false")
                return(
                        <>
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

                        </>
                )            
        }
     }
 
}

export default Profile;
import React ,{Component } from 'react';
import firebase from '../config/fireauth'
import { Form, Grid, Header, Segment ,Message} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {Link} from 'react-router-dom';
/*
    create class component Login
        initialize user state
        bind handleSubmit,and handleChange methods to class
        procedure handleChange
            get user input 
            set user state
        procedure handleSubmit
            get user state
            call firebase.auth by passing user information
            IF login is successful set uid and other user info
            ELSE alert user to enter correct info or signup
        procedure handleSignup
            create user in firebase with email/password
            get uid and set user state
*/

class  Login extends Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
         }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }
     handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit(e){
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(
            (u)=>{
                console.log("result",u)
                if(!("code" in u)== null){
                    console.log("inside if")
                    this.props.history.push('/Home')

                }
            }
        ).catch(e=>{
            console.log(e)
            console.log("error",e)
            alert("User Not found !!! Please enter valid data or Signup");
           
        })

    }
    render(){
      return (
        <div className="App">

            <Grid textAlign='center' style={{ height: '100%' ,width:'100%'}} verticalAlign='middle'>

              <Grid  style={{background:'teal',width:'60%' ,height:'50%',maxWidth: 450}}>
                <Grid.Column style={{ maxWidth: 450 }}>
                  <Header as='h2' color='teal' textAlign='center'>
                    Log-in to your account
                  </Header>
                  <Form size='large' >

                    <Segment  stacked>
                      <Form.Input  icon='mail' iconPosition='left' placeholder = "E-mail Address" autoComplete="username" value={this.state.email} onChange={this.handleChange} type="email" name="email" />
                        <Form.Input
                          icon='lock'
                          iconPosition='left'
                          autoComplete="current-password"
                          placeholder="password"
                          type='password'
                          value={this.state.password} onChange={this.handleChange} name="password"/>
                          <button className="ui button" style={{color:'teal' , size:'large' }} onClick={this.handleSubmit}>
                              Login
                          </button>               
                          </Segment>
                        </Form>        
                        <Message>
                          Not a User ?  <Link to="/Signup" >Signup </Link>
                         </Message>
                   </Grid.Column>
               </Grid>
          </Grid>
        </div>
     );
    }
   
  }
  class  Signup extends Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
        }
        this.handleSignup = this.handleSignup.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }
    handleSignup(e){
         e.preventDefault();
         firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(
             (u)=>{
                    console.log(u)
                    console.log("u.uid",u.user.uid)
                    this.props.history.push('/Home')
      
              }
         ).catch(e=>{
             console.log(e)
         })
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
   
    render(){
      return (
        <div className="App">
        <Grid textAlign='center' style={{ height: '100%' ,width:'100%'}}  verticalAlign='middle'>
          <Grid  style={{background:'teal',width:'60%' ,height:'50%',maxWidth: 450}}>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                Signup for new account
              </Header>
              <Form size='large' >
                <Segment stacked >
                <Form.Input  icon='mail' iconPosition='left' autoComplete="username" placeholder='E-mail address'value={this.state.email} onChange={this.handleChange} type="email" name="email"
                />
                <Form.Input
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                autoComplete="current-password"
                type='password'
                value={this.state.password} onChange={this.handleChange} name="password"/>
                <button className="ui button" style={{color:'teal' , size:'large' }} onClick={this.handleSignup}>
                  Signup
                </button>
                </Segment>
                </Form>
                <Message>
                  Already Signed-Up?<Link to="/" color='teal'> Login</Link>
                </Message>
              </Grid.Column>
          </Grid>
        </Grid>
        </div>
      );
    }
   
  }
  export {Signup};
  export default Login;

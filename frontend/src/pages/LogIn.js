
import Header from '../components/Header'
import React from 'react'
import usersActions from '../redux/actions/usersActions'
import {connect} from 'react-redux'
import GoogleLogin from 'react-google-login';
import Swal from 'sweetalert2'
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';
import '../styles/account.css'


class SignIn extends React.Component{
    state={
        logUser:{
            username:"",
            password:"",    
        },
        error:""
    }
    getForm = e =>{
        e.preventDefault()
       
        this.setState({
            logUser:{
                ...this.state.logUser,
                [e.target.name]: e.target.value
            }
        })
    }


    submit =  async e => {
 
        e.preventDefault()
        if (this.state.logUser.name ==="" || this.state.logUser.password === "" ){
            this.setState({
                error: "Both fields are required"
            }) 
        }else{
            const logUser= {user:this.state.logUser.username , password: this.state.logUser.password}
            const response =  await this.props.logUser(logUser)
            
            if (response.success === true){
                
            }else{
                this.setState({
                    error: response
                })    
            }
        }
    }

    responseGoogle = async (response) =>{
        this.setState({
            ...this.state,
            logUser:{
                username:response.profileObj.email,
                password:response.profileObj.googleId+response.profileObj.familyName.replace(/ /g, "")+response.profileObj.familyName.trim().charAt(0).toUpperCase() + response.profileObj.familyName.trim().charAt(0).toLowerCase()
            }
        })
        const res = await this.props.getUser(this.state.logUser)
        
        if(res === true){
            const resp =  await this.props.logUser(this.state.logUser)
            
            
        }else{
            Swal.fire({  title: 'You must sign up!',  text: `Please go to create an account, ${response.profileObj.givenName}.`,  icon: 'warning',  showConfirmButton: false, timer: 2000,allowOutsideClick: false})
        }
        this.setState({
            ...this.state,
            logUser:{
                username:"",
                password:""
            }
        })    
    }

    
    render(){

        return (
            <>
            <Header />
            <h3 className="titleHouses">ENTRA A TU CUENTA</h3>
            
            <div className="signContainer">
                
                <div className="inputs">
                    <span className = {this.state.error === "" ? "" : "logError"}>{this.state.error}</span>
                    <input className="account" name="username" type="text" placeholder="Enter your user" onChange={this.getForm}></input>
                    <input className="password" type="password" name="password" placeholder="Enter your password" onChange={this.getForm}></input>
                 </div>
                    
                    <button onClick={this.submit} className="send"><span> Iniciar seción</span></button>
                    <NavLink to="/forgotPass" style={{fontSize:"1.4rem"}}>I forgot my password</NavLink>
                    <p className="or">Or</p>
                    <GoogleLogin
                        className="googleBtn"
                        clientId="204753879301-qflivfpgiqk2v57hne24iu8j2acnmimn.apps.googleusercontent.com"
                        buttonText="Sign in with Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                
            </div>
           
            
            <Footer/>

            </>
        )
    }
}

const mapDispatchToProps = {
    logUser: usersActions.logUser,
    getUser: usersActions.getUser
}

const mapStateToProps = (state)=>{
    return{
        userLog: state.usersRed
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

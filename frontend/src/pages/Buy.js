import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GoSignIn from '../components/GoSignIn'
import GoUpAddress from '../components/GoUpAddress'
import FinishShopping from '../components/FinishShopping'
import usersActions from '../redux/actions/usersActions'
import SignUp from './SignUp'
import EditProfile from '../components/EditProfile'

class Buy extends React.Component{

    state ={
        flag: "noLog"
    }

    async componentDidMount(){
        if(this.props.token){
            var userLogued = await this.props.getUser(this.props.token)
            console.log(userLogued)
            this.setState({
                flag: userLogued.address === null ? "noAddress" : "ok"
            })
        }
    }
    redirect = (router) => {
        this.props.history.push(router)
    }
    
    render(){
        console.log(this.props.token);
        console.log(this.state.flag);
        

        return (
            <>
                <Header />
                {this.state.flag === "noLog"
                    ? /*this.redirect('/sign-up')*/ <GoSignIn/>
                    : this.state.flag === "noAddress"
                        ? /*this.redirect('/profile')*/ <GoUpAddress/>
                        : <FinishShopping />
                }
                <Footer />
            </>
        )
    }
}

const mapDispatchToProps = {
    getUser: usersActions.getUserAddress
}

const mapStateToProps = (state) => {
  
    return {
      token: state.usersRed.token
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buy))
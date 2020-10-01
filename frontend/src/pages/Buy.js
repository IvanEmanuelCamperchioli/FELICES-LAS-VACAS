import React from 'react'
import {connect} from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GoSignIn from '../components/GoSignIn'
import GoUpAddress from '../components/GoUpAddress'
import FinishShopping from '../components/FinishShopping'
import usersActions from '../redux/actions/usersActions'

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

    render(){

        
        return (
            <>
            
                <Header />
                {this.state.flag === "noLog"
                ?
                <GoSignIn />
                :
                this.state.flag === "noAddress"
                ?
                <GoUpAddress />
                :
                <FinishShopping />
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

export default connect (mapStateToProps, mapDispatchToProps)(Buy)
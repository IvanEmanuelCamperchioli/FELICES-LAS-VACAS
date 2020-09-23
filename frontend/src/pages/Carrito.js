import React from 'react'
import '../styles/header.css'

class Carrito extends React.Component {

    state = {
        open: '0',
    }

    closeNav = () => {
        this.setState({
            open: '0'
        })
    }

    openNav = () => {
        this.setState({
            open: '400px'
        })
    }

    render() {

        const style = {
            width: this.state.open
        }

        return (
            <>
            <div className="header-sup">
                <button onClick={this.openNav} className="openbtn" ><i class="fas fa-shopping-cart"></i></button>
                <div className="sidepanel" style={style}>
                    <button onClick={this.closeNav} className="closebtn">x</button>
                </div>
            </div>
            </>
        )
    }
}

export default Carrito
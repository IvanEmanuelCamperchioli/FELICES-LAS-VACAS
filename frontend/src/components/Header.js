import React, {useState} from 'react'
import '../styles/header.css'
import "../styles/itemCart.css"
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,  Tooltip} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faUser} from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import ItemCart from './ItemCart'
import productsActions from '../redux/actions/productsActions'

class Header extends React.Component {

    state = {
        tooltipOpen: false,
        open: "0",
        width: "100vw",
        height: "100vh",
        opacity: "",
        position: "fixed",
        products: this.props.products
    }


    componentDidMount(){
        if (this.props.cartProducts.length === 0 && localStorage.getItem('cart')){
            this.props.forceCart()
        }
    }

    toggle = () => {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        })
    }

   
    closeNav = () => {
        this.setState({
            open: '0',
            opacity: ''
        })
    }

    openNav = () => {
        this.setState({
            open: '600px',
            opacity: 'rgba(0,0,0,0.3)'
        })
    }
    
    render() {

        var subtotal = 0
        console.log(this.props)
        this.props.cartProducts.map(item =>{
            subtotal += (item.product.price * item.quantity)
        })        
        const style = {
            width: this.state.open
        }

        const body = {
            width: this.state.width,
            height: this.state.height,
            backgroundColor: this.state.opacity,
            position: this.state.position,
            
        }

        

        return (
            <>
            {<div className="header-sup">
                    <h5 className="titleHeader">Felices las vacas | Alimentación conciente</h5>
                    <button onClick={this.openNav} className="openbtn" ><FontAwesomeIcon className="carrito" icon={faShoppingCart} /></button>
                   { <div className="sidepanel" style={style}>
                        <div className="headerPanel">
                        <p>CARRITO DE COMPRAS</p>
                        <button onClick={this.closeNav} className="closebtn">x</button>
                        </div>
                        
                        {this.props.cartProducts.length === 0 ?
                        <div className="containeritemsCart">
                        <h1>El carrito esta vacio</h1>
                        </div>
                        :
                        <>
                         <div className="containeritemsCart">
                        {this.props.cartProducts.map(product =>{
                            return <ItemCart product = {product} />
                        })}
                        </div>
                        <div className="footCart">
                            <p>Total: ${subtotal}</p>
                            <button>Iniciar Compra</button>
                        </div>

                        </>
                        
                        }
                       
                    </div>}
            </div>}
            {/* <div style={body}></div> */}
           
            <div className="navbar">
                <div className="div"></div>
                <NavLink to='/'>Inicio</NavLink>
                <NavLink to='/productos'>Productos</NavLink>
                <NavLink to='/faqs'>Como comprar</NavLink>
                <MenuDesplegable userLogued={this.props} />
                <div className="div"></div>
            </div>            
            </>
        )
    }
}

const mapStateToProps = (state) => {
    
    return {
      username: state.usersRed.username,
      token: state.usersRed.token,
      cartProducts: state.productsRed.cartProducts
    };
  };
  
  const mapDispatchToProps = {
    forcedLogIn: usersActions.forcedLogIn,
    forceCart: productsActions.forcedCart
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Header);



const MenuDesplegable = (props) => {
    
    const [dropdownOpen, setDropdownOpen] = useState(false)
  
    const toggle = () => setDropdownOpen(prevState => !prevState)
    
    

    return (
        <>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle className="desplegable"><FontAwesomeIcon icon={faUser} /> 
                {props.userLogued.token ? `${props.userLogued.username}` : 'Cuenta'}</DropdownToggle>
                <DropdownMenu>
                    {props.userLogued.token ?   
                        (
                            <>
                            <DropdownItem><NavLink to='/' style={{width: '100%'}}>Mi cuenta</NavLink></DropdownItem>
                            <DropdownItem><NavLink to="/log-out">Cerrar sesión</NavLink></DropdownItem>
                            </>
                        )
                        :   
                        (
                            <>
                            <DropdownItem><NavLink to='/sign-in' style={{width: '100%'}}>Iniciar sesión</NavLink></DropdownItem>
                            <DropdownItem><NavLink to='/sign-up' style={{width: '100%'}}>Crear cuenta</NavLink></DropdownItem>
                            </>
                        )
                    }
                </DropdownMenu>
            </Dropdown>
        </>
    )
}


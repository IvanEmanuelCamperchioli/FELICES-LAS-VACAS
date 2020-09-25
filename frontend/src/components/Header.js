import React, {useState} from 'react'
import '../styles/header.css'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,  Tooltip} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faUser} from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";

class Header extends React.Component {

    state = {
        tooltipOpen: false
    }

    toggle = () => {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        })
    }

    userLogued = {
        username: this.props.username,
        token: this.props.token
    }
   
    render() {

        return (
            <>
            <div className="header-sup">
                <h5 className="titleHeader">Felices las vacas | Alimentación conciente</h5>
                <div>
                    <NavLink to="/cart" id="TooltipExample" className="openbtn" ><FontAwesomeIcon className="carrito" icon={faShoppingCart} /></NavLink>
                    <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggle}>Tienda virtual</Tooltip>
                </div>
            </div>
            <div className="navbar">
                <div className="div"></div>
                <NavLink to='/'>Inicio</NavLink>
                <NavLink to='/products'>Productos</NavLink>
                <NavLink to='/como-comprar'>Como comprar</NavLink>
                <MenuDesplegable userLogued={this.userLogued}  userLogOut={this.props.userLogOut}/>
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
    };
  };
  
  const mapDispatchToProps = {
    userLogOut: usersActions.userLogOut,
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Header);



const MenuDesplegable = (props) => {

    const [dropdownOpen, setDropdownOpen] = useState(false)
  
    const toggle = () => setDropdownOpen(prevState => !prevState)
    
    const logout = async () => {
        await props.userLogOut()
    }

    return (
        <>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle className="desplegable"><FontAwesomeIcon icon={faUser} /> 
                {props.userLogued.token ? `${props.userLogued.username}` : 'Cuenta'}</DropdownToggle>
                <DropdownMenu>
                    {props.userLogued.token ?   
                        (
                            <>
                            <DropdownItem><NavLink to='' style={{width: '100%'}}>Mi cuenta</NavLink></DropdownItem>
                            <DropdownItem><Link to="" onClick={logout}>Cerrar sesión</Link></DropdownItem>
                            </>
                        )
                        :   
                        (
                            <>
                            <DropdownItem><NavLink to='/login' style={{width: '100%'}}>Iniciar sesión</NavLink></DropdownItem>
                            <DropdownItem><NavLink to='/sign-up' style={{width: '100%'}}>Crear cuenta</NavLink></DropdownItem>
                            </>
                        )
                    }
                </DropdownMenu>
            </Dropdown>
        </>
    )
}


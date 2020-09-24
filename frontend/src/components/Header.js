import React, {useState} from 'react'
import '../styles/header.css'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,  Tooltip} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faUser} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';

class Header extends React.Component {

    state = {
        tooltipOpen: false
    }

    toggle = () => {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        })
    }

    render() {

        return (
            <>
            <div className="header-sup">
                <h5 className="titleHeader">Felices las vacas | Alimentación conciente</h5>
                <div>
                    <NavLink to="/carrito" id="TooltipExample" className="openbtn" ><FontAwesomeIcon className="carrito" icon={faShoppingCart} /></NavLink>
                    <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggle}>Tienda virtual</Tooltip>
                </div>
            </div>
            <div className="navbar">
                <div className="div"></div>
                <NavLink to='/'>Inicio</NavLink>
                <NavLink to='/productos'>Productos</NavLink>
                <NavLink to='/como-comprar'>Como comprar</NavLink>
                <MenuDesplegable />
                <div className="div"></div>
            </div>            
            </>
        )
    }
}

export default Header

const MenuDesplegable = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false)
  
    const toggle = () => setDropdownOpen(prevState => !prevState)
  
    return (
        <>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle className="desplegable"><FontAwesomeIcon icon={faUser} /> Cuenta </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>Registrate o accede a tu cuenta</DropdownItem>
                    <DropdownItem divider />
                    <NavLink to='/signup' style={{width: '100%'}}><DropdownItem>Crear Cuenta</DropdownItem></NavLink>
                    <NavLink to='/login' style={{width: '100%'}}><DropdownItem>Iniciar Seción</DropdownItem></NavLink>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}


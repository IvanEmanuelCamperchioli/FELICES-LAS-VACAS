import React, {useState} from 'react'
import '../styles/header.css'
import {Link, NavLink} from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faUser} from '@fortawesome/free-solid-svg-icons'

class Header extends React.Component {

    render() {

        return (
            <>
            <div className="header-sup">
                <h5 className="titleHeader">Felices las vacas | Alimentación conciente</h5>
                <button className="openbtn" ><FontAwesomeIcon icon={faShoppingCart} /></button>
            </div>
            <div class="navbar">
                <div className="div"></div>
                <a href="#">Inicio</a>
                <NavLink to="/productos">Productos</NavLink>
                <a href="#">¿Cómo comprar?</a>
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
                <DropdownToggle className="desplegable"><FontAwesomeIcon icon={faUser} />Cuenta </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>Registrate</DropdownItem>
                    <DropdownItem>Crear Cuenta</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem header>Accede</DropdownItem>
                    <DropdownItem>Iniciar Seción</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}


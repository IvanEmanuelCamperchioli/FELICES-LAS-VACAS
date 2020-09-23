import React, {useState} from 'react'
import '../styles/header.css'
import {Link} from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class Header extends React.Component {

    render() {

        return (
            <>
            <div className="header-sup">
                <button className="openbtn" ><i class="fas fa-shopping-cart"></i></button>
            </div>
            <div class="navbar">
                <div className="div"></div>
                <a href="#">Inicio</a>
                <a href="#">Productos</a>
                <a href="#">Como comprar</a>
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
                <DropdownToggle className="desplegable"><i class="fas fa-user"></i> Cuenta </DropdownToggle>
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


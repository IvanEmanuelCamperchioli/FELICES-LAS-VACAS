import React, {useState} from 'react'
import '../styles/header.css'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Tooltip } from 'reactstrap';


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
                    <button id="TooltipExample" className="openbtn" ><i class="fas fa-shopping-cart"></i></button>
                    <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggle}>Tienda virtual</Tooltip>
                </div>
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


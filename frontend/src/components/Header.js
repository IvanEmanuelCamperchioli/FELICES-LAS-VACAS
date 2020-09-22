import React from 'react'
import '../styles/header.css'

class Header extends React.Component {

    render() {

        return (
            <>
            <div className="header-sup">
                <div><h1>LeeSITECH</h1></div>
                <div className="secion"><i class="fas fa-user"></i> Iniciar Seción</div>
            </div>
            <div class="navbar">
                <a href="#">Inicio</a>
                <a href="#">Novedades</a>
                <div class="dropdown">
                    <button class="dropbtn">Tecnologías</button>
                    <div class="dropdown-content">
                        <div class="header">
                            <h2>Mega Menu</h2>
                        </div>   
                        <div class="row">
                            <div class="column">
                                <h3>Equipos</h3>
                                <a href="#">Notebook</a>
                                <a href="#">PCs Gamer</a>
                                <a href="#">Tablets</a>
                                <a href="#">PCs sin monitor</a>
                            </div>
                            <div class="column">
                                <h3>Imagen</h3>
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                            <div class="column">
                                <h3>Category 3</h3>
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>            
            </>
        )
    }
}

export default Header
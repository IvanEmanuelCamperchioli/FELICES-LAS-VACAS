import React from 'react'

class Destacado extends React.Component {

    render() {

        const logo = require('../images/logo.png')

        return (
            <>  
                <div className="container-logo">
                    <div className="logo" style={{backgroundImage: `url(${logo})`}}></div>
                </div> 
                <div style={{height: '10vh', width: '100%'}}></div>
                <h1 className="titulo">Destacado</h1>
                
            </>
        )
    }
}

export default Destacado
import React from 'react'
import Carrousel from '../components/Carrousel'
import Destacado from '../components/Destacado'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

class Home extends React.Component {

    render() {

        return (
            <>
                <Header />
                <Carrousel />
                <button className="questionCircle"><FontAwesomeIcon  icon={faQuestionCircle} /></button>
                <Destacado />
                <Footer />
            </>
        )
    }
}

export default Home

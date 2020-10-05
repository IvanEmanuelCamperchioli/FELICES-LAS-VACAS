import React from 'react'
import Carrousel from '../components/Carrousel'
import BestSellers from '../components/BestSellers'
import Footer from '../components/Footer'
import Header from '../components/Header'

class Home extends React.Component {

    render() {

        return (
            <>
                <Header />
                <Carrousel />
                <BestSellers />
                <Footer />
            </>
        )
    }
}

export default Home

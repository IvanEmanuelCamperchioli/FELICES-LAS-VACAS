import React, {useEffect, useState} from 'react';
import '../styles/itemsprofile.css';
import axios from 'axios'
import Header from '../components/Header'
import ItemCard from '../components/ItemCard';

const Items = () => {
    const [items, setResponseData] = useState([])
	useEffect(() => {
		stuffData()
	}, [])
	const stuffData = async () => {
        const response = await axios.get("http://127.0.0.1:4000/api/items")	
        setResponseData(response.data.products)
    }
    return (
        <>
        <Header/>
        <div className="containerP">
        <h1>los mejores productos, al alcance de tu mano</h1>
        <div className="search">
            <input placeholder="Buscar..." />
        </div>
        <div className="cardsContainer">
        {items.map((item)=>{
           return (<div style={{margin:"1.4vw",width:"25vw"}}><ItemCard key={item.id} item={item}/></div>)
        })}
        </div>
       
        </div>
        </>
    );
};

export default Items;
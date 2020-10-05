import React, {useState,useEffect} from 'react';
import Header from './Header'
import { connect } from 'react-redux';
import productsActions from '../redux/actions/productsActions'


const Item = (props) => {
    const [item, setItem] = useState({})
  
  
    useEffect(async () => {
    var idProduct = props.match.params.id
    const res = await props.getProduct(idProduct)
    setItem(res)
   
	  }, [])
    

    return (
    <>
    <Header/>
    <div style={{display:"flex", flexDirection:"column", marginLeft:"5%"}}>
    <div><h5>inicio | productos | {item.name}</h5></div>
      <div style={{display:"flex", marginLeft:"5%"}}>
        <div>
          <div><img style={{width:"30vw", margin:"3%"}} src={item.photo}></img></div>
          <button style={{width:"60%", color:"white", backgroundColor:"black",alignSelf:"center",padding:"0.3%",marginLeft:"25%", borderStyle:"none"}}>Add to cart</button>
        </div>
        <div  style={{display:"flex", flexDirection:"column", margin:"4%", width:"40vw"}} >
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <img style={{width:"18vw"}} src={item.photo1}></img>
        </div>
      </div>
    </div>
    </>  
    );
};

const mapDispatchToProps = {
  getProduct : productsActions.getProductById
}

export default connect (null, mapDispatchToProps)  (Item);


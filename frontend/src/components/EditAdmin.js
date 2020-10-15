import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import adminActions from '../redux/actions/adminActions'
import CardEdit from './CardEdit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons'
import '../styles/itemsprofile.css'


//Componente que muestra el listado de productos al admin e incluye filtros
const EditAdmin = (props) => {

    const [panel, setPanel] = useState({
        category: "",
        order:"",
        items: [],
        filteredItems:[]
    })

    useEffect( () => {
        //Hook que actualiza el state al cambiar las props
        const products = props.products
        setPanel({
            ...panel,
            items:products,
            filteredItems:products
        })
    }, [props])

    useEffect (() => {
        //cuando el componente se monta obtengo los productos
        props.getProducts()
    }, [])

    const filterItem = e => {
        //Funcion para guardar en el state la manera de filtrar y ordenar
        setPanel({
            ...panel,
            [e.target.name]: e.target.value
        })
    }

    const filterP = () =>{
        //Funcion para filtrar los productos
        var filtered = panel.items
        if (panel.category !== ""){
            switch (panel.category){
                case "Todo":
                    return(filtered)

                case "Secos":
                    filtered = panel.items.filter(item=>(
                        item.category === "Secos"
                    ))
                    return(filtered)
                    
                case "Refrigerados":
                    filtered = panel.items.filter(item=>(
                        item.category === "Refrigerados")
                    )
                    return(filtered)
                case "Congelados":   
                    filtered = panel.items.filter(item=>(
                        item.category === "Congelados"
                    ))
                    return(filtered)
            }
        }
    }

    const orderF = (filtered) =>{
       //Funcion para ordenar los productos
        if(panel.order !== ""){
            switch (panel.order){
                case "MasStock":
                    filtered.sort((a,b) => b.stock - a.stock)
                    return(filtered)
                case "MenosStock":
                    filtered.sort((a,b) => a.stock - b.stock)
                    return(filtered)
                case "MasPrecio":
                    filtered.sort((a,b) => b.price - a.price)
                    return(filtered)
                case "MenosPrecio":
                    filtered.sort((a,b) => a.price - b.price)
                    return(filtered)
            }
        }
        else{
            return filtered
        }
    }

    const searchFilterHome = async (e) => {
        //Funcion que se ejecuta al pulsar e boton de buscar
        //De haberse seleccionado un tipo de flitro, filtro los productos
        const filtered =  await filterP()
        //Luego los ordeno
        if (filtered === undefined){
            const allfiltered = orderF(panel.items)
            setPanel({
                ...panel,
                filteredItems: allfiltered
            })
        }else{
            orderF(filtered)
            setPanel({
                ...panel,
                filteredItems: filtered
            })
        }                        
    }

    const stylePanel = {
        paddingTop: "2px",
        paddingBottom: "2px",
        borderRadius: "0.5rem",
        background: "white",
    }

    return (
        <>
            <div  className='d-flex justify-content-center container'>
                <div style={stylePanel} className='d-flex row justify-content-around'>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        margin: '1vh'
                    }} className='col-md-4 col-sm-12'>
                        <select className='col-sm-12 inputSelect' onChange={filterItem} name="category">
                            <option className="titleOption" disabled selected>Category Filter</option>
                            <option value="Todo" className="option">Ver todo</option>
                            <option value="Secos" className="option">Secos</option>
                            <option value="Refrigerados" className="option">Refrigerados</option>
                            <option value="Congelados" className="option">Congelados</option>
                        </select>
                        <span style={{alignSelf: 'center'}}><FontAwesomeIcon icon={faFilter}/></span>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        margin: '1vh'
                    }} className= 'col-md-4 col-sm-12 '>
                        <select className='col-sm-12 inputSelect'  onChange={filterItem} name="order">
                            <option className="titleOption" disabled selected>Stock/Price Filter</option>
                            <option value="MasStock" className="option">Mayor stock</option>
                            <option value="MenosStock" className="option">Menor stock</option>
                            <option value="MasPrecio" className="option">Mayor precio</option>
                            <option value="MenosPrecio" className="option">Menor precio</option>
                        </select>
                        <span style={{alignSelf: 'center'}}><FontAwesomeIcon icon={faSort} /></span>
                    </div>
                    <button className="btn btn-success btn-lg btn-block" onClick={searchFilterHome} >Buscar</button>
                </div>
            </div>

            {panel.filteredItems.map((product,index) => 
                <CardEdit key={index} product={product}/>
            )}
        </>
    )
}

const mapStateToProps = state => {
    return {
        products: state.adminRed.products
    }
}

const mapDispatchToProps = {
    getProducts: adminActions.getProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAdmin)
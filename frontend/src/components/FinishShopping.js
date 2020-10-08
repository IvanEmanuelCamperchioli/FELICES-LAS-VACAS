import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Paypal from './Paypal'
import ItemFinish from './ItemFinish'
import '../styles/finishShopping.css'
import productsActions from '../redux/actions/productsActions'
import usersActions from '../redux/actions/usersActions'
import Header from './Header'
import GoUpAddress from './GoUpAddress'
import Swal from 'sweetalert2'

const FinishShopping = (props) => {

    const [countTotalDolar, setCountTotalDolar] = useState(0)
    const [visibilityPaypal, setVisibilityPaypal] = useState(false)
    const [addressCorrect, setAddressCorrect] = useState(false)

    
const [newData, setNewData] = useState({
    city:"",
    province:"",
    address:""
})

const [error, setError] = useState("")

const getForm = e =>{
    e.preventDefault()
    const property = e.target.name
    const value = e.target.value
    setNewData({
        ...newData,
        [property]: value
    })
}


const submit =  async e => {

    e.preventDefault()
    if (newData.city ==="" || newData.city ==="" || newData.city ==="" ){
        setError("Todos los campos son requeridos")
    }else{
        setError("")
        const response =  await props.sendAddress(props.token, newData)
        
        setNewData({
            ...newData,
            city:"",
            province:"",
            address:""
        })
    }
}

    useEffect(() => {
        totalDolar()
        console.log(props)
        const data = async() => {
            var userLogued = await props.getUser(props.token)
            if (userLogued.address === null){
                await Swal.fire({  title: 'Actualice sus datos!',  text: "Por favor, antes de continuar con la compra actualice sus datos",  icon: 'warning',  showConfirmButton: true, timer: 20000,allowOutsideClick: false})

            }
            
        }
        data()
    }, [])

    const totalDolar = () => {

        let countTotal = 0
        const changeDolar =  0.013

        props.cartProducts.map(product => {
            countTotal += (parseInt(product.quantity) * parseInt(product.product.price))
        })

        setCountTotalDolar(countTotal * changeDolar)
    }

    return (

        <>  
        <Header/>
        <div className="containerAll">
            <div className="containerSubtotal">
                <h3 className="nameFinish">Resumen de compra</h3>
                <div className="mainCont">
                    <div className="maincontainerStract">
                        {props.cartProducts.map(product=>{
                            
                            return <ItemFinish item= {product} />
                            
                        })}
                    </div>
                    
                </div>
                    <h4 className="subtotalx">Subtotal: {props.countTotal}</h4>
                <div className="buttons">
                    <button className="btn1" onClick={async () =>{
                        await Swal.fire({
                            title: '¿Confirmar compra?',
                            text: "La misma llegará en 5 dias hábiles y podras abonarla tanto en efectivo como con mercado pago al momento de recibirla",
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Si, ¡confirmar!'
                          }).then((result) => {
                            
                            if (result.isConfirmed) {
                                if(props.countTotal !== 0){
                                    props.confirm(props.cartProducts, props.token)
                                    Swal.fire({  title: 'Muchas gracias por tu compra!',  
                                    text: `Recibirás un mail de confirmación a tu correo`,  
                                    icon: 'success',  
                                    showConfirmButton: true, 
                                    timer: false,
                                    allowOutsideClick: false})
                                    .then(props.history.push('/gracias'))
         
                                }
                            }
                            
                            
                          })
                         
                    }}>Pagar en efectivo</button>
                    <button className="btn1" onClick={() => setVisibilityPaypal(!visibilityPaypal)}>Pagar con paypal</button>
                    {(visibilityPaypal) && <Paypal total={countTotalDolar} />}
                </div>
            </div>
                <div className="containerAddress">
                <h3 className="nameFinish">Direccíon de envio</h3>
                    <GoUpAddress />
                </div> 
            </div>
        </>
    )
}

const mapDispatchToProps = {
    confirm: productsActions.confirm,
    sendAddress: usersActions.sendAddress,
    getUser: usersActions.getUserAddress
}

const mapStateToProps = (state) => {
    var countTotal = 0
        state.productsRed.cartProducts.map(product =>{
        countTotal += (parseInt(product.quantity) * parseInt(product.product.price))
    })
    return {
        token: state.usersRed.token,
        cartProducts: state.productsRed.cartProducts,
        countTotal
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishShopping)
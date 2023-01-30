import { faAngleDown, faAngleUp, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as cartAction from './Redux/Reducers/CartSlice'

function CartPage() {

   let {cart,buyLoading} = useSelector(state=>state.cart)
   let { cartItems,total } = cart
   let { userName,email } = useSelector(state => state.loginDetails.user)
   let dispatch = useDispatch()

   let {removeFromCart,qtyIncrement,qtyDecrement,buyProduct} = bindActionCreators(cartAction,dispatch)

   const buyFromCart = (item) =>{
      let index = cartItems.findIndex((e) => e._id === item._id)
      let product = {...cartItems[index]}
      product.price = product.totalPrice
      let payment = {
        item : product,
        user : email,
        userName
      }

      buyProduct(payment)

   }

  return (

    cartItems.length === 0 ?
    <div className='cart-page-empty'>
      <h3 className='text-dark pt-2 ps-3'>Add Your Favourites To Me....!</h3>
      <div className="d-flex justify-content-center align-items-center cart-empty-div">
          <div className="cart-empty"></div>       
      </div>
      <h3 className='text-center pt-3'>Your cart is empty</h3>
      <h5 className='text-center pt-2 text-muted'>Looks like you haven't added anything to your cart.Go</h5>
      <h5 className='text-center text-muted'>ahead and explore top categories</h5>
      <div className='text-center'><Link to='/'><button className='empty-explore-btn'>Explore</button></Link></div>
      </div>
      :
     
    <div className='cartpage-div'>
      <h3 className='text-dark pt-2 ps-3'>Add Your Favourites To Me....!</h3>
      <div className="d-flex justify-content-center">
        <div className="col-12 col-md-10"> 
            <div className="d-flex ps-3 ">
                <div className="col-1"><h4>#</h4></div>
                <div className="col-2 text-center"><h5 className='ps-4'>Item</h5></div>
                <div className="col-4 text-center"><h5>Quantity</h5></div>
                <div className="col-2 text-center"><h5>Price</h5></div>
                <div className="col-3 text-center"><h5 className='ps-4'>Actions</h5></div>
            </div>
            <hr className='m-0 p-0'/>
            
                {
                 cartItems.map((ele,i)=>{

                    return <div>
                     <div className="d-flex ps-3 align-items-center">
                        <div className="col-1"><h6>{i+1}</h6></div>
                <div className="col-2 text-center ps-md-3 pe-md-3">
                    <Link to={`/view/${ele.collection}/${ele._id}`}><img src={ele.image} alt="" className='cartpage-img py-1'/></Link> 
                </div>
                <div className="col-4 text-center">
                    <div>
                    <button onClick={()=>qtyIncrement(ele)} className='cart-angle'><FontAwesomeIcon icon={faAngleUp}/></button>
                    </div>
                    <div>
                        <h5 className='mb-0'>{ele.quantity}</h5>
                    </div>
                    <div>
                    <button onClick={()=>qtyDecrement(ele)} className='cart-angle'><FontAwesomeIcon icon={faAngleDown}/></button>
                    </div>
                    </div>
                <div className="col-2 text-center">{ele.totalPrice}</div>
                <div className="col-3 cartbtn-grp text-center">
                    <div className='py-1 py-md-0'>
                    {
                        buyLoading ?
                        <button onClick={()=>buyFromCart(ele)} className='cartpage-btnb ' style={{cursor : "not-allowed"}}>Buy</button>
                        :
                        <button onClick={()=>buyFromCart(ele)} className='cartpage-btnb '>Buy</button> 
                    }
                    </div>
                    <div className="ps-md-3 pb-1 pb-md-0">
                    <button onClick={()=>removeFromCart(ele)} className='cartpage-btnr ps-1'>Remove</button>
                    </div>
                </div>
                    </div>
                    <hr className='m-0 p-0'/>
                    </div>
                 })
                }
            
            <div className="d-flex pt-2">
                <div className="col-8"><h4 className='float-end pe-2'>Total =</h4></div>
                <div className="col-3 d-flex"><FontAwesomeIcon icon={faIndianRupeeSign} className='pt-2 pe-1'/><h4>{total}</h4></div>
            </div>
            
</div>
</div>
    </div>

  
  )
}

export default CartPage
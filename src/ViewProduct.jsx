import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as actionCreators from './Redux/Reducers/CartSlice'
import { viewProduct } from './Redux/Reducers/ProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'


function ViewProduct() {
  
    const {viewItem,viewLoading} = useSelector(state=>state.product)
    const { buyLoading} = useSelector(state=>state.cart)
    const { userName,email } = useSelector(state=>state.loginDetails.user)
    
    const dispatch = useDispatch()

    let { addToCart,buyProduct } = bindActionCreators(actionCreators,dispatch)
            
    let params = useParams()

    let{name,image,offer,price,description} = viewItem
    let originalPrice = Number(price) + Math.ceil(Math.random() * 100)

    let category = params.category
    let id = params.id
      
    let values ={
      category,
      id
    }

    useEffect(()=>{
   dispatch(viewProduct(values))
    },[])

    let payment = {
      item:viewItem,
      user:email,
      userName
    }

return (

  viewLoading ?
    <div className="d-flex products-div justify-content-center align-items-center">
      <div className="loading-icons d-flex justify-content-evenly">
        <div class="spinner-grow text-warning" role="status">
       <span class="visually-hidden">Loading...</span>
       </div>
       <div class="spinner-grow text-info" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  <div class="spinner-grow text-success" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
          
      </div>
    </div>
    :
    <div className='products-div pt-5'>
    <div className="container">
        <div className="row g-0">
            <div className="col-12 col-md-5 view1-div">
              <img src={image} alt="Product Image" className='view-img' />
              <div className="view-btn-div mt-5 mb-4">
                <div className='view-btn-1'><button onClick={()=>addToCart(viewItem)} className='view-btn'>Add To Cart</button></div>
                {
                buyLoading ?
                <div className='view-btn-2'><button onClick={()=>{buyProduct(payment)}} className='view-btn' style={{cursor:"not-allowed"}}>Buy Now</button></div>
                :
                <div className='view-btn-2'><button onClick={()=>{buyProduct(payment)}} className='view-btn'>Buy Now</button></div>
                }
              </div>
            </div>
            <div className="col-12 col-md-7 view2-div p-2 pt-4">
              <h1 className='pb-2'>{name}</h1>
              <h4 className='mb-0 pb-0'>Price</h4>
              <FontAwesomeIcon icon={faIndianRupeeSign} size="2x" className='pe-2 rupee'/><span className='offer-price'>{price}</span><FontAwesomeIcon icon={faIndianRupeeSign} size="sm" className='ps-2 price'/><span className='price original-price ps-1'>{originalPrice}</span><span className='ms-2 offer'>{offer}</span>
              <h6 className='pt-3 pb-1'>About this item :</h6>
              <p className='description'>{description}</p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ViewProduct
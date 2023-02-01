import { faIndianRupeeSign,faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { bindActionCreators } from 'redux'
import * as actionCreators from './Redux/Reducers/ProductSlice'
import * as cartActions from './Redux/Reducers/CartSlice'

function ProductsPage() {

    const {productsList,productLoading,filteredItems,searchList,
        dropViewClose,productSearchValue} = useSelector(state=>state.product)
    const {cartItems} = useSelector(state =>state.cart.cart)
    const dispatch = useDispatch()

    const {productList,filter,searchProduct,setSearchList,setDropViewClose,
           setFilterMinValue,setFilterMaxValue,setFilteredItems,setProductSearchValue} = bindActionCreators(actionCreators,dispatch)
    const {addToCart,removeFromCart} = bindActionCreators(cartActions,dispatch)
       
    let params = useParams()

    let {name} = params
    
    useEffect(()=>{
        productList(name)
        if(filteredItems.length > 0) setFilteredItems()
       if(dropViewClose) setDropViewClose(false)
    },[name])


    useEffect(()=>{
        if(productSearchValue.length > 0) searchProduct(name)
    },[productSearchValue])


    const favouriteToCart = (ele) =>{
        if(cartItems.some((e => e._id === ele._id))){
            removeFromCart(ele)
        }else{
            addToCart(ele)
        }
    }
        

  return (
    productLoading ?
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
    <div className='products-div '>
    <div className="filter-div shadow pb-3 pt-3">
        <div className='d-flex'>
            <div className="select-div ms-4">
        <select class="form-select"
        onChange={(e) => setFilterMinValue(Number(e.target.value))}
        >
         <option selected>Min</option>
         <option value="1">1</option>
         <option value="100">100</option>
         <option value="200">200</option>
         <option value="300">300</option>
         <option value="400">400</option>
         <option value="500">500</option>
         <option value="600">600</option>
         <option value="700">700</option>
        </select>
        </div>
        <div className='align-self-center ms-3'>to</div>
        <div className="select-div ms-3">
        <select class="form-select"
        onChange={(e) => setFilterMaxValue(Number(e.target.value))}
        >
         <option selected>Max</option>
         <option value="100">100</option>
         <option value="200">200</option>
         <option value="300">300</option>
         <option value="400">400</option>
         <option value="500">500</option>
         <option value="600">600</option>
         <option value="700">700</option>
         <option value="800">800+</option>
        </select>
        </div>
         <button onClick={()=>filter(name)} className='btn btn-success ms-2'>Filter</button>
         </div>
         <div className="product-search pe-3">
            <input type="text" className='product-search-inp form-control' placeholder='Search by name' 
            onChange={(e)=>setProductSearchValue(e.target.value)}
            value={productSearchValue}/>
            {
                productSearchValue.length > 0 ?
            <h5 onClick={()=>{setProductSearchValue("");setSearchList()}} className='search-x'>x</h5>
            : null
            } 
         </div>
        </div>
        <div className="d-flex mt-4 flex-wrap ps-4 pe-4">
        {
    filteredItems.length > 0 ?
    
          filteredItems.map((ele)=>{
                return(
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 pb-4">
                    <div className="card">
                    <Link to={`/view/${params.name}/${ele._id}`} className='link'><img src={ele.image} alt="Hot deals" className='deals-div1-cardimg' /></Link>
                    <div className="cart-heart-div">
                    <FontAwesomeIcon onClick={()=>favouriteToCart(ele)} icon={faHeart}  className={`cart-heart ${cartItems.some((e => e._id === ele._id)) ?`cart-heart-selected` :`cart-heart-default`} `}/>
                    </div>
                    <div className="card-title">
                        <h4 className='title-over mb-0 pb-0'>{ele.name}</h4>
                        <FontAwesomeIcon icon={faIndianRupeeSign}/><span className='product-price ms-1'>{ele.price}</span>
                        <h6 className='text-muted'>{ele.offer}</h6>
                     </div>
                     
                    </div>
                </div>
                )
            })
              :
              searchList.length > 0 ?
              searchList.map((ele)=>{
                return(
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 pb-4">
                    <div className="card">
                    <Link to={`/view/${params.name}/${ele._id}`} className='link'><img src={ele.image} alt="Hot deals" className='deals-div1-cardimg' /></Link>
                    <div className="cart-heart-div">
                    <FontAwesomeIcon onClick={()=>favouriteToCart(ele)} icon={faHeart}  className={`cart-heart ${cartItems.some((e => e._id === ele._id)) ?`cart-heart-selected` :`cart-heart-default`} `}/>
                    </div>
                    <div className="card-title">
                        <h4 className='title-over mb-0 pb-0'>{ele.name}</h4>
                        <FontAwesomeIcon icon={faIndianRupeeSign}/><span className='product-price ms-1'>{ele.price}</span>
                        <h6 className='text-muted'>{ele.offer}</h6>
                     </div>
                     
                    </div>
                </div>
                )
            })
              :
            productsList.map((ele)=>{
                return(
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 pb-4">
                    <div className="card">
                    <Link to={`/view/${params.name}/${ele._id}`} className='link'><img src={ele.image} alt="Hot deals" className='deals-div1-cardimg' /></Link>
                    <div className="cart-heart-div">
                    <FontAwesomeIcon onClick={()=>favouriteToCart(ele)} icon={faHeart} className={`cart-heart ${cartItems.some((e => e._id === ele._id)) ?`cart-heart-selected` :`cart-heart-default`} `}/>
                    </div>
                    <div className="card-title">
                        <h4 className='title-over mb-0 pb-0'>{ele.name}</h4>
                        <FontAwesomeIcon icon={faIndianRupeeSign}/><span className='product-price ms-1'>{ele.price}</span>
                        <h6 className='text-muted'>{ele.offer}</h6>
                     </div>
                     
                    </div>
                </div>
                )
            })
        }
    
                
    </div>
    </div>
    
  )
}

export default ProductsPage
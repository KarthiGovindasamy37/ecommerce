import { faIndianRupeeSign,faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as productActions from './Redux/Reducers/ProductSlice'
import * as cartActions from './Redux/Reducers/CartSlice'
import { toast } from 'react-toastify'

function ProductsPage() {

    const {productsList,productLoading,filteredItems,searchList,
        dropViewClose,productSearchValue,productSearchAlert,filterBlock,searchBlock,
    filterLoading,filterError,productError,searchError,searchLoading,filterMinValue,
    filterMaxValue,searchFilteredItems,searchFilterBlock} = useSelector(state=>state.product)
    const {cartItems} = useSelector(state =>state.cart.cart)
    const dispatch = useDispatch()

    const {productList,filter,searchProduct,productSearchClear,setDropViewClose,
           setFilterMinValue,setFilterMaxValue,setProductSearchValue,
           setProductSearchAlert,setSearchFilteredItems,setSearchBlock} = bindActionCreators(productActions,dispatch)
    const {addToCart,removeFromCart} = bindActionCreators(cartActions,dispatch)
       
    let params = useParams()

    let {name} = params
    
    useEffect(()=>{
        productList(name)
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

    const validateSearchValue = (value) =>{
       if(value.length > 0){
        if(value.charCodeAt(0) === 32){

        }else if(value.charCodeAt(value.length - 1) === 32 && value.charCodeAt(value.length - 2) === 32){
  
       }else{
        let regexp = new RegExp(/^[a-z\s]*$/,"i")
            
            if(regexp.test(value)){
                setProductSearchValue(value)
                setProductSearchAlert(false)
            }else{
                setProductSearchAlert(true)
            }
        }
    
    }else{
        setProductSearchValue("")
        setSearchBlock()
    }
}
   
const filterProduct = (searchList) =>{
    if(filterMinValue > filterMaxValue){
        setFilterMinValue(Number(filterMaxValue))
        setFilterMaxValue(Number(filterMinValue))
    }
     if(filterMinValue === 1 && filterMaxValue === 800){
        toast.info("Please select atlest one value",{toastId:Math.random()})
    }else{
        if(searchList.length > 0){
            let filtered = searchList.reduce((acc,e)=>{
                if(filterMaxValue === 800){
                    if(Number(e.price) >= filterMinValue) acc.push(e)
                    return acc
            }else{
                if(Number(e.price) >= filterMinValue && Number(e.price) <= filterMaxValue) acc.push(e)
                return acc
            }
             },[])
 
             filtered.sort((a,b) => a.price - b.price)
             setSearchFilteredItems(filtered)
     }else{
         filter(name)
     }
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
    productError ?
    <div className="d-flex products-div justify-content-center align-items-center">
               <h4 className='text-muted'>Sorry something went wrong,please try again</h4>
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
         <button onClick={()=>filterProduct(searchList)} className='btn btn-success ms-2'>Filter</button>
         </div>
         <div className="product-search pe-3">
            <input type="text" className='product-search-inp form-control' placeholder='Search by name' 
            onChange={(e)=>validateSearchValue(e.target.value)}
            value = {productSearchValue}
            onBlur={() =>setProductSearchAlert(false)}/>
            
            {
                productSearchValue.length > 0 ?
            <h5 onClick={()=>{productSearchClear()}} className='search-x'>x</h5>
            : null
}
{
           productSearchAlert ?
            <span className='product-search-alert'>Characters only allowed</span>
            :null
        } 
         </div>
        </div>
        <div className="d-flex mt-4 flex-wrap ps-4 pe-4">
        {
    filterBlock ? filterLoading ?
    <div className="d-flex filter-page-div justify-content-center align-items-center">
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
  </div> :
  filterError ?
  <div className="d-flex filter-page-div justify-content-center align-items-center">
               <h4 className='text-muted'>Sorry something went wrong,please try again</h4>
              </div>
              :
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
              <div className="d-flex filter-page-div justify-content-center align-items-center">
               <h4 className='text-muted'>Sorry we don't have any item according to your filter range</h4>
              </div>
              : 
            searchBlock ? searchLoading ?
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
            productList.length > 0 ?
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
            :
            <div className="d-flex filter-page-div justify-content-center align-items-center">
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
     searchError ?
            <div className="d-flex filter-page-div justify-content-center align-items-center">
               <h4 className='text-muted'>Sorry something went wrong,please try again</h4>
              </div>
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
            <div className="d-flex filter-page-div justify-content-center align-items-center">
            <h4 className='text-muted'>Sorry we don't have any item according to your search</h4>
            </div>
              :
              searchFilterBlock ?
              searchFilteredItems.length > 0 ?
              searchFilteredItems.map((ele)=>{
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
            <div className="d-flex filter-page-div justify-content-center align-items-center">
            <h4 className='text-muted'>Sorry we don't have any item according to your search</h4>
            </div>
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
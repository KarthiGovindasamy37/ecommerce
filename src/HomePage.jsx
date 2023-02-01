import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import Carousel from './Components/Carousel'
import * as productActions from './Redux/Reducers/ProductSlice'
import { addToCart,removeFromCart } from './Redux/Reducers/CartSlice'

function HomePage() {

    const {dealsItems,divaItems} = useSelector(state =>state.product)
    const {cartItems} = useSelector(state => state.cart.cart)
    const dispatch = useDispatch()

    const { loadDeals,loadDiva } = bindActionCreators(productActions,dispatch)


    useEffect(()=>{
        loadDeals()
        loadDiva()
    },[])

    const favouriteToCart = (ele) =>{
        if(cartItems.some((e => e._id === ele._id))){
            dispatch(removeFromCart(ele))
        }else{
            dispatch(addToCart(ele))
        }
    }


    let loadingImg=[
        {
            image:"lipstick.jpg",
            title:"Matte Lipstick",
            sub_title:"Upto 25% off"
        },
        {
            image:"kajalblur.jpg",
            title:"Smoky Kajal",
            sub_title:"Upto 45% off"
        },
        {
            image:"lipstickblur.jpg",
            title:"MAC Lipstick",
            sub_title:"Upto 30% off"
        },
        {
            image:"lipstickblur1.jpg",
            title:"Glam Ultra ",
            sub_title:"Upto 20% off"
        },
        {
            image:"facewashblur.jpg",
            title:"Gar Face Wash",
            sub_title:"Upto 25% off"
        },
        {
            image:"facewashblur1.jpg",
            title:"Mac Face Wash",
            sub_title:"Upto 45% off"
        }
        
    ]

    
  return (
    <div className='home-div' >
   <Carousel/>
   <div className="deals-div pb-4">
    <div className="deals-div1 pt-4">
    <h2 className='ps-3'>Deals You Can't Miss</h2>
    <h3 className='text-muted ps-3'>In The Spotlight</h3>
    <div className="d-flex mt-4 flex-wrap justify-content-between" >
        {
           dealsItems.length > 0 ? dealsItems.map((ele)=>{
                return(
                    <div className="col-sm-6 col-lg-4 pb-4">
                    <div className="card">
                    <Link to={`/view/dealsBlock/${ele._id}`} className='link '><img src={ele.image} alt="Hot deals" className='deals-div1-cardimg' /></Link>
                    <div className="cart-heart-div">
                    <FontAwesomeIcon onClick={()=>favouriteToCart(ele)} icon={faHeart}  className={`cart-heart ${cartItems.some((e => e._id === ele._id)) ?`cart-heart-selected` :`cart-heart-default`} `}/>
                    </div>
                      <div className="card-title text-dark">
                        <h4 className='title-over'>{ele.name}</h4>
                        <h5 className='text-muted'>{ele.offer}</h5>
                     </div>
                    </div>
                </div>
                )
            })
            : loadingImg.map((ele)=>{
                return (
                <div className="col-sm-6 col-lg-4 pb-4">
                <div className="card loading-opacity">
               <img src={`/assets/images/${ele.image}`} alt="Hot deals" className='deals-div1-cardimg' />
                  <div className="card-title text-dark">
                    <h4>{ele.title}</h4>
                    <h5 className='text-muted'>{ele.sub_title}</h5>
                 </div>
                </div>
            </div>
            )
            })
            
        }
    </div>
   </div>
   </div>
   <div className="categories pb-4">
   <h2 className='ps-3 pt-4'>Categories In Focus</h2>
   <h3 className='text-muted ps-3'>Shop Our Special Curations</h3>
   <div className="d-flex justify-content-between flex-wrap pt-4" >
    <div className="col-12 col-md-6"><div className="categ1"></div></div>
    <div className="col-12 col-md-6"><div className="categ2"></div></div>
   </div>
    </div>
    <div className="diva pb-4">
    <h2 className='ps-2 pt-4'>Only At Diva</h2>
    <h3 className='text-muted ps-2'>Exciting Deals On Exclusive Brands</h3>
    <div className="d-flex mt-4 flex-wrap justify-content-between">
        {
            divaItems.length > 0 ? divaItems.map((ele)=>{
                return(
                    <div className="col-12 col-sm-6 col-md-3 col-lg-2 pb-4">
                    <div className="card">
                    <Link to={`/view/onlyBlock/${ele._id}`} className='link'><img src={ele.image} alt="Hot deals" className='deals-div1-cardimg' /></Link>
                    <div className="cart-heart-div">
                    <FontAwesomeIcon onClick={()=>favouriteToCart(ele)} icon={faHeart}  className={`cart-heart ${cartItems.some((e => e._id === ele._id)) ?`cart-heart-selected` :`cart-heart-default`} `}/>
                    </div>
                    <div className="card-title  text-dark">
                        <h5 className='title-over'>{ele.name}</h5>
                        <h6 className='text-muted'>{ele.offer}</h6>
                     </div>
                    </div>
                </div>
                )
            })
            : loadingImg.map((ele)=>{
                return (
                <div className="col-12 col-sm-6 col-md-3 col-lg-2 pb-4">
                <div className="card loading-opacity">
               <img src={`/assets/images/${ele.image}`} alt="Hot deals" className='deals-div1-cardimg' />
                  <div className="card-title text-dark">
                    <h4>{ele.title}</h4>
                    <h5 className='text-muted'>{ele.sub_title}</h5>
                 </div>
                </div>
            </div>
            )
            })
        }
    
                
    </div>
    </div>
    </div>
    
  )
}

export default HomePage
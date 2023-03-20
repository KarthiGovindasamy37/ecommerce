import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping,faCircleXmark,faMagnifyingGlass,faUser} from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import * as productActions from '../Redux/Reducers/ProductSlice'
import { bindActionCreators } from 'redux'
import { logout } from '../Redux/Reducers/LoginSlice'

function Navbar() {

  let {cartQuantity} = useSelector(state => state.cart.cart)
  let {categoryList,dropView,dropViewClose,navSearchValue,navSearchAlert} = useSelector(state => state.product)
  let {isLoggedOut} = useSelector(state => state.loginDetails)

  let dispatch = useDispatch()
  const { loadCategories,navSearchClear,setDropView,setDropViewClose,
    setNavSearchValue,setNavSearchAlert } = bindActionCreators(productActions,dispatch)

  let navigate = useNavigate()

  useEffect(() => {
    if(navSearchValue.length > 0){
     loadCategories(navSearchValue)
    }
   },[navSearchValue])

   useEffect(()=>{
     if(isLoggedOut){
      navigate("/")
      toast.info("User logged out",{toastId:Math.random()})
     }
   },[isLoggedOut])

   const validateSearchValue = (value) =>{
    if(value.length > 0){
      if(value.charCodeAt(0) === 32){

      }else if(value.charCodeAt(value.length - 1) === 32 && value.charCodeAt(value.length - 2) === 32){

     }else{
      let regexp = new RegExp(/^[a-z\s]*$/,"i")

      if(regexp.test(value)){
        setNavSearchValue(value)
        setNavSearchAlert(false)
      }else{
        setNavSearchAlert(true)
      }
     }
 }else{
  setNavSearchValue("")
 }
}
  
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light nav-bg fixed-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand fw-bold sitename" ><img src="/assets/images/diva.png" className='logo' alt="diva logo" /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse ms-2" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown ms-lg-4">
                <a className=" dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Products
                </a>
                <ul className="dropdown-menu shadow-lg bg-body rounded" aria-labelledby="navbarDropdown">
                  <li><Link to="/products/eyeLiner" className='dropdown-item' >Eye Liner</Link></li>
                  <li><Link to="/products/eyebrowPencil" className='dropdown-item' >Eyebrow Pencil</Link></li>
                  <li><Link to="/products/lipstick" className="dropdown-item" >Lipstick</Link></li>
                  <li><Link to="/products/lipGloss" className="dropdown-item" >Lip Gloss</Link></li>
                  <li><Link to="/products/lipLiner" className="dropdown-item" >Lip Liner</Link></li>
                  <li><Link to="/products/lipBalm" className="dropdown-item" >Lip Balm</Link></li>
                  <li><Link to="/products/outfit" className="dropdown-item" >Outfit</Link></li>
                  <li><Link to="/products/womenShoe" className="dropdown-item" >Women's Shoe</Link></li>
                  <li><Link to="/products/kidWear" className="dropdown-item" >Kids Wear</Link></li>
                  <li><Link to="/products/kidShoe" className="dropdown-item" >Kids Shoe</Link></li>
                  </ul>
              </li>             
              <li className="nav-item dropdown ms-lg-5">
                <a className=" dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Brands
                </a>
                <ul className="dropdown-menu shadow-lg bg-body rounded" aria-labelledby="navbarDropdown">
                  <li><Link to="/products/lakme" className="dropdown-item" >Lakmé</Link></li>
                  <li><Link to="/products/maybelline" className="dropdown-item" >Maybelline</Link></li>
                  </ul>
              </li>
              
              <li className="nav-item ms-lg-5 ps-lg-5 mt-2 mt-lg-0">
                <div className="input-field">
              <input type="text" className='search-field' placeholder="Search for product"
              value={navSearchValue}
              onFocus={()=>{setDropView()}} 
              onBlur={() =>{setDropView();setNavSearchAlert(false)}}
              onChange={(e)=>validateSearchValue(e.target.value)}
              />
              {
                navSearchAlert ?
                <div className='nav-search-error'>Characters only allowed</div>
                : null
              }
              {
                !dropViewClose ? categoryList.length > 0 ?
              <div  className={` shadow-lg ${dropView ? `drop-dis`:`drop`} ${navSearchAlert ? `drop-top` :``}`}>
                {
                  categoryList.map((e)=>{
                    return <Link to={`/products/${e.collection}`} 
                    onClick={()=>{setDropViewClose(true);setNavSearchValue("");setNavSearchAlert(false)}} 
                    className='search-list list-item-div' >
                      <FontAwesomeIcon icon={faMagnifyingGlass} className="magnify"/> <p className='ps-2 m-0'>{e.name}</p></Link>
                    
                  })
                }
                
              </div>
              : null
              :null              
             }
             {
              navSearchValue.length > 0 ?
              <FontAwesomeIcon icon={faCircleXmark} className="xmark" 
              onClick={()=>{navSearchClear()}}/>
              : null
             }
              
              </div>
              </li>
            </ul>
            <div className="signup-div mt-3 mt-lg-0">
                <div className='mt-1 cart-div'>
                <Link to="/cart" className="link"><FontAwesomeIcon icon={faCartShopping} size="2x" /></Link>
                <div className="cart-qty text-center">{cartQuantity}</div>
                </div>
                <div className="log-btn-div">
                <Link to="/login" className=" link text-white "><div className='log-btn log-div'>Login</div></Link>
                </div>
                <div className='user-icon-div me-lg-3 mt-2 mt-lg-1 pb-2' >
                <FontAwesomeIcon className='user-icon' icon={faUser} size="2x"/>
                <div className="user-drop shadow">
                  <div className="drop-contents">
                 <h6 className='text-dark ps-2 pt-2'>New customer? <Link to="/signup" className=" link signup-drop ps-1">Sign Up</Link></h6>
                 <hr className='mb-0'/>
                 <Link to='/orders' className='link'><div className="order pt-1 pb-1 ps-2">Your Orders </div></Link>
                 <div onClick={()=>{dispatch(logout())}} className="logout-div text-danger">Sign out</div>
                
                </div>
                </div>
                </div>
                

            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
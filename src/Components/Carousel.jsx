import React from 'react'

function Carousel() {

    let carouselItem=[
        {
            image:"ecom-offer3.jpg",
            alter:"sale offer"
        },
        {
            image:"ecom-offer4.jpg",
            alter:"sale offer"
        },
        {
            image:"ecom-offer7.jpg",
            alter:"sale offer"
        },
        {
            image:"ecom-offer9.jpg",
            alter:"sale offer"
        },
        {
            image:"ecom-offer10.jpg",
            alter:"sale offer"
        },{
            image:"ecom-offer11.jpg",
            alter:"sale offer"
        },{
            image:"ecom-offer6.jpg",
            alter:"sale offer"
        }
        
    ]
  return (
    <div>
         <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
  <div class="carousel-indicators">
    {
        carouselItem.map((ele,i)=>{
            return(
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={i} class={`${i === 0 ? `active` : ``}`} aria-current={`${i === 0 ? `true` : ``}`}  aria-label={`Slide ${i+1}`}></button>
            )
        })
    }
  </div>
  <div class="carousel-inner">
    {
        carouselItem.map((ele,i)=>{
            return(
                <div class={`carousel-item ${i === 0 ? `active` : ``}`}>
                <img src={`/assets/images/${ele.image}`} class="d-block w-100 carousel-img" alt={ele.alter}/>
              </div>
            )
        })
    }
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</div>
  )
}

export default Carousel
import React from 'react'
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";
import workshop from '../../assets/img/work1.jpg';
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_WORKSHOP } from "../../graphql";
import { useState } from 'react';


const WorkshopSlider = () => {
    const { loading, data } = useQuery(GET_ALL_WORKSHOP);
    const [responsive,setResponsive] = useState({
       
        0 : {
           items:1
        },
      
        570 : {
          items:1
        },
        
        768 : {
           items:1
        }
    })
    return (
        <div className="workshop-slider d-none d-md-block">
            <div className="container">
                {data && (<OwlCarousel className="owl-theme" loop margin={30} nav items={1} responsive={responsive} >
  
                   {data &&
                        data.getALLActiveWorkshopInHome.length > 0 &&
                        data.getALLActiveWorkshopInHome.map((workshop) => (
                            <div className="item">

                                <div className="final-workshop">
                                    <img src={workshop.picture} alt="" />
                                    <div className="final-workshop-content">
                                        <h2>{workshop.title}</h2>
                                        <p>{workshop.shortDescription}</p>
                                        <a href={`/#/course/${workshop.id}`}>اطلاعات بیشتر</a>
                                    </div>
                                </div>


                            </div>


                        ))}



                </OwlCarousel>)}

            </div>
        </div>
    )
}

export default WorkshopSlider

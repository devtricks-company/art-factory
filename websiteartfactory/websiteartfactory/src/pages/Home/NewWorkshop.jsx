import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_WORKSHOP } from "../../graphql";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const NewWorkshop = () => {
  const { loading, data } = useQuery(GET_ALL_WORKSHOP);
 
  return (
    <div className="new-workshop w-100">
      <h2>کارگاه های آموزشی</h2>
      <span></span>
      {data && (
      <OwlCarousel className="owl-theme" navText="this is test" autoplay={3000} loop margin={10} nav items={1} animateOut="fadeOut"
      >
          {data &&
            data.getALLActiveWorkshopInHome.length > 0 &&
            data.getALLActiveWorkshopInHome.map((workshop) => (
             <div className="item">
               <img src={workshop.picture} alt={workshop.title}/>
               <div className="overlay-workshop">
                   <div className="ov-wrap">
                   <h4>{workshop.title}</h4>
                   <p>{workshop.teacherName} {workshop.teacherNameTwo ? `و ${workshop.teacherNameTwo}` : null} </p>

                   </div>
               </div>
             </div>
             
             
            ))}
        </OwlCarousel>
      )}
    </div>
  );
};

export default NewWorkshop;

import React from 'react'
import { GET_ALL_WORKSHOP } from "../../graphql";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';

const WorkshopMobile = () => {
    const { loading, data } = useQuery(GET_ALL_WORKSHOP);

    return (
        <div className="mobile-workshop d-block d-md-none">
            <div className="container">
                {data && (<OwlCarousel className="owl-theme" loop margin={30} nav items={1}>

                    {data &&
                        data.getALLActiveWorkshopInHome.length > 0 &&
                        data.getALLActiveWorkshopInHome.map((workshop) => (
                            <div className="item">

                                <div className="card">
                                    <div className="card-body">
                                        <img src={workshop.picture} alt={workshop.title}/>
                                        <div className="card-content">
                                            <h3>{workshop.title}</h3>
                                            <p><span>{workshop.teacherName}</span>  
                                            {workshop.teacherNameTwo ?
                                                <span> و {workshop.teacherNameTwo}</span>
                                            : null}</p>
                                            <a href={`/#/course/${workshop.id}`} className="card-button mt-3">جزییات کارگاه</a>
                                        </div>
                                    </div>
                                </div>


                            </div>


                        ))}



                </OwlCarousel>)}

            </div>
        </div>
    )
}

export default WorkshopMobile

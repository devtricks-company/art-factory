import React from 'react'
import FinalHeader from '../../components/finalHeader/FinalHeader'
import Covid from '../../components/Covid/Covid'
import FinalCourse from '../../components/finalCourse/FinalCourse'
import WorkshopSlider from '../../components/workshopSlider/WorkshopSlider'
import LifeArt from '../Home/LifeArt';
import WorkshopMobile from '../../components/workshopmobile/WorkshopMobile'


const FinalHome = () => {
    return (
        <div className="final-home">
           <FinalHeader />
           <Covid />
           <FinalCourse />
           <WorkshopSlider />
           <WorkshopMobile/>
           <LifeArt />
        </div>
    )
}

export default FinalHome

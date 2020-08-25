import React from 'react'
import HeaderHome from './HeaderHome'
import HomePath from './HomePath'
import HomeCourse from './HomeCourse'
import NewHome from './NewHome'
import NewCourse from './NewCourse'
import NewWorkshop from './NewWorkshop'
import NewEvents from './NewEvents'
import LifeArt from './LifeArt'
import Footer from '../../components/footer/Footer'

const Home = () => {
    return (
        <div className="home-page">
            {/* <HeaderHome />
            <HomePath />
            <HomeCourse /> */}
            <NewHome />
            <NewCourse />
            <NewWorkshop />
            <NewEvents />
            <LifeArt />
            
          
            

        </div>
    )
}



export default Home

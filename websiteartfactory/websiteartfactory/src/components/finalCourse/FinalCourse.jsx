import React from 'react'
import { GET_ALL_ACTIVE_IN_HOME } from '../../graphql';
import { useQuery } from '@apollo/react-hooks';
import HomeCourseItem from '../../pages/Home/HomeCourseItem';

const FinalCourse = () => {
    const { loading, data } = useQuery(GET_ALL_ACTIVE_IN_HOME);

    if (data) {
        console.log(data.getAllActiveCourseInHome)
    }
    return (
        <div className="final-course">
            <div className="container">
                <h2>جدیدترین دوره های آموزشی در آرت فکتوری</h2>
                <p>دوره های آموزشی آرت فکتوری با همراهی متخصصان, هنرمندان و مدیران موفق در محیطی متفاوت برگزار می گردد</p>
                <div className="row">
                    {data && data.getAllActiveCourseInHome.length > 0 && data.getAllActiveCourseInHome.map((course, index) => {

                        if (index == 0) { 
                            return <div className="col-12 w-100 course-first-wrapper">
                                <a href={`/#/course/${course.id}`}>
                                <img src={course.picture} alt={course.title}/>
                                <div className="overlay-course-big">
                                    <div className="inner-wrapper">
                                        <p>دوره آموزشی</p>
                                        <h2>{course.title}</h2>
                                        <p className="d-none d-lg-block">{course.shortDescription}</p>
                                    </div>
                                </div>
                                </a>
                            </div>
                           
                        }else{
                            return <div className="col-12 col-lg-4 course-first-small p-2">
                                <a href={`/#/course/${course.id}`}>
                            <img src={course.picture} alt={course.title}/>
                            <div className="overlay-small-wrapper">
                                   <div>
                                   <p>دوره آموزشی</p>
                                     <h2>{course.title}</h2>
                                   </div>
                            </div>
                            </a>
                        </div>
                       
                        
                        }
                    }


                    )}
                </div>
            </div>

        </div>
    )
}


export default FinalCourse

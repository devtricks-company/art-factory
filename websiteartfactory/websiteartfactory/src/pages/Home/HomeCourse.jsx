import React from 'react';
import {GET_ALL_ACTIVE_IN_HOME} from '../../graphql';
import { useQuery } from '@apollo/react-hooks';
import HomeCourseItem from './HomeCourseItem';


const HomeCourse = () => {
    const {loading,data} = useQuery(GET_ALL_ACTIVE_IN_HOME);

    return (
        <div className="home-course">
            <div className="container">
                <h6>دوره ها پر بازدید</h6>
                <h2>دوره های آموزشی در آرت فکتوری</h2>
                <div className="row mt-5">
                    {data && data.getAllActiveCourseInHome.length > 0 && data.getAllActiveCourseInHome.map( course => 

                            <HomeCourseItem key={course.id} course={course} />

                    )}
                </div>
            </div>
        </div>
    )
}

export default HomeCourse

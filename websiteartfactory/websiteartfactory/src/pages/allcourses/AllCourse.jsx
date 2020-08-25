import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import { GiArmorUpgrade } from 'react-icons/gi';
import { useState } from 'react';
import FinalHeader from '../../components/finalHeader/FinalHeader';
import query from 'query-string';
import { useMemo } from 'react';

const AllCourse = (props) => {

    const qs = query.parse(props.location.search);

    const [group,setGroup] = useState(qs.category ? qs.category: '');
    const {loading,data} = useQuery(GET_ALL_ACTIVE_GROUP);
    const {loading:getAllLoading,data:GetAllCourse} = useQuery(GET_ALL_ACTIVE_COURSE,{
        variables:{groupID:group}
    });

    useMemo(() => {
      if(data){
        setGroup(qs.category ? qs.category: '');
        if(window.innerWidth < 768){
          window.scrollTo(0,1000);
        }
       
      }
    },[data])

    

    const clickChangeGroupHanlder = id => {
        setGroup(id);
    }

    const clickTransHanlder = id => {
            props.history.push(`/course/${id}`)
    }


    return (
      <>
      <FinalHeader />
        <div className="all-courses">
            <div className="container">
            <aside className="aside-category">
                   <h6>گروه ها </h6>
                   {data && data.getAllActiveGroup.length > 0 && data.getAllActiveGroup.map(group => 
                    <p onClick={() =>  clickChangeGroupHanlder(group.id)}><span>{group.name}</span></p>
                    )}
                   
               </aside>
               <section className="course-section  text-right py-0 px-5">
                   <h3> دوره ها ، کارگاه ها و رویداد های آرت فکتوری</h3>
                    <div className="row">
                      {GetAllCourse && GetAllCourse.getAllActiveCourseByGroup.length > 0 && GetAllCourse.getAllActiveCourseByGroup.map(course => 
                        <div className="col-12 col-lg-6 course-details" onClick={() => clickTransHanlder(course.id)}>
                            <img src={course.picture} alt={course.title}/>
                            <div className="description-overlay">
                                <h4>{course.title}</h4>
                                
                            </div>
                        </div>
                        )}
                   </div>
               </section>
              
            </div>
        </div>
        </>
    )
}

const GET_ALL_ACTIVE_GROUP = gql`
query{
  getAllActiveGroup{
    id
    name
    active
  }
   
}
`;


const GET_ALL_ACTIVE_COURSE = gql`
query  getAllActiveCourseByGroup($groupID:ID!) {
  getAllActiveCourseByGroup(groupID:$groupID){
    id
    title
    picture
    group

  }

}

`;
export default AllCourse

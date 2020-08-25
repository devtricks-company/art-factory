import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ImageGallery from 'react-image-gallery';
import { useMemo } from 'react';
import {GET_ALL_TEACHER_GALLAREY} from '../../graphql';
import { useState } from 'react';
import { useEffect } from 'react';

const Teacher = (props) => {

    useEffect(() => {
        window.scrollTo(0,0);
    },[])
    const { loading, data } = useQuery(GET_ALL_ACTIVE_GROUP);
    const { loading: loadingTeacher, data: teacherData } = useQuery(GET_A_TEACHER, {
        variables: { id: props.match.params.id }
    })
    const {loading:loadGallery,data:galleryData} = useQuery(GET_ALL_TEACHER_GALLAREY,{
        variables:{teacherID:props.match.params.id}
    })
    const [galleryState,setGalleryState] = useState(null);
    const [images,setImages] = useState([]);

    useMemo(() => {
        if(galleryData){
                setGalleryState(galleryData.getAllGalleryTeacher);
                const imagesArray = galleryData.getAllGalleryTeacher.map(img => {

                    return {
                        original:img.picture,
                        thumbnail:img.picture
                    }
                });

                setImages(imagesArray);
        }



    },[galleryData])
    return (
        <div className="teacher">
            <div className="row w-100">
                <div className="col-12 col-lg-2 sidebar-cate">
                    <p> گروه های آموزشی</p>

                    {data && data.getAllActiveGroup.length > 0 && data.getAllActiveGroup.map(group =>
                        <p><a href={`/#/allcourse?category=${group.id}`}>{group.name}</a></p>

                    )}
                </div>
                <div className="col-12 col-lg-10 teacher-content">
                   
                    <div className="imageTeacher mt-5">
                        <img src={teacherData && teacherData.getATeacher.picture} alt="" />
                    </div>
                    <div className="content-teacher-text pr-5">
                        <h2>{teacherData && teacherData.getATeacher.name}</h2>
                        <p className="mt-5 w-100 w-lg-50  " dangerouslySetInnerHTML={{__html:teacherData && teacherData.getATeacher.resume}}>
                            
                        </p>
                    </div>
                    
                </div>
                <div className="gallery-teacher mx-auto mt-5 w-75">
                    <ImageGallery items={images} />;
                    </div>
            </div>
        </div>
    )
}
const GET_A_TEACHER = gql`

query getATeacher($id:ID!) {
  getATeacher(id:$id){
    id
    name
    resume
    picture
    
  }
}

`;
const GET_ALL_ACTIVE_GROUP = gql`
query{
  getAllActiveGroup{
    id
    name
    active
  }
   
}
`;
export default Teacher




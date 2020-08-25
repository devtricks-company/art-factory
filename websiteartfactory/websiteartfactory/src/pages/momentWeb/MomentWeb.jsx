import React from 'react'
import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useEffect } from 'react';
import { useMemo } from 'react';
const MomentWeb = () => {

    const [light,setLight] = useState({
        photoIndex:0,
        isOpen:false
    })

    const [images,setImages] = useState([]);
    const { loading, data } = useQuery(GET_ALL_MOMENTS);
    const clickHandler = e => {
        e.preventDefault();
        setLight({...light,isOpen:true});
    }

    useMemo(() =>{
        if(data){
            setImages(data.getAllMoments.map(moment => {
                return moment.picture;
            }))
        }
    },[data]);
    return (
        <div className="moment-web">
            <div className="overlay"></div>
            <div className="container">
                <div className="row">
                {data && data.getAllMoments.length > 0 && data.getAllMoments.map(moment =>
                    <div className="col-12 col-lg-3">
                       <a href="#" onClick={clickHandler}><img src={moment.picture} alt="" className="img-fluid" />
                        <p>{moment.description}</p></a> 
                    </div>
                )}
                 {light.isOpen && (
          <Lightbox
            mainSrc={images[light.photoIndex]}
            nextSrc={images[(light.photoIndex + 1) % images.length]}
            prevSrc={images[(light.photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setLight({...light,isOpen:false})}
            onMovePrevRequest={() =>
              setLight({...light,
                photoIndex: (light.photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              setLight({...light,
                photoIndex: (light.photoIndex + 1) % images.length,
              })
            }
          />
        )}
                </div>
            </div>
        </div>
    )
}
const GET_ALL_MOMENTS = gql`
query{
    getAllMoments{
    id
    picture
    description
    createAt
    active
    showInHome
  }
}
`;
export default MomentWeb

import React,{useMemo} from 'react';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import Lightbox from 'react-image-lightbox';
const LifeArt = () => {
    const [responsive, setResponsive] = useState({
        0: {
            items: 1
        },
        576: {
            items: 1
        },
        768: {
            items: 2
        },
        1280: {
            items: 4
        }


    })
    const [light,setLight] = useState({
        photoIndex:0,
        isOpen:false
    })
    const [images,setImages] = useState([]);
    const { loading, data } = useQuery(GET_ALL_MOMENTS_HOME);
    if (data) {
        console.log(data.getAllMomentActiveShowHome);
    }

    useMemo(() =>{
        if(data){
            setImages(data.getAllMomentActiveShowHome.map(moment => {
                return moment.picture;
            }))
        }
    },[data]);
    const clickHandler = e => {
        e.preventDefault();
        setLight({...light,isOpen:true});
    }


    return (
        <div className="life-art">
            <div className="container">
                <h2>لحظات آرت فکتوری</h2>
                <span></span>
                <div className="mt-3">
                    {data && (<OwlCarousel className="owl-theme" loop margin={30} items={4} nav={true} responsive={responsive}>


                        {data && data.getAllMomentActiveShowHome.length > 0 && data.getAllMomentActiveShowHome.map(moment =>
                            <div className="item">
                                <a href="#" onClick={clickHandler}>
                                <img src={moment.picture} alt="" />
                                <p>{moment.description}</p>
                                </a>
                            </div>
                        )}
                    </OwlCarousel>)}
                </div>
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
    )
}
const GET_ALL_MOMENTS_HOME = gql`
query{
  getAllMomentActiveShowHome{
    id
    picture
    description
    createAt
    active
    showInHome
  }
}
`;
export default LifeArt

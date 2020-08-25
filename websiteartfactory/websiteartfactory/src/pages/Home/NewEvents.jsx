import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { GET_ALL_EVENTS_IN_HOME } from "../../graphql";
import { useQuery } from "@apollo/react-hooks";

const NewEvents = () => {
  const { loading, data } = useQuery(GET_ALL_EVENTS_IN_HOME);
  return (
    <>
      <div className="new-events d-none d-lg-block">
        <div className="row w-100 m-0">
          <div className="col-9 content">
            {data && (
              <OwlCarousel className="owl-theme" loop margin={10} nav items={1} animateOut="fadeOut"
              >
                {data &&
                  data.getAllActiveEventsInHome.length > 0 &&
                  data.getAllActiveEventsInHome.map((events) => (
                    <div className="item">
                      <div className="img-content">
                        <img src={events.picture} alt="" />
                      </div>

                      <div className="content-description">
                        <h2 className="text-right">{events.title}</h2>
                        <p className="mt-5 ">{events.shortDescription}</p>
                        <div className="events-teacher">
                          <img src={events.teacherPic} alt="" />
                        </div>

                      </div>
                    </div>
                  ))}
              </OwlCarousel>
            )}
          </div>
          <div className="col-3 blank"></div>
        </div>
      </div>
      <div className="mobile-events">
        {data && (<OwlCarousel loop margin={10} nav items={1}>
               {data && data.getAllActiveEventsInHome.length > 0 && data.getAllActiveEventsInHome.map(evetns => 
                <div className="item">
                  
                </div>
                )}
        </OwlCarousel>)}

      </div>
    </>
  );
};

export default NewEvents;

import React from 'react';
import BackgroundVideo from '../../assets/img/bg-video.mp4';
import logo from '../../assets/img/logo2.png';

const NewHome = () => {
    return (
        <div className="new-home">
            <video autoPlay loop>
                <source src="http://artfactoryedu.com/assets/video/all.mp4" />
            </video>
            <div className="overlay">
                <div className="text-center inner-container">
                    <div className="container">
                    
                    <h1>اینجا آرت فکتوری!</h1>
                    <span></span>
                  
                   


                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewHome

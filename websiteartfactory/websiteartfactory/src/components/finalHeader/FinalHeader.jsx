import React from 'react'
import bgVideo from '../../assets/img/gnomoon.mp4';
import $ from 'jquery';
import { useState } from 'react';
import { useEffect } from 'react';
import header1 from '../../assets/img/header1.jpg';
import header2 from '../../assets/img/header2.jpg';
import header3 from '../../assets/img/header3.jpg';
import about from '../../assets/img/about.png';
import life from '../../assets/img/life.png';
import bgheader from '../../assets/img/bgheader.jpg'
import banner from '../../assets/img/Banner.gif';
import Typed from 'typed.js';

const FinalHeader = () => {
    const [open, setOpen] = useState(false);
    const changeNavColor = () => {
        if (open) {
            document.querySelector('.navbar').style.background = '#252525'
        } else {
            document.querySelector('.navbar').style.background = 'transparent'
        }
    }
    useEffect(() => {
        $(document).on('shown.bs.dropdown', function () {
            document.querySelector('.navbar').style.background = '#252525';
           
        })
        $(document).on('hidden.bs.dropdown	', function () {
            document.querySelector('.navbar').style.background = 'unset';
        })

        var typed6 = new Typed('#typed-title', {
            strings: ['اینجا آرت فکتوری'],
            typeSpeed: 80,
            backSpeed: 0,
            loop: false
          });

          window.scrollTo(0,0);

    }, [])
    const clickDropHanlder = e => {

    }
    return (
        <div className="final-header">
            <div className="video-wrapper">
                {/* <video autoPlay loop class="d-none d-lg-block">
                    <source src="http://artfactoryedu.com/assets/video/all.mp4" />
                </video> */}
                 <img src={banner} alt="" className="w-100 d-none d-lg-block" style={{height:"520px"}}/>
                <img src={bgheader} alt="" className="w-100 d-block d-lg-none" style={{height:"520px"}}/>
            </div>
            <div className="video-overlay">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
                        <ul className="navbar-nav collapse navbar-collapse" id="navbarSupportedContent">
                            <li className="nav-item">
                                <a href="#" class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={clickDropHanlder}> کارخانه ما </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <ul id="my-company">
                                        <li>
                                            <a href="/#/about">
                                                <img src={about} alt="" />
                                                <h4>  درباره ما </h4>
                                                <p>  این جا مکانی برای هنرمندان، مدیران‌‌و‌‌متفکران است. این جا آرت‌فکتوری است. </p>
                                            </a>


                                        </li>
                                       
                                        <li>
                                            <a href="/#/moment">
                                                <img src={life} alt="" />
                                                <h4>لحظات در آرت فکتوری</h4>
                                                <p>تماشای لحظاتی از آرت فکتوری</p>
                                            </a>

                                        </li>
                                    </ul>
                                </div>
                            </li>
                            {/* <li className="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={clickDropHanlder}>
                                    کلاس های آرت فکتوری
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <ul className="nav-course">
                                        <li>
                                            <a href="/#/allcourse">
                                                <img src={header1} alt="" />
                                                <h4>دوره های آموزشی</h4>
                                                <p>دروره های آرت فکتوری در فضایی کاملا مناسب برای شما برگزار میگردد</p>
                                            </a>


                                        </li>
                                        <li>
                                            <a href="/#/allcourse">
                                                <img src={header2} alt="" />
                                                <h4> کارگاهای آموزشی</h4>
                                                <p>دروره های آرت فکتوری در فضایی کاملا مناسب برای شما برگزار میگردد</p>
                                            </a>

                                        </li>
                                        <li>
                                            <a href="/#/allcourse">
                                                <img src={header3} alt="" />
                                                <h4>  رویدادها</h4>
                                                <p>دروره های آرت فکتوری در فضایی کاملا مناسب برای شما برگزار میگردد</p>
                                            </a>

                                        </li>
                                    </ul>
                                </div>

                            </li> */}
                            <li className="nav-item"><a href="/#/allcourse" className="nav-link">دوره-کارگاه-رویداد</a></li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">دوره های آنلاین</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">  کلاب آرت فکتوری</a>
                            </li>
                            <li className="nav-item d-block d-lg-none">
                                <a href="/#/contact" className="nav-link">تماس با ما</a>
                            </li>
                            
                        </ul>
                    </nav>
                   <div className="overlay-text-container">
                           <div>
                           <h1 id="typed-title"></h1>
                             <p>اینجا مکانی برای هنرمندان، مدیران ‌‌و ‌‌متفکران است. این جا آرت‌فکتوری است.</p>
                           </div>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default FinalHeader

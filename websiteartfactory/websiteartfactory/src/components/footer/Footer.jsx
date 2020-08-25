import React from "react";
import logo from "../../assets/img/logo.png";
import enamad from "../../assets/img/enamad.png";
import samandehi from '../../assets/img/samandehi.png';
import {FiInstagram,FiYoutube} from 'react-icons/fi';
import {FaTwitch,FaTelegramPlane} from 'react-icons/fa';


const Footer = () => {
  return (
      <>
    <footer className="footer">
      <div className="container">
        <div className="text-center la-container">
        <div className="image">
            <img src={logo} alt="art factory" className="mx-auto" />
            
          </div>
          <div class="footer-address">
            <p className="text-right address">
              آدرس : شیراز - پل معالی آباد - ساختمان الف - طبقه 9
            </p>
            <p className="tel">تلفن : 07136231541</p>
            <p className="email">پست الکترونیکی : info@artfactoryedu.com</p>
          </div>
         
        </div>
        <div className="menu-wrapper w-50 text-right">
          <ul className="menu  text-right">
           
            <li>
              <a href="#/about"> درباره ما</a>
            </li>
            <li>
              <a href="/#/moment"> لحظات آرت فکتوری</a>
            </li>
            <li>
              <a href="/#allcourse">  دوره-کارگاه-رویداد</a>
            </li>
            <li>
              <a href="#"> کلاب آرت فکتوری </a>
            </li>
            <li>
              <a href="/#/contact"> تماس با ما</a>
            </li>
            
          </ul>
        </div>
        <div className="w-10 w-lg-25 text-right namad">
        <a referrerpolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=141194&amp;Code=vN537evqH5EGS9qKebuD"><img referrerpolicy="origin" src="https://Trustseal.eNamad.ir/logo.aspx?id=141194&amp;Code=vN537evqH5EGS9qKebuD" alt="" style={{cursor:"pointer"}} id="vN537evqH5EGS9qKebuD"/></a>
        <img id='jxlzesgtwlaowlaooeukjxlzrgvj' style={{cursor:"pointer"}} onclick={window.open("https://logo.samandehi.ir/Verify.aspx?id=1044813&p=rfthobpdaodsaodsmcsirfthxlao", "Popup","toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")} alt='logo-samandehi' src='https://logo.samandehi.ir/logo.aspx?id=1044813&p=nbpdlymashwlshwlaqgwnbpdqfti'/>
        </div>
       
      </div>
    </footer>
    <div className="footer-bottom">
        <div className="text-center">
        Artfactory specializes in education for careers in art, design and business . ©ArtFactory 2019 — All rights reserved.
        <p className="text-center mt-4">
          <a href="https://instagram.com/artfactory_edu?igshid=1gb3r277kpurw">
              <FiInstagram style={{fontSize:"25px"}} />
          </a>
          <a href="https://telegram.me/artfactoryedu">
            <FaTelegramPlane style={{fontSize:"25px", marginLeft:"20px"}} />
          </a>
          <a href="https://www.youtube.com/channel/UCcTa1QzhNhKhkwYYxVymsxA/">
            <FiYoutube  style={{fontSize:"25px",marginLeft:"20px"}} />
          </a>
         
          <a href="https://www.twitch.tv/artfactoryedu">
            <FaTwitch style={{fontSize:"25px",marginLeft:"20px"}}/>
          </a>
        </p>
        </div>
    </div>
    </>
  );
};

export default Footer;

import React from 'react'
import { AiFillInstagram,AiFillYoutube } from 'react-icons/ai';
import {FaTelegramPlane,FaTwitch} from 'react-icons/fa';
const Contact = () => {
    
    return (
        <div className="contact">
            <div className="container pt-5">
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1733.0751828986918!2d52.47414135433301!3d29.686419915724542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xad8f517922d1646e!2sArt%20Factory!5e0!3m2!1sen!2s!4v1595165466070!5m2!1sen!2s" width="600" height="450" frameborder="0" style={{ border: "0" }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                    </div>
                    <div className="col-12 col-lg-6 text-right contact-content">
                        <h5>تماس با ما</h5>
                        <p >آدرس :  شیراز، پل معالی آباد، ساختمان الف، طبقه نهم</p>
                        <p >کد پستی : 7187785119</p>
                        <p >شماره تماس: 07136231541</p>
                        <p>ساعت کاری واحد اداری : همه روزه 9 صبح تا 9 شب</p>
                        <div className="text-right">
                            <a href=""><AiFillInstagram /></a>
                            <a href=""><FaTelegramPlane /></a>
                            <a href=""><AiFillYoutube /></a>
                            <a href=""><FaTwitch /></a>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact

import React from "react";
import HeaderImage from "../../assets/img/header-img.png";
const HeaderHome = () => {
  return (
    <div className="header-home-page">
      <div className="container">
        <div className="row">
          <div className="col-5 image-wrapper">
            <img src={HeaderImage} alt="" className="img-fluid" />
          </div>
          <div className="col-7 wrapper-content">
            <div className="content-container">
              <h1>
                در هر مکان و هر زمان با آرت فکتوری یاد بگیرید و مهارت خود را افزایش
                دهید
              </h1>
              <p>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
              </p>
              <div className="button-container mt-5">
                    <button className=" btn resgister-button">
                        ثبت نام
                    </button>
                    <button className="btn learn">
                        چی می خوای یاد بگیری
                    </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderHome;

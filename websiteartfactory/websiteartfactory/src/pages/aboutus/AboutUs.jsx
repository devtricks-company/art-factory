import React from 'react';
import behbahani from '../../assets/img/18.png';
import mjasame from '../../assets/img/12.png'
import mohavate from '../../assets/img/11.png';
;
const AboutUs = () => {
    return (
        <div className="about-us">
            <header id="about-header">

            </header>

            <section>
                <div className="container">
                    <h1>درباره آرت فکتوری</h1>
                    <p className="mt-3">این جا مکانی برای هنرمندان، مدیران ‌‌و ‌‌متفکران است.
                    این جا آرت‌فکتوری است. </p>
                    <p>آرت‌فکتوری یا کارخانه هنر با هدف فراهم کردن بستری برای پردازش اندیشه شکل‌گرفته است. بستری که در آن
                    به آموزش و هم فکری در زمینه های هنر، هنرهای دیجیتال، معماری، مدیریت کسب‌کار و فلسفه‌و‌تفکر، با استفاده از بهترین تجهیزات و
                          تکنولوژی روز، در محیطی متفاوت با همراهی متخصصان، هنرمندان و مدیران موفق پرداخته می‌شود. </p>

                    <div className="text-center img-wrapper-1">
                        <img src={behbahani}  alt="" className="img-fluid" />
                        <img src={mjasame}  alt="" className="img-fluid mt-3" />
                    </div>
                    <p className="mt-5">مجموعه‌ی ما واقع در شهر شیراز در‌طبقه نهم ، ساختمان الف ، شامل کارگاه کامپیوتر، آتلیه طراحی و معماری، استودیو عکاسی، استودیو مجسمه سازی‌ و‌ هنرهای تجسمی، استودیو کروماکی و سالن سخنرانی و نمایش فیلم می باشد.
                    کارخانه‌ها فضایی برای پردازش مواد و خلق محصول بدیع می‌باشند. در کارخانه ما هنر، هنر کسب درآمد و هنر اندیشیدن پردازش میشود.
آرت‌فکتوری حاصل قرار گرفتن نگاه های متفاوت با هدفی مشترک در کنار هم می‌باشد.</p>
                    <div>
                        <img src={mohavate} alt="" className="img-fluid" />
                    </div>

                </div>

            </section>

        </div>
    )
}

export default AboutUs

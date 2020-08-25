import React, { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  digitsArToFa,
  digitsArToEn,
  digitsEnToFa,
  digitsFaToEn,
  addCommas,
} from "persian-tools2";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { GET_ALL_PREFACTOR_STUDENT } from "../../graphql";
import AuthContext from "../../context/auth/authContext";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Switch from "@material-ui/core/Switch";

const PrefactorItem = (props) => {
  const { prefactor } = props;
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [open, setOpen] = React.useState(false);
  const [animation, setAnimation] = useState(true);
  const [rules, setRules] = useState(false);

  const [removePrefactor, { loading }] = useMutation(REMOVE_PREFACTOR, {
    update(_, result) {},
    onError(err) {
      console.log(err.graphQLErrors[0].message);
    },
    variables: { id: prefactor.id },
    refetchQueries: [
      {
        query: GET_ALL_PREFACTOR_STUDENT,
        variables: { studentID: user && user.id },
      },
    ],
  });
  const [loan,setLoan] = useState(false);

  const [redirectToPayment, { loading: LoadingPayment }] = useMutation(
    REDIRECT_PAYMENT,
    {
      update(_, result) {
        window.location.href = result.data.redirectToPayment;
      },
      onError(err) {
        console.log(err.graphQLErrors[0].message);
      },
      variables: {
        amount: loan ? parseInt(prefactor.detail.price) / 2 : parseInt(prefactor.detail.price) ,
        description: "pardakht az artfactory",
        email: "",
        mobile: user && user.mobile,
        redirect: `http://artfactoryedu.com/#/verify?studentName=${
          user && user.name
        }&studentLastName=${user && user.lastName}&courseName=${
          prefactor.course.title
        }&classcode=${prefactor.detail.classcode}&amount=${
          loan? parseInt(prefactor.detail.price) / 2 : prefactor.detail.price
        }&studentID=${user && user.id}&courseID=${
          prefactor.course.id
        }&detailID=${prefactor.detail.id}&prefactorID=${prefactor.id} `,
      },
    }
  );

 
  const handleClose = (e) => {
    setOpen(false);
  };
  const handleCloseRules = (e) => {
    setRules(false);
  };

  const removePrefactorHandler = (e) => {
    setOpen(true);
  };

  const confirmRemoveHandler = (e) => {
    setOpen(false);
    setAnimation(false);
    removePrefactor();
  };

  const paymentHanlder = (e) => {
    setRules(true);
  };

  const clickpaymentBankHandler = async (e) => {
    // const infoRegister ={
    //     amount: prefactor.detail.price,
    //     redirect:`http://localhost:3000/#/verify?studentName=${user && user.name}&studentLastName=${user && user.lastName}&courseName=${prefactor.course.title}&classcode=${prefactor.detail.classcode}&amount=${prefactor.detail.price}&studentID=${user && user.id}&courseID=${prefactor.course.id}&detailID=${prefactor.detail.id} `
    // }
    //   const link = await axios.post('https://artfactoryedu.com/bank/send',{infoRegister})
    //    window.location.href = link.data.link;

    redirectToPayment();
  };

  const ChangeLoanHanlder = e => {
    setLoan(!loan);
  }
  return (
    <>
      {prefactor ? (
        <CSSTransition
          in={animation}
          appear={true}
          timeout={500}
          unmountOnExit={true}
          classNames="prefactor_item-"
        >
          <div className="prefactor_item col-12 col-lg-3">
            <div className="card">
              <div className="card-body">
                <div className="prefactor_image">
                  <img
                    src={prefactor.course.picture}
                    alt={prefactor.course.title}
                  />
                </div>

                <div className="prefactor_title">
                  <h5>{prefactor.course.title}</h5>
                </div>
                
                <div className="prefactor_details">
                {prefactor.course.ghest ? <p>
                    آیا مایلیید اقساطی پرداخت کنید؟{" "}
                    <Switch
                    checked={loan}
                    onChange={ChangeLoanHanlder}
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </p> : null}
                  

                  <p>کد کلاس : {digitsEnToFa(prefactor.detail.classcode)}</p>
                  <p>{digitsEnToFa(prefactor.detail.startDate)}</p>
                  <p>{digitsEnToFa(prefactor.detail.days)}</p>
                  {!loan ? <p>
                    قیمت : {digitsEnToFa(addCommas(prefactor.detail.price))}{" "}
                    تومان{" "}
                  </p>:null}
                  {loan ? <p>مبلغ قابل پرداخت : { digitsEnToFa(addCommas(parseInt(prefactor.detail.price / 2)))  + " تومان"} </p>: null }
                  {loan ? <p>یک فقره چک به مبلغ {digitsEnToFa(addCommas(parseInt(prefactor.detail.price / 2)))  + " تومان"}  در تاریخ {digitsEnToFa('45')} روز بعد تحویل کارشناس دوره گردد</p>:null }
                </div>
                <div className="prefactor_payment">
                  {prefactor.payment ? (
                    <p className="prefactor_payment_state">
                      این فکتور پرداخت شده است
                    </p>
                  ) : (
                    <button
                      className="btn btn-info btn-block"
                      onClick={paymentHanlder}
                    >
                      پرداخت
                    </button>
                  )}
                </div>
                <span
                  className="prefactor-remove"
                  onClick={removePrefactorHandler}
                >
                  <FaTimes style={{ color: "red" }} />
                </span>
              </div>
            </div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="lg"
            >
              <DialogTitle id="alert-dialog-title"></DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <div>
                    <div class="svg-box">
                      <svg class="circular yellow-stroke">
                        <circle
                          class="path"
                          cx="75"
                          cy="75"
                          r="50"
                          fill="none"
                          stroke-width="5"
                          stroke-miterlimit="10"
                        />
                      </svg>
                      <svg class="alert-sign yellow-stroke">
                        <g transform="matrix(1,0,0,1,-615.516,-257.346)">
                          <g transform="matrix(0.56541,-0.56541,0.56541,0.56541,93.7153,495.69)">
                            <path
                              class="line"
                              d="M634.087,300.805L673.361,261.53"
                              fill="none"
                            />
                          </g>
                          <g transform="matrix(2.27612,-2.46519e-32,0,2.27612,-792.339,-404.147)">
                            <circle
                              class="dot"
                              cx="621.52"
                              cy="316.126"
                              r="1.318"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                  آیا مایلید این پیش فاکتور حذف شود؟
                </DialogContentText>
              </DialogContent>
              <DialogActions className="text-center">
                <div className="text-center w-100 mb-5">
                  <button
                    className="btn btn-danger "
                    onClick={() => setOpen(false)}
                  >
                    خیر{" "}
                  </button>
                  <button
                    className="btn btn-success ml-3"
                    onClick={confirmRemoveHandler}
                  >
                    بله مایلم
                  </button>
                </div>
              </DialogActions>
            </Dialog>
            <Dialog
              open={rules}
              onClose={handleCloseRules}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="lg"
            >
              <DialogTitle id="alert-dialog-title">
                {"قوانین و مقررات سایت"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {digitsEnToFa(
                    `
                هنرجو و متقاضی محترم؛
ضمن تشکر از شما برای شرکت و حضور در آموزشگاه آرت فکتوری، خواهشمندیم قوانین زیر را به دقت مطالعه کرده و سپس به ثبت نام در کلاس‌ها اقدام نمایید. بدیهی است پس از پذیرش قوانین، آرت فکتوری هیچ گونه مسئولیتی به جهت استثنا قائل‌شدن ندارد. علاوه بر این، این قوانین بر تمامی قوانین دولتی، غیر دولتی، خصوصی و سایر آموزشگاه های آزاد حاکم است. هرگونه اعلام پذیرش قوانین (خوانده شده و یا خوانده نشده بر اثر بی‌دقتی، بی‌حوصلگی و کمبود وقت شما)، خوانده شده و لازم الاجرا تلقی می‌گردد.` +
                      <br /> +
                      `
ماده اول : انتخاب عنوان و زمان دوره
1.	هنرجو موظف است قبل از ثبت نام در هر دوره‌ای، تحقیقات لازم و کامل از عنوان درسی و همچنین برنامه زمانبندی کلاس و تطابق برنامه زمانی کلاس با برنامه شخصی و تطابق عنوان کلاس با نیاز فردی خود را به عمل آورده، سپس اقدام به ثبت نام نماید. آرت فکتوری، هیچ گونه مسئولیتی در قبال نیاز و یا عدم نیاز افراد به دوره و همچنین هیچ مسئولیتی در قبال برنامه و زمان و یا تداخل کلاس با برنامه‌های دانشگاهی، فردی، کاری، سربازی، مهاجرتی و خانوادگی (و سایر موارد) افراد ندارد.` +
                      <br /> +
                      `
ماده دوم : نحوه پرداخت و تسویه
1.	در سایت آرت فکتوری، امکان پرداخت شهریه بصورت نقدی و اقساط وجود دارد. در صورتی که مایل به پرداخت به صورت قسطی هستید، حداکثر 72 ساعت مهلت دارید تا مابقی شهریه را بصورت چک تسویه حساب به آموزشگاه تحویل دهید. ارسال چک می‌تواند بصورت حضوری، پستی، پیک و یا حضور نماینده شما باشد. در صورت عدم ارسال چک در موعد مقرر، ثبت نام شما لغو و فرد دیگری جایگزین شما خواهد شد. در این صورت مبلغ اولیه شما طی 30 روز کاری مسترد می‌گردد. در این صورت هنرجو حق دارد تا در فصل بعد مجددا ثبت‌نام نماید و در نوبت بعدی ثبت می‌بایست کلیه فرآیند ثبت‌نام دوره را از ابتدا طی کند. قوانین ثبت‌نام تابع قوانین و ضوابط در زمان ثبت‌نام در فصل بعدی بوده و کلیه پیگیری‌ها در هر مرحله بر عهده هنرجو است. ` +
                      <br /> +
                      `
ماده سوم : قوانین عمومی مالی
1.	شهریه‌ای که هنرجو پرداخت می‌کند، قابل انتقال به فرد دیگری (چه در ترم جاری و چه در ترم‌های گذشته و آینده) نمی‌باشد.
2.	شهریه پرداخت شده هر کلاس، صرفا برای همان درس و در همان ترم خواهد بود. این شهریه قابل انتقال به درس دیگر و یا به ترم دیگری نمی‌باشد.` +
                      <br /> +
                      `
3.	شهریه هنرجو به هیچ عنوان قابل استرداد نمی‌باشد، مگر اینکه طبق بندهای اول، دوم و سوم از ماده چهارم با آن برخورد شود.
ماده چهارم : استرداد شهریه
` +
                      <br /> +
                      `
1.	از آنجایی که ظرفیت کلاسهای آرت فکتوری محدود بوده و ثبت‌نام هر فرد عملا منجر به تکمیل ظرفیت و عدم ثبت‌نام هنرجوی دیگری می‌شود، لذا در صورتی که بعد از تکمیل پرداخت بانکی در پروسه ثبت‌نام، از حضور در کلاس منصرف شوید و درخواست انصراف تا 45روز قبل از شروع دوره ارسال شود(کمتر و مساوی 45 روز و بیشتر از 10 روز)، 30 درصد از مبلغ کل شهریه شما کسر شده و مابقی طبق بندهای3و4 از ماده 4 مسترد می‌گردد. در صورتی که هنرجو قبل از 45 روز مانده به شروع کلاس (بیشتر از 45 روز)، از دوره انصراف دهد، کل مبلغ به وی مستر خواهد شد و استرداد شهریه تابع بندهای 3و4 از ماده 4 می‌باشد.
2.	توجه داشته باشید، کلیه انصراف‌هایی که تا 10 روز (کمتر و مساوی 10 روز) قبل از دوره ارسال شوند، استثنا بوده و در این شرایط هیچ مبلغی به هنرجو مسترد نخواهد شد.
3.	بدیهی است معیار تشخیص، بر پایه تاریخ تشکیل اولین جلسه کلاس است، لذا اگر هنرجو 5 روز مانده به کلاس اقدام به ثبت نام نماید، عملا 40 روز از این زمان را طی کرده است و شامل بند 2 از ماده 4 می‌شود و یا اگر 20 روز مانده به کلاس ثبت نام کند، عملا 25 روز از این زمان را طی کرده است و شامل بند 1 خواهد شد.
ماده پنجم : قوانین حضور در کلاس
` +
                      <br /> +
                      `
1.	هنرجو پس از ثبت‌نام در هر دوره، موظف است تا به صورت حضوری و منظم در کلاس ثبت‌نام شده، شرکت کرده و به بهترین نحو ممکن و طبق استانداردهای آرت فکتوری تمرینات خود را انجام دهد، آموزشگاه آرت فکتوری در قبال هنرجویانی که در انجام تمرینات کوتاهی می‌کنند، هیچ مسئولیتی ندارد و این اختیار را دارد تا از حضور هنرجو در سر کلاس درسی ممانعت بعمل آورد. ضمنا هیچ‌گونه گواهی برای پایان دوره این هنرجویان صادر نخواهد شد. ` +
                      <br /> +
                      `
2.	هنرجو موظف است تا برنامه‌های خود را طوری تنظیم نماید که دست‌کم 15دقیقه قبل از شروع کلاس در آموزشگاه حضور داشته باشد.
3.	مدرسین مجازند تا در مورد حضور یا حذف هنرجویانی که تمرین نمی‌کنند، تصمیم گیری نمایند. اختیار تصمیم گیری در مورد عدم حضور و حذف هنرجو در ادامه دوره، در دوره‌های مستقل به عهده مدرس و در رشته‌های آموزشی، به عهده Mentor است.
ماده ششم : قوانین و استاندارد آموزشی و حضور ` +
                      <br /> +
                      `
1.	زمان استاندارد تعیین شده توسط آموزشگاه آرت فکتوری برای حضور در کلاس بدین شرح است: حداقل زمان استاندارد برای درک مطلب هر جلسه: 3 برابر میزان ساعت حضور در هر جلسه (مثال : مثلا برای یک کلاس که در هفته 2 بار تشکیل می‌شود و هر جلسه آن 3 ساعت است، شما به حداقل 18 ساعت تمرین نیاز خواهید داشت) میزان زمان مورد تایید آرت فکتوری برای حرفه‌ای شدن در مقوله آموزشی: 5 برابر میزان ساعت حضور در هر جلسه؛ لذا خواهشمندیم در صورتی که وقت لازم برای تمرین ندارید، در کلاسهای آرت فکتوری ثبت نام نکنید. تمامی مسئولیت پیشرفت هنرجو، صرفا بر عهده شخص ثبت نام کننده خواهد بود.  ` +
                      <br /> +
                      `
ماده هفتم : قوانین حراست و لزوم حفاظت فیزیکی از تجهیزات
1.	آموزشگاه آرت فکتوری به عنوان یک مجموعه فرهنگی آموزشی ِغیرانتفاعی، غیر‌دولتی، غیرسیاسی و کاملا خصوصی، با سرمایه‌گذاری شخصی و مبتنی بر شهریه هنرجویان، از سال 1398 در ایران فعالیت می‌کند. لذا هر هنرجو موظف است تا نهایت تلاش خود را به عمل آورد تا با رعایت قوانین و همچنین مراقبت از تجهیزات، در پایداری این مجموعه تلاش کند تا آیندگان نیز بتوانند از این تجهیزات استفاده کنند و مجبور نباشند شهریه‌های بالایی برای کلاس‌ها بپردازند؛ در نتیجه تمامی مراقبت و تلاش شما برای نگهداری از هر نوع تجهیزاتی در آموزشگاه آرت فکتوری، بر روی شهریه و قوانین سخت گیرانه بر روی نسل بعدی تاثیری مستقیم دارد. لذا هر فرد موظف است نهایت کوشش خود را به عمل آورد تا این بستر حرفه‌ای، بتواند به افراد و نسل‌های بعدی نیز خدمت رسانی کند.
2.	از آنجایی که کلیه تجهیزات صرفا با مبلغ هنرجویان قبلی تهیه شده‌اند و بسیار حساس و آسیب پذیرند، لذا هر نوع خوردن و آشامیدن در سر کلاس ممنوع می‌باشد، و در صورتی که آسیبی به کامپیوترها برسد، کل مبلغ تعمیرات آن متوجه هنرجو خواهد بود. فضای بوفه آموزشگاه آرت فکتوری به جهت راحتی و استراحت افراد طراحی شده است.
3.	خودروی خود را جلوی درب پارگینگ و همچنین درب ورودی همسایگان پارک نکنید.
4.	در حفاظت و نظافت میز و صندلی خود کوشا باشید. چسباندن آدامس زیر میز و صندلی جز قوانین Vandalism محسوب می‌گردد. هر نوع فعالیتی که از بی‌دقتی هنرجو نشئت گرفته و یا جز دسته Vandalism قرار بگیرد، هنرجو را متوجه مبلغ‌های تعمیر و نظافت خواهد کرد.
5.	رعایت شئونات اسلامی، اخلاقی و اجتماعی و حضور در آموزشگاه با پوشش مناسب محیط آموزشی (خانم‌ها با مقنعه) الزامی می‌باشد.
`
                  )}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <div className="text-center">
                  <button
                    className="btn btn-success btn-block"
                    onClick={clickpaymentBankHandler}
                  >
                    قبول دارم
                  </button>
                </div>
              </DialogActions>
            </Dialog>
          </div>
        </CSSTransition>
      ) : null}
    </>
  );
};

const REMOVE_PREFACTOR = gql`
  mutation removePrefactor($id: ID!) {
    removePrefactor(id: $id)
  }
`;
const REDIRECT_PAYMENT = gql`
  mutation redirectToPayment(
    $amount: Int!
    $description: String!
    $email: String
    $mobile: String
    $redirect: String!
  ) {
    redirectToPayment(
      amount: $amount
      description: $description
      email: $email
      mobile: $mobile
      redirect: $redirect
    )
  }
`;
export default withRouter(PrefactorItem);

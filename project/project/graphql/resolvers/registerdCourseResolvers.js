const RegisterdCourse = require("../../model/RegisterdCourse");
const Detail = require('../../model/Detail');
const Prefactor = require('../../model/Prefactor');
const Course = require('../../model/Course');
const Student = require('../../model/Student');



const ZarinpalCheckout = require("zarinpal-checkout");

module.exports = {
  Query: {
    async  getAllRegisterStudent(_,{courseID,DetailID}){
    if(courseID == ''){
      const register = await RegisterdCourse.find();
      const studentDetails =  Promise.all(register.map(async studentRegister => {
          const course = await Course.findById(studentRegister.courseID);
          const detail = await Detail.findById(studentRegister.detailID);
          const student = await Student.findById(studentRegister.studentID);

          return{
            studentName:student.name + " " + student.lastName,
            studentMobile:student.mobile,
            courseTitle:course.title,
            classcode:detail.classcode,
            createAt:studentRegister.createAt,
            amount:studentRegister.amount,
            instaID:student.instaID
          }

      }));
      return studentDetails;
    }
    const register = await RegisterdCourse.find({courseID,detailID:DetailID});
    const studentDetails =  Promise.all(register.map(async studentRegister => {
      const course = await Course.findById(studentRegister.courseID);
      const detail = await Detail.findById(studentRegister.detailID);
      const student = await Student.findById(studentRegister.studentID);

      return{
        studentName:student.name + " " + student.lastName,
        studentMobile:student.mobile,
        courseTitle:course.title,
        classcode:detail.classcode,
        createAt:studentRegister.createAt,
        amount:studentRegister.amount,
        instaID:student.instaID
      }

  }));
  return studentDetails;
    }
  },
  Mutation: {
    async redirectToPayment(
      _,
      { amount, description, email, mobile, redirect }
    ) {
      const zarinpal = ZarinpalCheckout.create(
        "531538d6-5169-11ea-a46c-000c295eb8fc",
        false
      );
      const response = await zarinpal.PaymentRequest({
        Amount: amount,
        CallbackURL: redirect,
        Description: description,
        Email: email,
        Mobile: mobile,
      });

      if (response.status === 100) {
        console.log(response.url);
        return response.url;
      } else {
        return "";
      }
    },
    async verifyToPayment(
      _,
      { amount, authority, courseID, detailID, studentID,prefactorID }
    ) {
      const zarinpal = ZarinpalCheckout.create(
        "531538d6-5169-11ea-a46c-000c295eb8fc",
        false
      );
      const response = await zarinpal.PaymentVerification({
        Amount: amount, // In Tomans
        Authority: authority,
      });
      try {
        if (response.status !== 100) {
          throw new Error("مشکلی به وجود آمده");
        } else {
          
          const newRegisterdCourse = new RegisterdCourse({
            studentID,
            detailID,
            courseID,
            refID:response.RefID,
            createAt:Date.now(),
            amount

          });

          await newRegisterdCourse.save();

          const detail = await Detail.findById(detailID);
          detail.capacity = parseInt(detail.capacity) - 1 ;
          if(detail.capacity == 0){
              detail.register = false;
              detail.reserve = false;
          }
          await detail.save()
          const prefactor = await Prefactor.findById(prefactorID);
          prefactor.payment = true;

          await prefactor.save();

          return response.RefID;
        }
      } catch (error) {
        throw new Error("مشکلی به وجود آمده");
      }
    },
  },
};

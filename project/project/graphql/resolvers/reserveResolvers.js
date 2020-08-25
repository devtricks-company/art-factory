const Reserve = require('../../model/Reserve');
const Kavenegar = require('kavenegar');
const Student = require('../../model/Student');
const Course = require('../../model/Course');
const Detail = require('../../model/Detail');
const MelipayamakApi = require('melipayamak')

module.exports = {
    Query:{

    },
    Mutation:{
        async addReserve(_,{studentID,courseID,detailsID}){
            const reserve  = await Reserve.findOne({detailsID});
            if(reserve){
                throw new Error("نام شما قبلا در لیست رزرو های این کلاس ثبت شده است")
            }

            const newReserver = new Reserve({
                studentID,
                courseID,
                detailsID,
                createAt:Date.now()
            });

            await newReserver.save();

            const student = await Student.findById(studentID);
            const course = await Course.findById(courseID);
            const detail = await Detail.findById(detailsID);

            const api = Kavenegar.KavenegarApi({
                apikey: '764450764736442B744C466A705552766C64554E4C3578764F4676774D2F782F7A79584D733735522B68593D'
            });
            api.Send({
                message: `${student.name} ${student.lastName} به شماره ${student.mobile}  در دوره ${course.title} در کلاس به کد ${detail.classcode} رزرو کرد` ,
                sender: "10004346",
                receptor: "09380674550"
            },
                function(response, status) {
                console.log(response);
                console.log(status);
            });



           const username = "amirm.azarbashi";
           const password = "4280";
           const mapi = new MelipayamakApi(username,password);
           const sms = mapi.sms();
           const to = '09173188938';
           const from = "50001060680230";
          const text = `${student.name} ${student.lastName} به شماره ${student.mobile}  در دوره ${course.title} در کلاس به کد ${detail.classcode} رزرو کرد`;
          const isflash = false
            sms.send(to,from,text, isflash).then(res=>{
                //RecId or Error Number 
            }).catch(err=>{
    
            })
            return{
                ...newReserver._doc,
                id:newReserver.id
            }

        }
    }
}
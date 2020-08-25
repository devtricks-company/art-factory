const Student = require('../../model/Student');
const bcryptJs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const RegisterdCourse = require('../../model/RegisterdCourse');
const Course = require('../../model/Course');

module.exports = {
    Query:{
            async getAllStudentCourses(_,{studentID}){
                
                const registerdCourse = await RegisterdCourse.find({studentID});
                const fullRegisterd = Promise.all(registerdCourse.map(async cousreInfo => {
                    console.log(cousreInfo.courseID);
                    const course = await Course.findById(cousreInfo.courseID);
                    console.log(course);
                    return {
                        ...cousreInfo._doc,
                        id:cousreInfo.id,
                        courseTitle:course.title,
                        coursePicture:course.picture
                    }
                }))
                return fullRegisterd;
            },
          
    },
    Mutation:{
        async registerStudent(_,{name,lastName,mobile}){
            console.log(name)
            console.log(lastName);
            console.log(mobile);

                const student  = await Student.findOne({mobile});
                if(student){
                    throw new Error("شما قبلا ثبت نام کردید");
                }

               
                let studentNumber = "99101";
                const lastStudent = await Student.find().sort({createAt:-1}).limit(1);
                if(lastStudent[0]){
                    studentNumber = parseInt(lastStudent[0].studentNumber) + 1;
                }

               const newStudent = new Student({
                   name,
                   lastName,
                   mobile,
                   createAt:Date.now(),
                   studentNumber
               });

               await newStudent.save();
               const token  = jwt.sign({id:newStudent.id,name:newStudent.name,lastName:newStudent.lastName,mobile:newStudent.mobile},config.get("secretKeyStudent"),{
                   expiresIn:"1h"
               });
               return{
                   ...newStudent._doc,
                   id:newStudent.id,
                   token
               }



        },
        async loginStudent(_,{mobile}){
            const student = await Student.findOne({mobile});
            if(!student){
                throw new Error(' لطفا ابتدا در سایت ثبت نام کنید');
            }

            const token  = jwt.sign({id:student.id,name:student.name,lastName:student.lastName,mobile:student.mobile},config.get("secretKeyStudent"),{
                expiresIn:"1h"
            });
            return{
                ...student._doc,
                id:student.id,
                token
            }
        },
        async addProfile(_,{
            id,
            nationCode,
            email,
            educationMajor,
            tel,
            address,
            instaID
        }){
            const student = await Student.findById(id);
            student.nationCode = nationCode;
            student.email = email;
            student.educationMajor = educationMajor;
            student.tel = tel;
            student.address = address;
            student.instaID = instaID;

            await student.save();
            return student;
        },
       async checkStudent(_,{mobile}){
           const student = await Student.findOne({mobile});
           if(student){
               return {...student._doc,id:student.id}
           }else{
               

            
               let studentNumber = "99101";
                const lastStudent = await Student.find().sort({createAt:-1}).limit(1);
                if(lastStudent[0]){
                    studentNumber = parseInt(lastStudent[0].studentNumber) + 1;
                }
                const newStudent = new Student({
                    mobile,
                    studentNumber
                });
                await newStudent.save();
               return{
                   ...newStudent._doc,
                   id:newStudent.id
               }
           }
       }
    }
}
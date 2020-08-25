const Teacher = require('../../model/Teacher');

module.exports = {
    Query:{
        async getAllTeachers(){
            const teachers = await Teacher.find();
            return teachers;
        },
        async getAllActiveTeachers(){
            const teachers = await Teacher.find({active:true});
            return teachers;
        },
        async getATeacher(_,{id}){
            const teacher = await Teacher.findById(id);
            return teacher;
        }
    },
    Mutation:{
        async addTeacher(_,{name,mobile,email,password,resume,picture}){
            const teacher = await Teacher.findOne({mobile});
            if(teacher){
                throw new Error("مدرس موجود است شماره موبایل تکراری");
            } 
            if(name == ""){
                throw new Error("نام مدرس را وارد کنید");
            }
            if(mobile == ""){
                throw new Error("موبایل مدرس را وارد کنید");
            }
            if(email == ""){
                throw new Error("ایمیل مدرس را وارد کنید");
            }
            if(password == ""){
                throw new Error("رمز عبور مدرس را وارد کنید");
            }

            const newTeacher = new Teacher({
                name,
                mobile,
                email,
                password,
                resume,
                picture,
                active:false,
                createAt:Date.now()
            });

            await newTeacher.save();
            return{
                ...newTeacher._doc,
                id:newTeacher.id
            }


        },
        async updateTeacherActive(_,{id,active}){
            const teacher = await Teacher.findById(id);
            teacher.active = active;

            await teacher.save();
            return teacher;
            
        },
        async updateTeacher(_,{id,name,mobile,email,password,picture,resume}){
            const teacher = await Teacher.findById(id);
            teacher.name = name;
            teacher.mobile = mobile;
            teacher.email = email;
            teacher.password = password;
            teacher.picture = picture;
            teacher.resume = resume;

            await teacher.save();
            return teacher;
        }
    }
}
const Course = require('../../model/Course');
const Teacher = require('../../model/Teacher');

module.exports = {
    Query:{
        async getAllActiveCourse(){
            const courses = await Course.find({active:true});
            return courses;
        },
        async getAllActiveCourseByGroup(_,{groupID}){
           
            if(groupID == ''){
                const courses = await Course.find({active:true});
                return courses;
            }else{
                const courses = await Course.find({active:true,group:groupID});
                return courses; 
            }
        },
            async getAllCourses(){
                const courses = await Course.find();
                return courses;
            },
            async getACourse(_,{id}){
                const course = await Course.findById(id);
                return course;
            },
            async getAllActiveCourseInHome(){
                const courses = await Course.find({active:true,showHome:true,typeOfCourse:"دوره آموزشی"}).sort({createAt:-1}).limit(6);
                const teacherCoureses = Promise.all(courses.map(async course => {
                   
                    const teacher = await Teacher.findById(course.teachers[0]);
                    if(course.teachers.length > 1){
                        const teachertwo = await Teacher.findById(course.teachers[1]);
                    }
                    teachertwo = '';
                    
                   
                    return{
                        ...course._doc,
                        id:course.id,
                        teacherPic:teacher.picture,
                        teacherPicTwo:teachertwo.picture 
                    }
                }))
                return teacherCoureses;
            },
            async getALLActiveWorkshopInHome(){
                const course = await Course.find({active:true,showHome:true,typeOfCourse:"کارگاه آموزشی"}).sort({createAt:-1}).limit(3);
                const teacherCoureses = Promise.all(course.map(async course => {
                   
                    const teacher = await Teacher.findById(course.teachers[0]);
                    let teachertwo  = ''
                    if(course.teachers.length > 1){
                         teachertwo = await Teacher.findById(course.teachers[1]);
                    }
                    
                    return{
                        ...course._doc,
                        id:course.id,
                        teacherPic:teacher.picture,
                        teacherPicTwo:teachertwo == '' ?  '' :teachertwo.picture ,
                        teacherName:teacher.name,
                        teacherNameTwo:teachertwo == '' ? '':teachertwo.name
                    }
                }))
                return teacherCoureses;
            },
            async getAllActiveEventsInHome(){
                const course = await Course.find({active:true,showHome:true,typeOfCourse:"رویداد"}).sort({createAt:-1}).limit(3);
                const teacherCoureses = Promise.all(course.map(async course => {
                    const teacher = await Teacher.findById(course.teachers[0]);
                    return{
                        ...course._doc,
                        id:course.id,
                        teacherPic:teacher.picture
                    }
                }));
                return teacherCoureses;
            }
    },
    Mutation:{
        async addCourse (_,{id,title, shortDescription,
            description,
            details,
            teachers,
            group,
            picture,
            video,
            videoPoster,
            showHome,
            active,
            typeOfCourse,ghest}){
                try {
                    let course = await Course.findById(id);
                    if(course){
                        course.title = title;
                        course.shortDescription = shortDescription;
                        course.description = description;
                        course.group = group;
                        course.picture = picture;
                        course.video = video;
                        course.videoPoster = videoPoster;
                        course.showHome = showHome;
                        course.active = active;
                        course.typeOfCourse = typeOfCourse;
                        course.ghest = ghest
    
                        await course.save();
                        return course;
                    }
    
                } catch (error) {
                    course = new Course({
                        title,
                        shortDescription,
                        description,
                        details,
                        teachers,
                        group,
                        picture,
                        video,
                        videoPoster,
                        showHome,
                        active,
                        typeOfCourse,
                        createAt:Date.now(),
                        ghest

                       
    
                    });
                    await course.save();

                    return{
                        ...course._doc,
                        id:course.id
                    }
                }
               
               
                

             
            },
        async addTeacherCourse(_,{id,teacherID}){
            const course = await Course.findById(id);
            const status = course.teachers.findIndex(x => x == teacherID);
            if(status === -1){
                course.teachers.push(teacherID);
            }else{
                course.teachers = course.teachers.filter(teacherId => teacherId !== teacherID );
               
            }

            await course.save();
            return course;
        }


    }
}
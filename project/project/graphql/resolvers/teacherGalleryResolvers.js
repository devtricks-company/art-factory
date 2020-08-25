const TeacherGallery = require('../../model/TeacherGallery');

module.exports = {
    Query:{
        async getAllGalleryTeacher(_,{teacherID}){
            const teacherGallery = await TeacherGallery.find({teacherID});
            return teacherGallery;
        }

    },
    Mutation:{
        async addTeacherGallery(_,{picture,teacherID}){
            const teacherGallery = new TeacherGallery({
                picture,
                createAt:Date.now(),
                teacherID
            });
            console.log(teacherGallery);

            await teacherGallery.save();

            return{
                ...teacherGallery._doc,
                id:teacherGallery.id
            }
        }
    }

}


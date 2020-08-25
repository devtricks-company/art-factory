const { Mongoose } = require("mongoose");

const CourseGallery = require('../../model/CourseGallery');


module.exports = {
    Query:{
        async getAllGalleryCourse(_,{courseID}){
            const courseGallery = await CourseGallery.find({courseID});
            return courseGallery;
        }
    },
    Mutation:{
        async addCourseGallery(_,{src,width,height,courseID}){
            const courseGallery = new CourseGallery({
                src,
                width,
                height,
                courseID
            });

            await courseGallery.save()
            return{
                ...courseGallery._doc,
                id:courseGallery.id
            }
        }
    }
}
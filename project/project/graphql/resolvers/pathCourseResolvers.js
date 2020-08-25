const PathCourse = require('../../model/PathCourse');
const Course = require('../../model/Course');
module.exports = {
    Query:{
        async getAPathPathCourse(_,{pathId}){
            
            const paths = await PathCourse.find({pathId}).sort({numberStep: -1});
          
               const pathCourse = Promise.all(paths.map(async path => {
               const course = await Course.findById(path.courseId);
               return{
                   ...path._doc,
                   id:path.id,
                   course:{...course._doc}
                 }
           })  )          
            return pathCourse;
        // }
        }
    },
    Mutation:{
            async addCoursePath(_,{numberStep,courseId,pathId}){
                const coursePath = await PathCourse.findOne({numberStep});
                if(coursePath){
                       throw new Error('شماره مسیر موجود است') ;
                }
                if(courseId == ""){
                    throw new Error('دوره را انتخاب کنید')
                }

                const newCouresPath = new PathCourse({
                    numberStep,
                    courseId,
                    pathId,
                    active:false

                });


                await newCouresPath.save();
                return{
                    ...newCouresPath._doc,
                    id:newCouresPath.id,
                
                }
            }

    }
}
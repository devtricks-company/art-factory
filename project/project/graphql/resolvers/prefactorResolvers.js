

const Prefactor = require('../../model/Prefactor');
const Course = require('../../model/Course');
const Detail = require('../../model/Detail');

module.exports = {
    Query:{
            async getAllPreFactoryByStudentID(_,{studentID}){
                const prefactors = await Prefactor.find({studentID});
                const prefactorsDetail = Promise.all(prefactors.map(async prefactor =>{
                      
                    const course = await Course.findById(prefactor.courseID);
                     const detail = await Detail.findById(prefactor.detailsID);
                       
                        return{
                            ...prefactor._doc,
                            id:prefactor.id,
                            course,
                            detail
                        }
                } ));

                return prefactorsDetail
            }
    },
    Mutation:{
        async addPrefactor(_,{courseID,detailsID,studentID}){
            const prefactor = await Prefactor.findOne({courseID,detailsID,studentID});
            if(prefactor){
                throw new Error('پیش فاکتور قبلا ثبت شده است');
            }

            const newPrefactor = new Prefactor({
                courseID,
                studentID,
                detailsID,
                createAt:Date.now(),
                payment:false
            });

            await newPrefactor.save();

            return{
                ...newPrefactor._doc,
                id:newPrefactor.id
            }
        },
        async removePrefactor(_,{id}){
            let prefactor = await Prefactor.findById(id);

            await prefactor.delete();

            return 'پیش فاکتور با موفقیت حذف شد';


            
            
            
        }
    }
}
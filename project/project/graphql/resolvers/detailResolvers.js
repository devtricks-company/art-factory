const Detail = require('../../model/Detail');

module.exports = {
    Query:{
        async getAllDetailsCourse(_,{courseId}){
            const details = await Detail.find({courseId});
            return details;
        },
        async  getAllActiveDetailsCourse(_,{courseID}){
            const details =  await Detail.find({courseId:courseID,active:true});
            return details;
        }
    },
    Mutation:{
        async addDetails(_,{classcode,
            duration,
            startDate,
            days,
            capacity,
            price,
            description,
            active,
            reserve,
            register,courseId}){

                const detail = await Detail.findOne({classcode});
                if(detail){
                    throw new Error("این کد  کلاس قبلا ثبت شده است");
                }
                if(classcode == ""){
                    throw new Error("لطفا کد کلاس را وارد کنید")
                }

                const newDetail = new Detail({
                    classcode,
                    duration,
                    startDate,
                    days,
                    capacity,
                    price,
                    description,
                    active,
                    reserve,
                    register,
                    courseId

                });

                await newDetail.save();
                return{
                    ...newDetail._doc,
                    id:newDetail.id
                }
        },
        async updateActiveDetail(_,{id,active}){
            const detail = await Detail.findById(id);
            detail.active = active;
            await detail.save();

            return detail;
        },
        async updateDetail(_,{id,classcode,
            duration,
            startDate,
            days,
            capacity,
            price,
            description,
            active,
            reserve,
            register}){
                const detail =await Detail.findById(id);
                const eDetails = await Detail.findOne({classcode});
                
                if(classcode == ""){
                    throw new Error("لطفا کد کلاس را وارد کنید")
                }
                detail.classcode = classcode;
                detail.duration =duration;
                detail.startDate = startDate;
                detail.days = days;
                detail.capacity = capacity;
                detail.price = price;
                detail.description = description;
                detail.active = active;
                detail.reserve =reserve;
                detail.register = register;

                await detail.save();
                return detail;
            }
    }
}
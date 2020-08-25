const Moments = require('../../model/Moments');

module.exports = {
    Query:{
            async getAllMoments(){
                const moments = await Moments.find();
                return moments;
            },
            async getAllMomentActiveShowHome(){
                const moments = await Moments.find({active:true,showInHome:true}).sort({createAt:-1}).limit(10);
                return moments;

            }
    },
    Mutation:{
        async addNewMoments(_,{picture,description}){
            const moments = new Moments({
                picture,
                description,
                createAt:Date.now(),
                active:true,
                showInHome:true
            }) ;

            await moments.save();
            
            return{
                ...moments._doc,
                id:moments.id
            }
        },
        async changeActiveMoments(_,{id,active}){
            const moment = await Moments.findById(id);
            moment.active = active;
            moment.save();
            return moment;
        },

        async changeShowInHomeMoment(_,{id,showInHome}){
            const moment = await Moments.findById(id);
            moment.showInHome = showInHome
            moment.save();
            return moment;
        },
        async updateMoment(_,{id,picture,description}){
            const moment = await Moments.findById(id);
            moment.picture = picture;
            moment.description = description;
            await moment.save();
            return moment;
        }
    }
}
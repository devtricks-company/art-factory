const Path = require('../../model/Path');

module.exports = {
    Query:{
            async getAllPath(){
                const paths = await Path.find();
                return paths;
            }
    },
    Mutation:{
        async addPath(_,{name,icon,groupId}){
            const path = await Path.findOne({name});
          
            if(path){
                throw new Error('این مسیر موجود می باشد');
            }

            if(name == ""){
                throw new Error('نام مسیر را وارد کنید');
                
            }

            if(groupId == ""){
                throw new Error('گروه را انتخاب کنید');
            }
            const newPath = new Path({
                name,
                icon,
                active:false,
                groupId
            });

            await newPath.save();
            return{
                ...newPath._doc,
                id:newPath.id
            }
        },
        async updateActivePath(_,{id,active}){
            const path = await Path.findById(id);
            path.active = active;
            await path.save();
            return path;
        },
        async updatePath(_,{id,name,icon,groupId}){
            const path = await Path.findById(id);
           
            path.name = name;
            path.icon = icon;
            path.groupId = groupId;
            await path.save();
            return path;
        }
    }
}
const Group = require('../../model/Group');

module.exports = {
    Query:{
        async getAllGroups(){
            const groups = await Group.find();
            return groups;
        },
        async getAllActiveGroup(){
            const groups = await Group.find({active:true});
            return groups;
        }
    },
    Mutation:{
        async addGroup(_,{name}){
            const group = await Group.findOne({name});
            if(group){
                throw new Error('گروه موجود می باشد');
            }
            if(name == ""){
                throw new Error('نام گروه را وارد کنید');
            }

            const newGroup = new Group({
                name,
                active:false
            });

            await newGroup.save();

            return{
                ...newGroup._doc,
                id:newGroup.id
            }
        },
        async updateActiveGroup(_,{id,active}){
            const group = await Group.findById(id);
            group.active = active;
            await group.save();
            return group;
        },
        async updateGroup(_,{id,name}){
            const group = await Group.findById(id);
            group.name = name;
            await group.save();
            return group;
        }
    }
}
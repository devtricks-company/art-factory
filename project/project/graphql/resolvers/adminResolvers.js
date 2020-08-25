const Admin = require('../../model/Admin');
const bcryptJs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = {
    Query:{

    },
    Mutation:{
            async addAdmin(_,{name,mobile,email,password},context){
                const admin = await Admin.findOne({mobile});
                if(admin){
                    throw new Error('ادمین موجود است');
                }

                const newAdmin = new Admin({
                    name,
                    mobile,
                    email,
                    password,
                    active:false,
                    createAt:Date.now()
                });

                const salt = await bcryptJs.genSalt(10);
                const hashPassword = await bcryptJs.hash(password,salt);
                newAdmin.password = hashPassword;

                await newAdmin.save();
                return{
                    ...newAdmin._doc,
                    id:newAdmin.id
                }
            },
            async loginAdmin(_,{mobile,password}){
                const admin = await Admin.findOne({mobile});
                if(!admin){
                    throw new Error('نام کاربری موجود نیست');
                }
                if(!admin.active){
                    throw new Error('نام کاربری فعال نیست');
                }

                const match = await bcryptJs.compare(password,admin.password);
                if(!match){
                    throw new Error("کلمه عبور صحیح نیست");
                }

                const token = jwt.sign({
                    id:admin.id,
                    name:admin.name,
                    mobile:admin.mobile,
                    email:admin.email
                },config.get('secretKey'),{
                    expiresIn:'1h'
                });

                return{
                    ...admin._doc,
                    id:admin.id,
                    token
                }
            }
    }
}
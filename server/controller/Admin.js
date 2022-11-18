
const User = require('../Modal/user')


module.exports = {

    login: async (req, res) => {
        const adminEmail = "admin@gmail.com"
        const adminPassword = "12345"
        try {
            if(adminEmail == req.body.email){
                if(adminPassword == req.body.password){
                  res.status(200).json(true)
                }else{
                    res.status(200).json({passmsg:true,message:"Incorrect Password"})
                }
            }else{
                res.status(200).json({emailmsg:true,message:"Invalid Email"})
            }
        } catch (error) {
            console.log(error);
        }
        console.log(req.body);
    },

     getUserManagement : async(req,res)=>{
        console.log('hyyy');
        try {
          await  User.find().then(response=>{
                console.log(response);
                res.status(200).json(response)
            })
    
            
        } catch (error) {
            res.status(401).json({message:'Something went wrong! Try again'})
        }
    },


     blockUser :  (req,res)=>{
        console.log(req.body.userId,'its body');
    
        try {
            User.findByIdAndUpdate({_id:req.body.userId},
                {
                    $set:{report_status:"inactive"}
                }).then((response)=>{
                    res.status(200).json({update:true,message:"User has been Blocked!"})
                }).catch((error)=>{
                    console.log(error);
                    res.json({update:false, message:"User not Blocked! Try again"})
                })
        } catch (error) {
            res.json(error.message)
        }
    },
    
    
    /* ------------------------------- UNBLOCK USER ------------------------------- */
    
    
     unblockUser : (req,res)=>{
    
        try {
            User.findByIdAndUpdate({_id:req.body.userId},
                {
                    $set:{report_status:"active"}
                }).then(response=>{
                    res.status(200).json({update:true,message:"User has been Ublocked"})
                }).catch(err=>{
                    res.status(401).json({message:"Something went wrong"})
                })
        } catch (error) {
            res.json(error.message)
        }
    }
    
    


}
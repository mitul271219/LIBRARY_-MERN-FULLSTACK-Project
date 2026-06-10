import mongoose from "mongoose";


const contactSchema = mongoose.Schema({
    username:{type:String , require:true},
    email:{type:String , require:true},
    message:{type:String , require:true}
})

const contectForm = mongoose.model("ContectForm" , contactSchema)

export default contectForm;
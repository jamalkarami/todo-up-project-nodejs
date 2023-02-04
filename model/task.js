import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({    
    title : {type : String, required : true, message : 'Le titre est obligatoire'},
    description : {type : String, required : true, message :  'La description est obligatoire'},
    createdAt : Date,
    scheduledTaskDate : {type : Date, required : true, message : 'La date de la est obligatoire'},
    user_id : String
})

const Task = mongoose.model('Task', taskSchema);

export default Task;
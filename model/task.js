import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({    
    title : {type : String, required : true, message : 'The title of the task is required'},
    description : {type : String, required : true, message :  'The description of the task is required'},    
    scheduledTaskDate : {type : Date, required : true, message : 'The scheduled task us required'},
    user_id : {type : String, required : true, message : "The id of task's user is required"}
})

const Task = mongoose.model('Task', taskSchema);

export default Task;
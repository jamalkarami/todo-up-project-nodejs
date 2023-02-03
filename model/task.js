import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    id : Number,
    title : {type : String, required : true, message : 'Le titre est obligatoire'},
    description : {type : String, required : true, message :  'La description est obligatoire'},
    createdAt : Date,
    scheduledTaskDate : {type : Date, required : true, message : 'La date de la est obligatoire'}
})

const Task = mongoose.model('Task', taskSchema);

export default Task;
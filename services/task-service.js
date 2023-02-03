
import Task from './../model/task.js';

export class TaskService{
    /**
     * Create a user task    
     */
    static async save_task(task) {
        //Creating task                
        return Task.create(task);        
    }
    /**
     * Delete a user task     
     */
    static delete_task(task_id) {
        //Deleting task
        console.log("task_id : ", task_id);
        return Task.deleteOne({_id : task_id}).exec();
    }
    /**
     * Update a user task
     * @param {*} req 
     * @param {*} r!es 
     */
    static update_task(task_id, task) {
        //Updating task
        console.log("task_id", task_id);
        return Task.updateOne({_id : task_id}, task).exec();
    }
    /**
     * Return the list of user's tasks     
     */
    static list_tasks() {
        //Return all tasks
        return Task.find({}).exec();
    }
}
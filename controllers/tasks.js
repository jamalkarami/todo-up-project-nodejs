import { TaskService } from './../services/task-service.js';
import Task from './../model/task.js';

export class TaskController {
    /**
     * Create a user task
     * @param {*} req 
     * @param {*} res 
     */
    static save_task(req, res) {
         //Creating task    
        //  console.log(req.body);        
         if(!req.body){
            res.status(400).send({message : "Task to insert can't be empty!"});
            return;
         }

         let task = new Task(req.body);

         let error = task.validateSync();
         if(error){            
            throw error;
         }
         TaskService.save_task(req.body).then(task=>{
            res.status(200).send(task);
         },(error)=>{
            console.log(error);
            res.status(400).send("Error while saving the task!");
         });       
    }
    /**
     * Delete a user task
     * @param {*} req 
     * @param {*} res 
     */
    static async delete_task(req, res) {
        let task_id = req.params.id;        
        if(task_id){
            await TaskService.delete_task(task_id);
            res.status(200).send({message : "Task deleted successfully"});
        }else{
            throw new Error("The id of the task to delete is required!");
        }      
    }
    /**
     * Update a user task
     * @param {*} req 
     * @param {*} res 
     */
    static async update_task(req, res) {
        await TaskService.update_task(req.params.id, req.body);
        res.status(200).send({message : "Task updated successfully"});
    }
    /**
     * Return the list of user's tasks
     * @param {*} req 
     * @param {*} res 
     */
    static async list_tasks(req, res) {     
        let user_id = req.params.id;
        if(user_id){
         console.log("user_id : ", user_id);
         let tasks = await TaskService.list_tasks(user_id);
         return res.status(200).send(tasks);
        }else{
            throw new Error('The id of the user is required to get his todo tasks');
        }      
    }
}

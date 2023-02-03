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
            res.status(400).send("Task to insert can't be empty!");
            return;
         }

        //  task = new Task(req.body);

        //  task.validate();

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
    static delete_task(req, res) {
        let task_id = req.params.id;        
        if(task_id){
            TaskService.delete_task(task_id).then(task=>{               
                res.status(201).send({message : "Task deleted successfully"});
             },(error)=>{
                console.log(error);
                res.status(400).send("Error while deleting the task!");
             });
        }else{
            res.status(400).send("The id of the task is required!");
        }      
    }
    /**
     * Update a user task
     * @param {*} req 
     * @param {*} res 
     */
    static update_task(req, res) {    
        TaskService.update_task(req.params.id, req.body).then(task=>{
            res.status(200).send({message : "Task updated successfully"});
         },(error)=>{
            console.log(error);
            res.status(400).send("Error while updating the task!");
         });
    }
    /**
     * Return the list of user's tasks
     * @param {*} req 
     * @param {*} res 
     */
    static list_tasks(req, res) {      
        TaskService.list_tasks().then(tasks=>{
         console.log("liste of tasks : ", tasks);
            res.status(200).send(tasks);
         },(error)=>{
            console.log(error);
            res.status(400).send("Error while retrieving data!");
         });
    }
}

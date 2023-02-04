import express from 'express';
import auth from '../middleware/auth.js';
import {TaskController} from '../controllers/tasks.js';

const router = express();

router.get("/api/v1/users/:id/tasks", auth,  TaskController.list_tasks);
router.post("/api/v1/users/tasks", auth, TaskController.save_task);
router.delete("/api/v1/users/tasks/:id", auth, TaskController.delete_task);
router.put("/api/v1/users/tasks/:id", auth, TaskController.update_task);

export {router};
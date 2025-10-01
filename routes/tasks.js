import express from 'express';
import auth from '../middleware/auth.js';
import {TaskController} from '../controllers/tasks.js';
import tryCatch from '../utils/tryCatch.js';

const router = express();

router.get("/api/v1/users/:id/tasks", auth,  tryCatch(TaskController.list_tasks));
router.post("/api/v1/users/tasks", auth, tryCatch(TaskController.save_task));
router.delete("/api/v1/users/tasks/:id", auth, tryCatch(TaskController.delete_task));
router.put("/api/v1/users/tasks/:id", auth, tryCatch(TaskController.update_task));

export {router};
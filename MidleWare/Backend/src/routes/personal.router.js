

import { Router } from "express";
import { createPersonal,getAllPersonal,getPersonalById,updatePersonal,deletePersonal } from '../controllers/personal.controller.js';

const router = new Router();

router.post('/', createPersonal);

router.get('/', getAllPersonal);

router.get('/:id', getPersonalById);

router.put('/:id', updatePersonal);

router.delete('/:id', deletePersonal);

export default  router;

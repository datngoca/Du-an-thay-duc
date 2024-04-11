

import { Router } from "express";
import { createBenefitPlan,deleteBenefitPlan,updateBenefitPlan,getAllBenefitPlan,getBenefitPlanById } from '../controllers/benefitplan.controller.js';

const router = new Router();

router.post('/', createBenefitPlan);

router.get('/', getAllBenefitPlan);

router.get('/:id', getBenefitPlanById);

router.put('/:id', updateBenefitPlan);

router.delete('/:id', deleteBenefitPlan);

export default  router;

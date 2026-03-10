import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { updateTutorProfileSchema } from "./tutor.validation";
import { tutorController } from "./tutor.controller";



const router = Router();

router.put("/update-profile", validateRequest(updateTutorProfileSchema), tutorController.updateTutorProfileController);

export const tutorRoutes = router;
import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createAvailabilitySlotSchema, updateTutorProfileSchema } from "./tutor.validation";
import { tutorController } from "./tutor.controller";



const router = Router();

router.put("/update-profile", validateRequest(updateTutorProfileSchema), tutorController.updateTutorProfileController);
router.post("/create-availability", validateRequest(createAvailabilitySlotSchema), tutorController.createAvailabilitySlot);
router.get("/profile/:userId", tutorController.getTutorProfile);

export const tutorRoutes = router;
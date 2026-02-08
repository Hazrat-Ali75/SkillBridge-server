import { Router } from "express";
import { tutorManagementController } from "../controllers/tutorManagementController";
import { authorizeRoles, isAuthenticated } from "../middlewares/middleware";


const router = Router();

router.put("/profile", isAuthenticated, authorizeRoles("TUTOR"), tutorManagementController.updateTutorProfile);
router.post("/availability", isAuthenticated, authorizeRoles("TUTOR"), tutorManagementController.addAvailabilitySlot);
router.delete("/availability/:slotId", isAuthenticated, authorizeRoles("TUTOR"), tutorManagementController.deleteAvailabilitySlot);

export const tutorManagementRoutes = router;
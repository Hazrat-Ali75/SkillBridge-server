import { Router } from "express";
import { createBookingSchema } from "./booking.validation";
import { bookingController } from "./booking.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { authorizeRole } from "../../middlewares/authorize";
import { authenticate } from "../../middlewares/authenticate";


const router = Router();

router.post('/create', validateRequest(createBookingSchema), authenticate, authorizeRole("STUDENT"), bookingController.createBookingController);
router.get('/', bookingController.getAllBookingsController);
router.get('/:id', bookingController.getBookingByIdController);

export const bookingRoutes = router;
import express from "express";
import cors from "cors";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth";
import { env } from "./config/env";
import { tutorRoutes } from "./modules/tutor/tutor.route";
import { categoryRoutes } from "./modules/category/category.route";
import { bookingRoutes } from "./modules/booking/booking.route";
import { reviewRoute } from "./modules/review/review.route";
import { adminRoutes } from "./modules/admin/admin.route";
import { notFound } from "./middlewares/notFound";

const app = express();

app.use(express.json());
app.use(cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth/*splat', toNodeHandler(auth));
app.get("/api/me", async (req, res) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });
    return res.json(session);
});

app.use("/api/tutor", tutorRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoute);
app.use("/api/admin", adminRoutes);

app.use(notFound);

app.get("/", (req, res) => {
    res.send("server is running");
});

export default app;
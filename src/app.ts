import express from "express";
import cors from "cors";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth";
import { env } from "./config/env";
import { tutorRoutes } from "./modules/tutor/tutor.route";

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

app.get("/", (req, res) => {
    res.send("server is running");
});

export default app;
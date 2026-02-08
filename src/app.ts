import express ,{Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fromNodeHeaders, toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import { tutorManagementRoutes } from './routes/tutorManagementRoutes';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.BASE_URL || "http://localhost:5000",
    credentials: true,
}));


app.all('/api/auth/*splat', toNodeHandler(auth));
app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

app.use('/api/tutor', tutorManagementRoutes);

app.get('/', (req:Request, res:Response) => {
    res.json('SkillBridge Backend is running!');
});

export default app;
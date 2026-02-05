import express ,{Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import router from './auth/authRoutes';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.BASE_URL || "http://localhost:5000",
    credentials: true,
}));


app.all('/api/auth/*splat', toNodeHandler(auth));
app.use('/api', router);

app.get('/', (req:Request, res:Response) => {
    res.json('SkillBridge Backend is running!');
});

export default app;
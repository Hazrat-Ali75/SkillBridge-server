import { Router } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

const router = Router();

router.post('/sign-out',async(req, res) => {
    try {
        await auth.api.signOut({
          headers: {
            cookie : req.headers.cookie || "",
          }
        });
        res.status(200).json("message: Signed out successfully");
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal server error during sign out" });
    }
});

router.get("/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

export default router;
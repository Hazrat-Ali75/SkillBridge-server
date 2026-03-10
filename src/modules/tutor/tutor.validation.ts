import { z } from "zod";

export const updateTutorProfileSchema = z.object({
    userId: z.string().min(1, "user id is required"),
    bio: z.string().optional(),
    hourlyRate: z.number().optional(),
    experience: z.number().optional(),
})


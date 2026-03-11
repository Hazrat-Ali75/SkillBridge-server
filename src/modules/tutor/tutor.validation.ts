import { z } from "zod";

export const updateTutorProfileSchema = z.object({
    userId: z.string().min(1, "user id is required"),
    bio: z.string().optional(),
    hourlyRate: z.number().optional(),
    experience: z.number().optional(),
})

export const DayOfWeekEnum = z.enum([
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
]);

export const createAvailabilitySlotSchema = z.object({
    tutorId: z.string().min(1, "tutorId is required"),
    dayOfWeek: DayOfWeekEnum.optional(),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
}).refine(data => data.endTime > data.startTime, {
    message: "End time must be after start time",
    path: ["endTime"],
});
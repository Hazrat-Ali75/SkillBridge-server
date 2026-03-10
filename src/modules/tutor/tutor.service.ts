import { prisma } from "../../config/prisma";


interface TutorProfileUpdatePayload {
    userId: string;
    bio?: string;
    hourlyRate?: number;
    experience?: number;
}

export const tutorProfileUpdateService = async (payload: TutorProfileUpdatePayload) => {
    const { userId, bio, hourlyRate, experience } = payload;
    const result = await prisma.tutorProfile.update({
        where: { userId },
        data: {
            bio: bio as string,
            hourlyRate: hourlyRate as number,
            experience: experience as number
        },
    });
    return result;
}

export const tutorService = {
    tutorProfileUpdateService
}
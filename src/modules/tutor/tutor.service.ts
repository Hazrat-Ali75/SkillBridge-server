import { prisma } from "../../config/prisma";
import { DayOfWeek } from "../../generated/prisma/enums";


interface TutorProfileUpdatePayload {
    userId: string;
    bio?: string;
    hourlyRate?: number;
    experience?: number;
}

interface AvailabilitySlotPayload {
    tutorId: string;
    dayOfWeek?: DayOfWeek;
    startTime?: string;
    endTime?: string
}

const tutorProfileUpdateService = async (payload: TutorProfileUpdatePayload) => {
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


const createAvailabilitySlot = async (payload: AvailabilitySlotPayload) => {
    const result = await prisma.availabilitySlot.create({
        data: payload
    })
    return result
}


const getTutorProfile = async (userId: string) => {
    const result = await prisma.tutorProfile.findUnique({
        where: { userId: userId },
        select: {
            id: true,
            bio: true,
            hourlyRate: true,
            experience: true,
            createdAt: true,
            updatedAt: true,
            user: {
                select: {
                    email: true,
                    name: true,
                    emailVerified: true,
                    image: true,
                    role: true,
                    status: true,
                }
            },
            // category: true,
            availabilitySlots: {
                select: {
                    dayOfWeek: true,
                    startTime: true,
                    endTime: true
                }
            },
            // bookings: {
            //     select: {
            //         id: true,
            //     }
            // },
            // reviews: {
            //     select: {
            //         id: true,
            //         rating: true,
            //         comment: true,
            //         createdAt: true,
            //         // Exclude tutorId
            //     }
            // }
        }
    })

    return result;
}



export const tutorService = {
    tutorProfileUpdateService,
    createAvailabilitySlot,
    getTutorProfile
}
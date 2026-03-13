import { prisma } from "../../config/prisma"
import { Role } from "../../generated/prisma/enums";


interface createBookingPayload {
    studentId: string;
    tutorId: string;
    sessionDate: Date;
    duration: number;
}

const createBookingService = async (payload: createBookingPayload, role: Role) => {
    if (role !== "STUDENT") {
        throw new Error("Unauthorized !!! You are not allowed to book a session")
    }
    const result = await prisma.booking.create({
        data: payload
    })
    return result
}

const getAllBookingsService = async (id: string) => {
    const result = await prisma.booking.findMany({
        where: {
            id
        },
        include: {
            reviews: {
                select: {
                    rating: true,
                    comment: true
                }
            }
        }
    })
    return result
}

const getBookingByIdService = async (id: string) => {
    const result = await prisma.booking.findUnique({
        where: { id }
    })
    return result
}


export const bookingService = {
    createBookingService,
    getAllBookingsService,
    getBookingByIdService,
}
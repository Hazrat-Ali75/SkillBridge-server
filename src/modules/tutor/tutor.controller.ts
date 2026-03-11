import { Request, Response } from "express";
import { tutorService } from "./tutor.service";

const updateTutorProfileController = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const result = await tutorService.tutorProfileUpdateService(req.body);
        res.status(200).json({
            success: true,
            message: "Tutor profile updated successfully",
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to update tutor profile",
            error: error,
        });
    }
};

const createAvailabilitySlot = async (req: Request, res: Response) => {
    console.log(req.body)
    try {
        const result = await tutorService.createAvailabilitySlot(req.body);
        res.status(201).json({
            success: true,
            message: "Availability slot created successfully",
            data: result
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to update tutor profile",
            error: error,
        });
    }
}

const getTutorProfile = async (req: Request, res: Response) => {
    try {
        const result = await tutorService.getTutorProfile(req.params.userId as string)
        res.status(200).json({
            success: true,
            message: "successfully retrieved tutor profile",
            data: result
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to update tutor profile",
            error: error,
        });
    }
}


export const tutorController = {
    updateTutorProfileController,
    createAvailabilitySlot,
    getTutorProfile
}

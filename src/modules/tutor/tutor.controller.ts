import { Request, Response } from "express";
import { tutorService } from "./tutor.service";

export const updateTutorProfileController = async (req: Request, res: Response) => {
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


export const tutorController = {
    updateTutorProfileController
}

import {Request, Response} from 'express';
import { tutorManagementServices } from '../services/tutorManagementServices';
import { prisma } from '../lib/prisma';

const updateTutorProfile = async (req:Request, res:Response)=>{
    const {id} = req.user || {};
    const profileData = req.body;
    try {
        await tutorManagementServices.updateTutorProfile(id as string, profileData);
        res.status(200).json({success: true, message: "Profile updated successfully"});
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({message: error.message});
        }
        res.status(500).json({message: "An unknown error occurred"});
    }
}

const addAvailabilitySlot = async (req:Request, res:Response) => {
    const {id} = req.user || {};
    const {dayOfWeek, startTime, endTime} = req.body;
    try {
        const tutorData = await prisma.tutorProfile.findUnique({
            where: {userId: id as string},
        });
        if(!tutorData){
            return res.status(404).json({message: "Tutor profile not found"});
        }
        await tutorManagementServices.addAvailabilitySlot({
            tutorId: tutorData.id,
            dayOfWeek,
            startTime,
            endTime
        });
        res.status(200).json({success: true, message: "Availability slot added successfully"});
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({message: error.message});
        }
        res.status(500).json({message: "An unknown error occurred"});
    }
}

const deleteAvailabilitySlot = async (req:Request, res:Response) => {
    const {slotId} = req.params;
    try {
        await tutorManagementServices.deleteAvailabilitySlot(slotId as string);
        res.status(200).json({success: true, message: "Availability slot deleted successfully"});
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({message: error.message});
        }
        res.status(500).json({message: "An unknown error occurred"});
    }
}

export const tutorManagementController = {
    updateTutorProfile,
    addAvailabilitySlot,
    deleteAvailabilitySlot
}
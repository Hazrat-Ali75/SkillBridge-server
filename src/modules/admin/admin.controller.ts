

import { adminService } from "./admin.service";
import { Request, Response } from "express";


const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await adminService.getAllUsers();
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error
        })
    }
}

const updateUserStatusController = async (req: Request, res: Response) => {
    try {
        const { userId, status } = req.body;
        const user = await adminService.updateUserStatus(userId, status);
        return res.status(200).json({
            success: true,
            message: "User status updated successfully",
            data: user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update user status",
            error: error
        })
    }
}

export const adminController = {
    getAllUsersController,
    updateUserStatusController
}

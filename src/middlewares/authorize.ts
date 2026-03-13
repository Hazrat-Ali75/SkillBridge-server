import { Request, Response, NextFunction } from "express";

type Role = "STUDENT" | "TUTOR" | "ADMIN";

export const authorizeRole = (role: Role) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                })
            }

            if (req.user.role !== role) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                })
            }

            next();
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Failed to authorize user",
                error: error.message,
            });
        }
    }
}
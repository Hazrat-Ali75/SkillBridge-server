import { Request, Response, NextFunction } from "express";


type Role = "STUDENT" | "TUTOR" | "ADMIN";

export const authorizeRole = (...allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                })
            }

            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                })
            }

            next();
        } catch (error: any) {
            next(error);
        }
    }
}
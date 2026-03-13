import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const betterAuthSessionToken = req.headers.cookie?.split('=')[1];

        if (!betterAuthSessionToken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const token = betterAuthSessionToken.split('.')[0];


        const session = await prisma.session.findUnique({
            where: {
                token: token as string
            },
            include: {
                user: true
            }
        })

        if (!session) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired session"
            })
        }

        if (session.user.status === "BANNED") {
            return res.status(401).json({
                success: false,
                message: "User is banned"
            })
        }

        req.user = {
            id: session.user.id,
            email: session.user.email,
            role: session.user.role as "STUDENT" | "TUTOR" | "ADMIN",
            status: session.user.status as "ACTIVE" | "BANNED",
        };
        next()
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to authenticate user",
            error: error,
        });
    }
}
import { prisma } from "~/db.server";

export type {Method} from "@prisma/client";


export async function getMedthods() {
    return prisma.method.findMany(
        {
            where: {
                isActive: true,
            },
            select: {
                id: true,
                name: true,
            },
        }
    );
}
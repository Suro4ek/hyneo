import { prisma } from "~/db.server";

export type {Method} from "@prisma/client";


export async function getMethods() {
    return prisma.method.findMany(
        {
            where: {
                isActive: true,
            },
            select: {
                id: true,
                title: true,
            },
        }
    );
}
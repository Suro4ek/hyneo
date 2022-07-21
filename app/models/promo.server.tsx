import { prisma } from "~/db.server";

export type {Promo} from "@prisma/client";

export async function findPromo(name: string) {
    return prisma.promo.findFirst({
        where: {
            active: true,
            name: name,
        },
    });
}
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

export async function getPromos() {
    return prisma.promo.findMany();
}

export async function getPromo(id: number) {
    return prisma.promo.findFirst({
        where: {
            id,
        },
    });
}

export async function createPromo(name: string, count: number, discount: number, active: boolean) {
    return prisma.promo.create({
        data: {
            name,
            count,
            discount,
            active,
        },
    });
}

export async function updatePromo(id: number, name: string, count: number, discount: number, active: boolean) {
    return prisma.promo.update({
        where: {
            id,
        },
        data: {
            name,
            count,
            discount,
            active,
        },
    });
}

export async function deletePromo(id: number){
    return prisma.promo.delete({
        where: {
            id,
        },
    });
}
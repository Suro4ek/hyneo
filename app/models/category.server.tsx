import { prisma } from "~/db.server";

export type {Category} from "@prisma/client";

export async function getCategories() {
    return prisma.category.findMany();
}

export async function getCategoryByName(name: string) {
    return prisma.category.findFirst({
        where: {
            name,
        },
    });
}

export async function createCategory(name: string, active: boolean) {
    return prisma.category.create({
        data: {
            name: name,
            active: active,
        },
    });
}

export async function getCategoryById(id: number) {
    return prisma.category.findFirst({
        where: {
            id,
        },
    });
}

export async function UpdateCategory(id: number, name: string, active: boolean) {
    try{
        return prisma.category.update({
            where: {
                id,
            },
            data: {
                name: name,
                active: active,
            },
        });
    }catch(e){
        return null;
    }
}
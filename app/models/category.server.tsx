import { prisma } from "~/db.server";

export type {Category} from "@prisma/client";

export async function getCategories() {
    return prisma.category.findMany();
}

export async function getCategoriesActive() {
    return prisma.category.findMany({
        where:{
            active: true,
        },
        select:{
            active: true,
            name: true,
        }
    });
}

export async function getCategoriesByItems() {
    return prisma.category.findMany({
        where: {
            active: true,
            items:{
                some:{
                    active: true,
                }
            }
        },
        select: {
            id: true,
            name: true,
            items: {
                select: {
                    id: true,
                    name: true,
                    price: true,
                    fake_price: true,
                    description: true,

                },
            }
        }
    });
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
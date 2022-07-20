import { prisma } from "~/db.server";

export type {Item} from "@prisma/client";

export async function createItem(name: string, description: string, command: string, price: number, fake_price: number, categoryId: number, serverId: number, active: boolean, doplata: boolean) {
        return prisma.item.create({
            data: {
                name,
                description,
                price,
                fake_price,
                category: {
                    connect: {
                        id: categoryId
                    }
                },
                Server: {
                    connect: {
                        id: serverId
                    }
                },
                command: command,
                active: active,
                doplata: doplata,
            }
        });
}

export async function updateItem(id: number,name: string, description: string, price: number, fake_price: number, categoryId: number, active: boolean, doplata: boolean){
    if(categoryId === 0){
        return prisma.item.update({
            where: {
                id,
            },
            data: {
                name,
                description,
                price,
                fake_price,
                active: active,
                doplata: doplata,
            }
        });
    }else{
        return prisma.item.update({
            where: {
                id,
            },
            data: {
                name,
                description,
                price,
                fake_price,
                category: {
                    connect: {
                        id: categoryId
                    }
                },
                active: active,
                doplata: doplata,
            }
        });
    }
}

export async function getItems(){
    return prisma.item.findMany({
        include:{
            category: true
        }
    });
}

export async function getItemById(id: number){
    return prisma.item.findFirst({
        where: {
            id
        },
        include:{
            category: true
        }
    });
}
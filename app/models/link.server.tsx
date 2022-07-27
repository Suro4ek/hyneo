import { prisma } from "~/db.server";

export type {Links} from '@prisma/client';

export async function deleteLink(id: number) {
    await prisma.links.delete({
        where: {
            id
        }
    });
}

export async function getLinkByID(id: number){
    return await prisma.links.findFirst({
        where: {
            id
        }
    });
}

export async function updateLink(id: number, name: string, title: string, url: string, active: boolean){
    await prisma.links.update({
        where: {
            id
        },
        data: {
            name,
            title,
            url,
            active
        }
    });
}

export async function createLink(name: string, title: string, url: string, active: boolean){
    await prisma.links.create({
        data: {
            name,
            title,
            url,
            active,
            SettingsId: 1
        }
    });
}

export async function getLinks(){
    return await prisma.links.findMany();
}
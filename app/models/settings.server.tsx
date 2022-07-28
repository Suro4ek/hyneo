import { prisma } from "~/db.server";

export type {Settings} from '@prisma/client';


export async function getSettings(id: number) {
    return prisma.settings.findFirst({
        where:{
            id: id
        }
    })
} 

export async function updateSettings(id: number, footer: string, yandex: string) {
    return prisma.settings.update({
        where:{
            id: id
        },
        data:{
            footer: footer,
            yandex: yandex
        }
    })
}

export async function getSettingsActive(id: number){
    return await prisma.settings.findFirst({
        where:{
            id: id,
        },
        include:{
            Vote:{
                where:{
                    active: true,
                },
                select:{
                    title: true,
                    id: true,
                    url: true,
                }
            },
            Link: {
                where:{
                    active: true,
                },
                select: {
                    title: true,
                    id: true,
                    url: true,
                }
            }
        }

    })
}
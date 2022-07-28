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

export async function getMethodsAdmin() {
    return prisma.method.findMany();
}

export async function updateMethod(id: number, title: string, public_key: string, secret_key: string, secret_key2: string, active: boolean) {
    return prisma.method.update({
        where: {
            id,
        },
        data: {
            title,
            isActive: active,
            methodkey:{
                update:{
                    PUBLIC_KEY: public_key,
                    SECRET_KEY: secret_key,
                    SECRET_KEY2: secret_key2,
                }
            }
        },
        include:{
            methodkey: true,
        }
    });
}


export async function getMethod(id:number) {
    return prisma.method.findFirst({
        where: {
            id,
        },
        include:{
            methodkey: true
        }
    });
}
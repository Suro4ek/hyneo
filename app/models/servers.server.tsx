import { prisma } from "~/db.server";

export type {Server} from "@prisma/client";


export async function getServers() {
    return prisma.server.findMany({
        select:{
            id: true,
            name: true,
            active: true,
        }
    });
}

export async function getServersActive() {
    return prisma.server.findMany({
        where:{
            active: true,
        },
        select:{
            id: true,
            name: true,
            active: true,
        }
    });
}

export async function getServerById(id:number) {
    return prisma.server.findFirst({
        where:{
            id: id
        }
    })
}

export async function updateServer(id: number, name: string, ip: string, port: string, password: string, active: boolean){
    return prisma.server.update({
        where:{
            id: id
        },
        data:{
            name: name,
            ip: ip,
            port: port,
            password: password,
            active: active
        }
    })
}

export async function CreateServer(name: string, ip: string, port: string, password: string, active: boolean){
    return prisma.server.create({
        data:{
            name: name,
            ip: ip,
            port: port,
            password: password,
            active: active
        }
    })
}
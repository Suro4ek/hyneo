import { prisma } from "~/db.server";

export type {Vote} from '@prisma/client';

export async function getVotes(){
    return prisma.vote.findMany({
        where:{
            active: true,
        },
    });
}

export async function getVotesSite() {
    return prisma.vote.findMany({
        where:{
            active: true,
        },
        select: {
            id: true, 
            title: true,
            url: true,
        }
    });
}

export async function deleteVote(id: number){
    return prisma.vote.deleteMany({
        where:{
            id
        },
    });
}

export async function createVote(name: string, url: string, title: string, active: boolean){
    return prisma.vote.create({
        data: {
            name,
            url,
            title,
            active,
            SettingsId: 1,
        },
    });
}

export async function updateVote(id: number, name: string, url: string, title: string, active: boolean){
    return prisma.vote.update({
        where: {
            id,
        },
        data: {
            name,
            url,
            title,
            active,
        },
    });
}

export async function getVoteById(id: number){
    return prisma.vote.findFirst({
        where: {
            id,
        },
    });
}
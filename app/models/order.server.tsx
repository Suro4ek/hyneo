import { prisma } from "~/db.server";

export type {Order} from '@prisma/client';


export async function getOrders(){
    return await prisma.order.findMany({
        include:{
            Item: true,
        }
    });
}
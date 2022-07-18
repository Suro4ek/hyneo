import React from "react";
import Header from "~/components/Header";
import Shop from "~/components/Shop";
import Footer from "~/components/Footer";
import TLauncherModal from "~/components/TLauncherModal";
import {RecoilRoot, useSetRecoilState} from "recoil";
import BuyModal from "~/components/BuyModal";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Items } from "~/state/states";
import { prisma, PrismaClient } from "@prisma/client";
import {getCategories, getCategoriesByItems} from "~/models/category.server";

export const loader: LoaderFunction = async () => {
  const categories = await getCategoriesByItems();
  return {categories};
};


export default function Index() {
    const items = useLoaderData();
    return (
        <RecoilRoot>
            <Header/>
            <Shop items={items}/>
            {/* <Footer/> */}
            <TLauncherModal/>
            <BuyModal/>
        </RecoilRoot>
    );
}

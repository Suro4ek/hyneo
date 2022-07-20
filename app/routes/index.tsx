import Header from "~/components/Header";
import Shop from "~/components/Shop";
import TLauncherModal from "~/components/TLauncherModal";
import BuyModal from "~/components/BuyModal";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCategoriesByItems } from "~/models/category.server";
import { getMedthods } from "~/models/method.server";
import {RecoilRoot, useSetRecoilState} from "recoil";
import {Items, Methods} from "~/state/states";

export const loader: LoaderFunction = async () => {
    const categories = await getCategoriesByItems();
    const methods = await getMedthods();
    return { categories, methods };
};


export default function Index() {
    const loads =  useLoaderData();

    return (
        <>
            <Header />
            <Shop loads={loads}/>
            {/* <Footer/> */}
            <TLauncherModal />
            <BuyModal />
        </>

    );
}

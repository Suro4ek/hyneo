import Header from "~/components/Header";
import {RecoilRoot} from "recoil";
import {useLoaderData} from "@remix-run/react";
import type {LoaderFunction} from "@remix-run/node";
import Shop from "~/components/Shop";
import {getCategoriesByItems} from "~/models/category.server";
import {getMethods} from "~/models/method.server";
import BuyModal from "~/components/BuyModal";
import Footer from "~/components/Footer";
import TLauncherModal from "~/components/TLauncherModal";

export const loader: LoaderFunction = async () => {
    const categories = await getCategoriesByItems();
    const methods = await getMethods();
    const minecraft = {online: 100, slots: 100, max: 1000,}
    return { categories, methods, minecraft };
  };


export default function Index() {
    useLoaderData();

    return (
        <RecoilRoot>
            <Header />
             <Shop/>
             <Footer/>
            <TLauncherModal />
            <BuyModal />
        </RecoilRoot>

    );
}

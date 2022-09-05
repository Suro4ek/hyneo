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
import { getSettingsActive } from "~/models/settings.server";

export const loader: LoaderFunction = async ({request}) => {
    const categories = await getCategoriesByItems();
    const methods = await getMethods();
    let res = await fetch("https://api.hyneo.ru/online", {
        method: "GET"
    });
    console.log(res.status);
    const online = await res.json();
    let minecraft = {online: 100, slots: 100, max: 1000,}
    if(!online.error){
        minecraft = {online: online.online, slots: online.slots, max: online.max,}
    }
    const settings = await getSettingsActive(1);
    return { categories, methods, minecraft, settings};
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

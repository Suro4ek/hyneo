import Header from "~/components/Header";
import Shop from "~/components/Shop";
import TLauncherModal from "~/components/TLauncherModal";
import BuyModal from "~/components/BuyModal";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCategoriesByItems } from "~/models/category.server";
import { getMedthods } from "~/models/method.server";

export const loader: LoaderFunction = async () => {
    const categories = await getCategoriesByItems();
    const methods = await getMedthods();
    return { categories, methods };
  };

export default function Index() {
    const data =  useLoaderData();

    return (
        <>
            <Header />
            <Shop/>
            {/* <Footer/> */}
            <TLauncherModal />
            <BuyModal />
        </>

    );
}

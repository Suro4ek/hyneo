import React from "react";
import Header from "~/components/Header";
import Shop from "~/components/Shop";
import Footer from "~/components/Footer";
import TLauncherModal from "~/components/TLauncherModal";
import {RecoilRoot} from "recoil";
import BuyModal from "~/components/BuyModal";

export default function Index() {
    return (
        <RecoilRoot>
            <Header/>
            <Shop/>
            <Footer/>
            <TLauncherModal/>
            <BuyModal/>
        </RecoilRoot>
    );
}

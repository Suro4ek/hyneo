import { useSetRecoilState } from "recoil";
import Tabs from "~/components/Tabs";
import { Items, Methods } from "~/state/states";

const Shop = ({loads}:any) => {


    return(
        <div className="container mx-auto mt-24" id="shop">
            <div className="box-border">
                <div className="text-4xl text-center text-white w-full pt-2 pb-2" style={{backgroundColor:"rgba(255, 255, 255, 0.05)"}}>Магазин</div>
                <Tabs categories={loads.categories}/>
            </div>
        </div>
    )
}

export default Shop;
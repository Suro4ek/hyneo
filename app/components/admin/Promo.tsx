import {classNames} from "~/utils/utils";
import {useEffect} from "react";
import {useFetcher} from "@remix-run/react";
import {useSetRecoilState} from "recoil";
import {PromoCode} from "~/state/states";

const Promo = () => {
    const promo = useFetcher();
    const setPromocode = useSetRecoilState(PromoCode);
    useEffect(() => {
        if (promo.data?.promocode) {
            setPromocode({promo: promo.data.promocode, discount: promo.data.discount});
        }
    }, [promo.data])
    return(
        <promo.Form method="get" action="/callback/promo" >
            <div className="flex items-end">
                <div className="w-full">
                    <div>
                        <label htmlFor="first_name"
                               className="block mb-2 text-lg font-medium text-gray-900">
                            Промокод</label>
                        <input type="text" id="first_name"
                               className={classNames("bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5", promo.data?.errors ? "border-red-500 ring-red-500" : "focus:ring-blue-500 focus:border-blue-500")}
                               placeholder="Введите промокод" required name="promo"/>
                    </div>
                </div>
                {promo.data?.errors && <div className="mx-2 text-red-500 text-sm">{promo.data.errors.promo}</div>}
                {promo.data?.promocode && <div className="mx-2 text-green-500 text-sm">Промокод принят</div>}
                <div >
                    <button disabled={promo.state === "submitting"} name="action" value="promo"
                            className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg ml-2 text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40">
                        Проверить
                    </button>
                </div>
            </div>
        </promo.Form>
    )
}

export default Promo
import { useRecoilState, useRecoilValue } from "recoil";
import { Buy, BuyItem, PromoCode } from "~/state/states";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import BuyMethod from "~/components/BuyMethod";
import { useFetcher } from "@remix-run/react";
import { Interweave } from "interweave";
import Promo from "~/components/admin/Promo";



interface ActionData {
    errors?: {
        name?: string;
        method_id?: string;
        item_id?: string;
    }

}

const BuyModal = () => {
    const item = useRecoilValue(BuyItem);
    const promo = useRecoilValue(PromoCode)
    const buy = useFetcher();
    let actionData = buy.data as ActionData;
    const [isOpen, setOpen] = useRecoilState(Buy);
    console.log(item)
    useEffect(() => {
        actionData = buy.data as ActionData;
    }, [buy.data]);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-2xl lg:text-4xl font-medium leading-6 text-gray-600 text-center pb-4 border-b-2 border-gray-400"
                                >
                                    Покупка привелегии
                                </Dialog.Title>
                                <div className="flex">
                                    <div className="w-2/4 text-lg whitespace-normal">
                                        Описание
                                        <div className="mt-2 text-gray-400 ">
                                            <Interweave content={item.description} />
                                        </div>
                                    </div>
                                    <div className="w-2/4">
                                        {item.doplata === false ? (<div className="w-full mb-4">
                                            <Promo />
                                        </div>) : ""}

                                        <buy.Form action="/callback/buy" method="post">
                                            <div className="flex flex-col justify-between">
                                                <div className="">
                                                    <label htmlFor="first_name"
                                                        className="block mb-2 text-lg font-medium text-gray-900">Никнейм</label>
                                                    <input type="text" id="first_name"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                        placeholder="Введите никнейм" required name="name" />
                                                    {actionData?.errors?.name && <div className="mx-2 text-red-500 text-sm">s</div>}
                                                </div>
                                            </div>
                                            <input name="promo" value={promo.promo} hidden />
                                            <BuyMethod />
                                            {actionData?.errors?.method_id && <div className="mx-2 text-red-500 text-sm">actionData.errors.method_id</div>}
                                            <input name="item_id" hidden value={item.id} />
                                            <div>
                                                <div className="flex flex-row justify-center text-lg items-center">
                                                    <div className="mr-4 mb-2">
                                                        {item.price} руб {promo.discount !== 0 && <span className="text-red-500">-{promo.discount}%</span>}
                                                    </div>
                                                    <button type="submit"
                                                        className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2">
                                                        Купить или доплатить
                                                    </button>
                                                </div>
                                            </div>
                                        </buy.Form>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent absolute top-2 right-2"
                                    onClick={() => setOpen(false)}
                                >
                                    <IoCloseOutline className={"w-10 h-10"} />
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default BuyModal;
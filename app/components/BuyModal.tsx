import {useRecoilState, useRecoilValue} from "recoil";
import {Buy, BuyItem} from "~/state/states";
import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {IoCloseOutline} from "react-icons/io5";
import BuyMethod from "~/components/BuyMethod";
import { classNames } from "~/utils/utils";
import { Form, useFetcher } from "@remix-run/react";

const BuyModal = () => {
    const promo = useFetcher();
    const item = useRecoilValue(BuyItem);
    const [isOpen, setOpen] = useRecoilState(Buy);
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
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
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
                                            sdsdпарпаррррррррррррррррррррррррррррррррррррррррррррррррр паррррррррррррррррррррррррррррррррррррррррап паррррррррррпарррррррррррррррррррррр <br/> парарпрпрпрпрпрпрпрпрпрпрпрпрпрпрпрпрпр
                                        </div>
                                    </div>
                                    <div className="w-2/4">
                                        <Form action="/callback/buy" method="post">
                                        <div className="flex flex-row justify-between">
                                            <div className="w-1/2 mr-4">
                                                <label htmlFor="first_name"
                                                       className="block mb-2 text-lg font-medium text-gray-900">Никнейм</label>
                                                <input type="text" id="first_name"
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                       placeholder="Введите никнейм" required name="name"/>
                                            </div>
                                            <Form method="post" action="/callback/promo">
                                                <div className="w-full">
                                                    <label htmlFor="first_name"
                                                        className="block mb-2 text-lg font-medium text-gray-900">
                                                        Промокод</label>
                                                    <input type="text" id="first_name"
                                                        className={classNames("bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5", promo.data?.errors ? "border-red-500 ring-red-500" : "focus:ring-blue-500 focus:border-blue-500")}
                                                        placeholder="Введите промокод" required name="promo" onChange={(e) => promo.submit(e.target.form)}/>
                                                </div>
                                                {promo.data?.errors && <div className="text-red-500 text-sm">{promo.data.errors.promo}</div>}
                                            </Form>
                                        </div>
                                        <BuyMethod/>
                                        <input name="item_id" hidden value={item.id}/>
                                        <div>
                                            <div className="flex flex-row justify-center text-lg items-center">
                                                <div className="mr-4 mb-2">
                                                    {item.price} руб
                                                </div>
                                                <button type="submit"
                                                        className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2">
                                                    <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true"
                                                         focusable="false" data-prefix="fab" data-icon="bitcoin"
                                                         role="img" xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 512 512">
                                                        <path fill="currentColor"
                                                              d="M504 256c0 136.1-111 248-248 248S8 392.1 8 256 119 8 256 8s248 111 248 248zm-141.7-35.33c4.937-32.1-20.19-50.74-54.55-62.57l11.15-44.7-27.21-6.781-10.85 43.52c-7.154-1.783-14.5-3.464-21.8-5.13l10.93-43.81-27.2-6.781-11.15 44.69c-5.922-1.349-11.73-2.682-17.38-4.084l.031-.14-37.53-9.37-7.239 29.06s20.19 4.627 19.76 4.913c11.02 2.751 13.01 10.04 12.68 15.82l-12.7 50.92c.76 .194 1.744 .473 2.829 .907-.907-.225-1.876-.473-2.876-.713l-17.8 71.34c-1.349 3.348-4.767 8.37-12.47 6.464 .271 .395-19.78-4.937-19.78-4.937l-13.51 31.15 35.41 8.827c6.588 1.651 13.05 3.379 19.4 5.006l-11.26 45.21 27.18 6.781 11.15-44.73a1038 1038 0 0 0 21.69 5.627l-11.11 44.52 27.21 6.781 11.26-45.13c46.4 8.781 81.3 5.239 95.99-36.73 11.84-33.79-.589-53.28-25-65.99 17.78-4.098 31.17-15.79 34.75-39.95zm-62.18 87.18c-8.41 33.79-65.31 15.52-83.75 10.94l14.94-59.9c18.45 4.603 77.6 13.72 68.81 48.96zm8.417-87.67c-7.673 30.74-55.03 15.12-70.39 11.29l13.55-54.33c15.36 3.828 64.84 10.97 56.85 43.03z"></path>
                                                    </svg>
                                                   Купить или доплатить
                                                </button>
                                            </div>
                                        </div>
                                        </Form>
                                    </div>
                                </div>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent absolute top-2 right-2"
                                        onClick={() => setOpen(false)}
                                    >
                                        <IoCloseOutline className={"w-10 h-10"}/>
                                    </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default  BuyModal;
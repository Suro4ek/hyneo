import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {Tlauncher} from "~/state/states";
import {useRecoilState} from "recoil";
import {IoCloseOutline} from "react-icons/io5";
import how1 from "../images/how1.png";
import how2 from "../images/how2.png";
import how3 from "../images/how3.png";
import how4 from "../images/how4.png";
import how5 from "../images/how5.png";
import how6 from "../images/how6.png";

const TLauncherModal = () => {
    const [isOpen, setOpen] = useRecoilState(Tlauncher);

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
                                    Как начать играть
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-xl lg:text-2xl text-gray-500 text-center">
                                        Для начала вы должны скачать лаунчер с сайта TLauncher
                                    </p>
                                    <img className="" src={how1}/>
                                </div>

                                <div className="mt-2 flex justify-center flex-col">
                                    <p className="text-xl lg:text-2xl text-gray-500 text-center">
                                        После установки запустите клиент и выберите версию с 1.12-1.15,
                                        и введите придуманный ник
                                    </p>
                                    <img className="" src="https://tlauncher.org/img/tlauncher-2-0-how-to-start-playing.png"/>
                                </div>

                                <div className="mt-2 flex justify-center flex-col">
                                    <p className="text-xl lg:text-2xl text-gray-500 text-center">
                                        После нажмите установить и войдите в игру, затем выберите второй пункт
                                    </p>
                                    <img className="" src={how2}/>
                                </div>

                                <div className="mt-2 flex justify-center flex-col">
                                    <p className="text-xl lg:text-2xl text-gray-500 text-center">
                                        После чего добавьте наш IP:
                                        mc.hyneo.ru
                                    </p>
                                    <img className="" src={how3}/>
                                </div>

                                <div className="mt-2 flex justify-center flex-col">
                                    <p className="text-xl lg:text-2xl text-gray-500 text-center">
                                        Затем нажмите на наш сервер HyNeo и нажмите подключиться
                                    </p>
                                    <img className="" src={how4}/>
                                </div>

                                <div className="mt-2 flex justify-center flex-col">
                                    <p className="text-xl lg:text-2xl text-gray-500 text-center">
                                        Затем придумай пароль написав в чат /reg Пароль Пароль ещё раз
                                    </p>
                                    <img className="" src={how5}/>
                                </div>

                                <div className="mt-2 flex justify-center flex-col">
                                    <p className="text-xl lg:text-2xl text-gray-500 text-center">
                                        Поздравляем! Вы успешно вошли к нам на сервер
                                    </p>
                                    <img className="" src={how6}/>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent absolute top-2 right-2"
                                        onClick={() => setOpen(false)}
                                    >
                                        <IoCloseOutline className={"w-10 h-10"}/>
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default TLauncherModal
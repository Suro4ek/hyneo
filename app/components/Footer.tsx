import { Interweave } from "interweave";
import { useSettings } from "~/utils/utils";
import {FaDiscord, FaInstagram, FaVk, FaYoutube} from "react-icons/fa";

const Footer = () => {
    const settings = useSettings();
    return(
        <footer className="p-4 sm:p-6 container mx-auto">
            <div className="md:flex md:justify-between md:max-w-4xl md:mx-auto">
                <div className="mb-6 md:mb-0 md:w-2/3">
                    <div className="flex flex-col max-w-2xl text-white justify-items-starr">
                        <span
                            className="text-2xl font-semibold whitespace-nowrap">О HyNeo Network</span>
                        <div className="text-gray-600 dark:text-gray-400">
                           <Interweave content={settings.footer} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between md:w-2/3 md:pl-24">
                    <div className="w-full">
                        <h2 className="mb-6 text-sm text-white uppercase">Голосуйте за нас</h2>
                        <ul className="text-gray-600 dark:text-gray-400">
                            {settings.Vote.map((vote, index) => (
                                <li key={index} className="mb-2 last:mb-0">
                                    <a href={vote.url} className="hover:underline text-white hover:text-gray-400">{vote.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="float-right w-full">
                        <h2 className="mb-6 text-sm text-white uppercase">Ссылки</h2>
                        <ul className="text-gray-600 dark:text-gray-400">
                            {settings.Link.map((link, index) => (
                                <li key={index} className="mb-2 last:mb-0">
                                    <a href={link.url} className="hover:underline text-white hover:text-gray-400">{link.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
            <div className="sm:flex sm:items-center sm:justify-between md:max-w-4xl md:mx-auto">
                            <span className="text-sm text-gray-500 sm:text-center flex justify-center md:block">
                                © 2022 Все права защищены HyNeo Network
                                <br/>Сервер никак не связан с Mojang A.B.
                            </span>
                <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0 justify-center">
                    <a href="https://vk.com/hyneo" className="text-gray-500 hover:text-gray-900 dark:hover:text-white" target="_blank">
                        <FaVk className={"h-5 w-5"}/>
                        <span className="sr-only">ВК</span>
                    </a>
                    <a href="https://www.instagram.com/hyneonetwork/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white" target="_blank">
                        <FaInstagram className="h-5 w-5"/>
                        <span className="sr-only">Instagram</span>
                    </a>
                    <a href="https://www.youtube.com/channel/UC1v2_YJQsbe88n98IvUqrhg" className="text-gray-500 hover:text-gray-900 dark:hover:text-white" target="_blank">
                        <FaYoutube className="h-5 w-5"/>
                        <span className="sr-only">Youtube</span>
                    </a>
                    <a href="https://discord.hyneo.ru/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white" target="_blank">
                        <FaDiscord className="h-5 w-5"/>
                        <span className="sr-only">Discord</span>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
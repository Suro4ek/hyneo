import { BsShop } from "react-icons/bs"
import { IoNewspaperOutline } from "react-icons/io5"
import { GiHammerDrop, GiHelp } from "react-icons/gi"
import { TiSocialFacebook } from "react-icons/ti"
import logotype from "../images/logotype.png"
import {AiOutlineDown} from "react-icons/ai";

import { Link } from 'react-scroll'
import useVideo from "~/hooks/useVideo";
import HeaderItem from "~/components/HeaderItem";
import {useSetRecoilState} from "recoil";
import {Tlauncher} from "~/state/states";

const Header = () => {
    const {video} = useVideo();
    const setOpen = useSetRecoilState(Tlauncher);
    return (
        <header className={"w-full"}>
            <div className={"absolute w-full -z-40 "}>
                <video src={video} loop muted autoPlay preload={""} className={"w-full"}/>
            </div>
            <nav className="container mx-auto">
                <div className="relative flex justify-center items-center [&>*]:px-2 [&>*]:mr-2 md:[&>*]:px-4 pt-8 text-lg text-white">
                    <HeaderItem to={"#"}><BsShop
                        className="w-6 h-6 md:mr-2 md:-ml-1"/><span className="hidden md:block">Магазин</span></HeaderItem>
                    <HeaderItem to={"https://wiki.hyneo.ru"}><IoNewspaperOutline
                        className="w-6 h-6 md:mr-2 md:-ml-1"/> <span className="hidden md:block">Правила</span></HeaderItem>
                    <HeaderItem to={"https://ban.hyneo.ru"}><GiHammerDrop className="w-6 h-6 md:mr-2 md:-ml-1"/><span className="hidden md:block">Банлист</span></HeaderItem>
                    <HeaderItem to={"https://vk.me/hyneo"}><GiHelp className="w-6 h-6 md:mr-2 md:-ml-1"/><span className="hidden md:block">Помощь</span></HeaderItem>
                    <HeaderItem to={"https://forum.hyneo.ru"}><GiHelp className="w-6 h-6 md:mr-2 md:-ml-1"/><span className="hidden md:block">Форум</span></HeaderItem>
                    <HeaderItem to={"https://vk.com/hyneo"}><TiSocialFacebook className="w-6 h-6 md:mr-2 md:-ml-1"/><span className="hidden md:block">Группа
                        ВК</span></HeaderItem>
                </div>
            </nav>
            <main>
                <div className="container mx-auto text-white mt-24">
                    <div>
                        <div className="flex justify-center">
                            <img src={logotype} className="w-1/3 lg:w-1/6 md:w-1/4"/>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-center text-8xl text-[#ffa500] md:text-9xl"
                                 style={{textShadow: "0 0px 11px #ffffff"}}>
                                HYNEO
                            </div>
                            <div className="w-full mt-4 text-lg md:text-2xl flex flex-col md:flex-row text-center justify-center">
                                <button
                                    className="bg-[#ffa500] rounded-[50px] px-10 md:px-16 mt-4 h-14 mx-4 transition ease-in-out duration-[1000ms] hover:shadow-[0_0px_2rem_0px_#ffc55b] hover:bg-[#fdba40]"
                                    onClick={()=> setOpen(true)}
                                >
                                    Начать играть
                                </button>
                                <Link to="shop" smooth={true} duration={500}>
                                    <button
                                        className="px-16 h-14 mx-4 rounded-[50px] border mt-4 border-yellow-400 transition ease-in-out duration-[1000ms] hover:shadow-[0_0px_2rem_0px_#ffc55b] hover:bg-[#fdba40]"
                                    >Донат
                                    </button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 md:mt-24 container mx-auto text-white text-lg md:text-xl w-full flex flex-col md:flex-row justify-center items-center text-center">
                    <div className="w-full md:w-1/3">Всего слотов: 1000</div>
                    <div className="w-full md:w-1/3">Текущий онлайн: 1000</div>
                    <div className="w-full md:w-1/3">Максимальный онлайн: 1000</div>
                </div>
                <div className="mt-20 flex  justify-center text-center text-gray-700 transition duration-[1000ms] ease-in-out animate-bounce">
                    <Link to="shop" smooth={true} duration={500}><AiOutlineDown className="w-8 h-8 cursor-pointer "/></Link>
                </div>
            </main>
        </header>
    );
}
export default Header;
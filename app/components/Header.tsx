import { BsShop } from "react-icons/bs"
import { IoNewspaperOutline } from "react-icons/io5"
import { GiHammerDrop, GiHelp } from "react-icons/gi"
import { TiSocialFacebook } from "react-icons/ti"
import logotype from "../images/logotype.png"

const Header = () => {
    return (
        <header className={"w-full h-screen "}>
            <nav className="container mx-auto">
                <div className="relative flex justify-center items-center [&>*]:px-4 pt-8 text-lg text-white">
                    <a className="inline-flex items-center mr-2 mb-2"><BsShop className="w-6 h-6 mr-2 -ml-1" />Магазин</a>
                    <a className="inline-flex items-center mr-2 mb-2"><IoNewspaperOutline className="w-6 h-6 mr-2 -ml-1" /> Правила</a>
                    <a className="inline-flex items-center mr-2 mb-2"><GiHammerDrop className="w-6 h-6 mr-2 -ml-1" />Банлист</a>
                    <a className="inline-flex items-center mr-2 mb-2"><GiHelp className="w-6 h-6 mr-2 -ml-1" />Помощь</a>
                    <a className="inline-flex items-center mr-2 mb-2"><TiSocialFacebook className="w-6 h-6 mr-2 -ml-1" />Группа ВК</a>
                </div>
            </nav>
            <main>
                <div className="container px-48 mx-auto text-white mt-44">
                    <div className="w-full flex">
                        <div className="w-1/3">
                            <img src={logotype} />
                        </div>
                        <div className="w-2/3">
                            <div className="text-center text-9xl text-[#ffa500]" style={{ textShadow: "0 0px 11px #ffffff" }}>
                                HYNEO
                            </div>
                            <div className="mt-4 mb-4 -ml-2" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
                                <div className="text-center">
                                    Уникальный и ламповый проект, на котором вы найдёте два интересных выживания,
                                    <br />

                                    + с огромным функционалом, а также возможность запускать свой собственный сервер!
                                    <br />
                                    Сервер работает с версии ........
                                    <div className="pt-8">
                                        IP mc.hyneo.ru
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex text-2xl">
                                <button className="bg-[#ffa500] rounded-[50px] px-16 h-16 mx-4 transition ease-in-out duration-[1000ms] hover:shadow-[0_0px_2rem_-1px_#ffc55b] hover:bg-[#fdba40]">
                                    Начать играть
                                </button>
                                <button className="bg-[#ffa500] rounded-[50px] px-10 mx-4 transition ease-in-out duration-[1000ms] hover:shadow-[0_0px_2rem_-1px_#ffc55b] hover:bg-[#fdba40]"
                                >Донат</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </header>
    )
}
export default Header;
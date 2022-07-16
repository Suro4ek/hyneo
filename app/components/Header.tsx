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
                    <a className="flex"><BsShop className="w-6 h-6 mr-2" />Магазин</a>
                    <a className="flex"><IoNewspaperOutline className="w-6 h-6 mr-2" /> Правила</a>
                    <a className="flex"><GiHammerDrop className="w-6 h-6 mr-2" />Банлист</a>
                    <a className="flex"><GiHelp className="w-6 h-6 mr-2" />Помощь</a>
                    <a className="flex"><TiSocialFacebook className="w-6 h-6 mr-2" />Группа ВК</a>
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
                                    <br/>
                                    Сервер работает с версии ........
                                    <div className="pt-8">
                                            IP mc.hyneo.ru
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex">
                                <button>Начать играть</button>
                                <button>Донат</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </header>
    )
}
export default Header;
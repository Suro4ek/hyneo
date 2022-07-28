import * as Head from '@headlessui/react'
import { classNames, useCategories } from "~/utils/utils";
import { useSetRecoilState } from "recoil";
import { Buy, BuyItem } from "~/state/states";


export default function Tabs() {
    const setOpen = useSetRecoilState(Buy);
    const setbuyItem = useSetRecoilState(BuyItem);
    const items = useCategories();
    return (
        <div className="w-full px-2 py-16 sm:px-0">
            <Head.Tab.Group>
                <Head.Tab.List className="flex space-x-1 p-1 flex-col md:flex-row">
                    {items.map((category) => (
                        <Head.Tab
                            key={category.id}
                            className={({ selected }) =>
                                classNames(
                                    'w-full  py-2.5 text-sm font-medium leading-5 text-center',
                                    'focus:outline-none',
                                    selected
                                        ? 'text-[#ffc107] shadow border-b-2 border-[#ffc107]'
                                        : 'text-[#ffc10794] hover:bg-white/[0.12] hover:text-[#ffc107]'
                                )
                            }
                        >
                            {category.name}
                        </Head.Tab>
                    ))}
                </Head.Tab.List>
                <Head.Tab.Panels className="container my-12 mx-auto px-4 md:px-12">
                    {items.map((category) => (
                        <Head.Tab.Panel
                            key={category.id}
                            className={classNames(
                                'flex flex-wrap mx-1 lg:mx-48 justify-center items-stretch'
                            )}
                        >
                            {category.items.map((item) => (
                                <div key={item.id} className="my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 mt-4 group" >
                                    <div className="overflow-hidden shadow-2xl text-white h-full text-center text-2xl transition duration-[800ms] transform bg-tab-card hover:bg-tab-card-hover" onClick={() => {
                                        setbuyItem(item);
                                        setOpen(true);
                                    }
                                    }>
                                        <div className="border-b-[1px] border-white p-2">
                                            {item.name}
                                        </div>
                                        <div className="p-2 transition duration-[800ms] transform group-hover:scale-105">
                                            <img className="block w-[160px] h-[165px] mx-auto" src={item.imageSrc} alt="Картинка" />
                                        </div>
                                        <div className="border-b-[1px] border-t-[1px] border-white py-2 font-semibold" style={{textShadow: "rgb(0 0 0 / 60%) 1px 1px 2px"}}>
                                            <span className="">{item.price}₽</span> <span className='text-[#afb0b0] line-through'>{item.fake_price}₽</span>
                                        </div>
                                        <button className="py-2 transition duration-400 h-auto ease-in-out w-full hover:bg-[#ffc107]">
                                            Купить
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </Head.Tab.Panel>
                    ))}
                </Head.Tab.Panels>
            </Head.Tab.Group>
        </div>
    )
}

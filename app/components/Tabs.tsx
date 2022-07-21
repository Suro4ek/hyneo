import * as Head from '@headlessui/react'
import {classNames, useCategories} from "~/utils/utils";
// import {useSetRecoilState} from "recoil";
// import {Buy, BuyItem} from "~/state/states";


export default function Tabs() {
    // const setOpen = useSetRecoilState(Buy);
    // const setbuyItem = useSetRecoilState(BuyItem);
    const items = useCategories();
    return (
        <div className="w-full px-2 py-16 sm:px-0">
            <Head.Tab.Group>
                <Head.Tab.List className="flex space-x-1 p-1">
                    {items.map((category) => (
                        <Head.Tab
                            key={category.id}
                            className={({ selected }) =>
                                classNames(
                                    'w-full  py-2.5 text-sm font-medium leading-5 text-blue-700',
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
                                'flex flex-wrap mx-1 lg:mx-48 justify-center'
                            )}
                        >
                            {category.items.map((item) => (
                                <div key={item.id} className="my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 mt-4" >
                                    <div className="overflow-hidden text-white text-center text-2xl hover:bg-[#rgba(79, 57, 113, 0.51)]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
                                        <div className="border-b-2 border-white p-2">
                                            {item.name}
                                        </div>
                                        <div className="border-b-2 border-white p-2 transition duration-[800ms] transform hover:scale-105">
                                            <img className="block h-auto w-full" src="https://picsum.photos/600/400/?random"/>
                                        </div>
                                        <div className="border-b-2 border-white">
                                            {item.price}<span> {item.fake_price}</span>
                                        </div>
                                        <div className="-pb-12">
                                            <button className="transition duration-400 ease-in-out w-full hover:bg-[#ffc107]" onClick={() => 
                                                {
                                                    // setbuyItem(item);
                                                    // setOpen(true);   
                                                }
                                                }>
                                                Купить
                                            </button>
                                        </div>
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

import { Tab } from '@headlessui/react'
import {classNames} from "~/utils/utils";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {Buy, Items} from "~/state/states";


export default function Tabs({categories}) {
    const setOpen = useSetRecoilState(Buy);
    console.log(categories)
    return (
        <div className="w-full px-2 py-16 sm:px-0">
            <Tab.Group>
                <Tab.List className="flex space-x-1 p-1">
                    {categories.map((category) => (
                        <Tab
                            key={category}
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
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="container my-12 mx-auto px-4 md:px-12">
                    {categories.map((category) => (
                        <Tab.Panel
                            key={category.id}
                            className={classNames(
                                'flex flex-wrap mx-1 lg:mx-48 justify-center'
                            )}
                        >
                            {category.items.map((item) => (
                                <div className="my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 mt-4" >
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
                                            <button className="transition duration-400 ease-in-out w-full hover:bg-[#ffc107]" onClick={() => setOpen(true)}>
                                                Купить
                                            </button>
                                        </div>
                                        {/*<a href="#">*/}
                                        {/*    <img alt="Placeholder" className="block h-auto w-full"*/}
                                        {/*         src="https://picsum.photos/600/400/?random"/>*/}
                                        {/*</a>*/}

                                        {/*<header*/}
                                        {/*    className="flex items-center justify-between leading-tight p-2 md:p-4">*/}
                                        {/*    <h1 className="text-lg">*/}
                                        {/*        <a className="no-underline hover:underline text-black" href="#">*/}
                                        {/*            Article Title*/}
                                        {/*        </a>*/}
                                        {/*    </h1>*/}
                                        {/*    <p className="text-grey-darker text-sm">*/}
                                        {/*        11/1/19*/}
                                        {/*    </p>*/}
                                        {/*</header>*/}

                                        {/*<footer*/}
                                        {/*    className="flex items-center justify-between leading-none p-2 md:p-4">*/}
                                        {/*    <a className="flex items-center no-underline hover:underline text-black"*/}
                                        {/*       href="#">*/}
                                        {/*        <img alt="Placeholder" className="block rounded-full"*/}
                                        {/*             src="https://picsum.photos/32/32/?random"/>*/}
                                        {/*            <p className="ml-2 text-sm">*/}
                                        {/*                Author Name*/}
                                        {/*            </p>*/}
                                        {/*    </a>*/}
                                        {/*    <a className="no-underline text-grey-darker hover:text-red-dark"*/}
                                        {/*       href="#">*/}
                                        {/*        <span className="hidden">Like</span>*/}
                                        {/*        <i className="fa fa-heart"></i>*/}
                                        {/*    </a>*/}
                                        {/*</footer>*/}

                                    </div>

                                </div>
                            ))}
                        </Tab.Panel>
                        ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

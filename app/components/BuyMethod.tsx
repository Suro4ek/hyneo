import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { useMethods } from '~/utils/utils';
import {useRecoilState} from "recoil";
import {BuyItem} from "~/state/states";

export default function BuyMethod() {
    const methods = useMethods();
    const [item, setItem] = useRecoilState(BuyItem);
    const [selected, setSelected] = useState(methods[0])

    return (
        <div className="w-full py-10">
            <div className="w-full">
                <input hidden value={selected == null ? -1 : selected.id} name="method_id"/>
                <RadioGroup value={selected} onChange={setSelected}>
                    <RadioGroup.Label >Методы оплаты</RadioGroup.Label>
                    <div className="space-y-2">
                        {methods.map((plan, index) => {
                            if((item.price < 50 || item.price > 5000) &&index === 2) {
                                return(
                                    <></>
                                )
                            }
                            return (
                            <RadioGroup.Option
                                key={plan.title}
                                value={plan}
                                className={({active, checked}) =>
                                    `${
                                        active
                                            ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                            : ''
                                    }
                  ${
                                        checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                                    }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                }
                            >
                                {({active, checked}) => (
                                    <>
                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="text-sm">
                                                    <RadioGroup.Label
                                                        as="p"
                                                        className={`font-medium  ${
                                                            checked ? 'text-white' : 'text-gray-900'
                                                        }`}
                                                    >
                                                        {plan.title}
                                                    </RadioGroup.Label>
                                                </div>
                                            </div>
                                            {checked && (
                                                <div className="shrink-0 text-white">
                                                    <CheckIcon className="h-6 w-6"/>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                            )})}
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}

function CheckIcon(props:any) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

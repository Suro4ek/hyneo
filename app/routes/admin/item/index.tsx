import {Link, useLoaderData} from "@remix-run/react";
import {json, LoaderFunction} from "@remix-run/node";
import {getItems} from "~/models/item.server";

export const loader: LoaderFunction = async ({ request }) => {
    const items = await getItems();
    return json({ items });
}


const ItemPage = () => {
    const items = useLoaderData().items;
    console.log(items)
    return(
        <div className="overflow-x-auto relative shadow-md">
        <div className="grid place-items-center ">
            <ul className="mt-4 flex flex-wrap text-sm font-medium text-center">
                <li className="mr-2">
                    <Link to={"/admin/item/new"} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >Добавить товар</Link>
                </li>
            </ul>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-4">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="py-3 px-6">
                        Номер
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Название
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Стоимость
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Фейковая стоимость
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Доплата
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Категория
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Статус
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Сервер
                    </th>
                    <th scope="col" className="py-3 px-6">
                        <span className="sr-only">Редактировать</span>
                    </th>
                    <th scope="col" className="py-3 px-6">
                        <span className="sr-only">Удалить</span>
                    </th>
                </tr>
            </thead>
            <tbody>
            {
                items.map((item, index:number) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="py-4 px-6">
                            {item.id}
                        </td>
                        <td className="py-4 px-6">
                            {item.name}
                        </td>
                        <td className="py-4 px-6">
                            {item.price}
                        </td>
                        <td className="py-4 px-6">
                            {item.fake_price}
                        </td>
                        <td className="py-4 px-6">
                            {item.doplata ? "Да" : "Нет"}
                        </td>
                        <td className="py-4 px-6">
                            {item.category !== null ? item.category.name : "Нет"}
                        </td>
                        <td className="py-4 px-6">
                            {item.active ? "Активная" : "Неактивная"}
                        </td>
                        <td className="py-4 px-6">
                            {item.Server !== null ? item.Server.name : "Нет"}
                        </td>
                        <td className="py-4 px-6">
                            <Link to={`/admin/item/${item.id}`} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Редактировать</Link>
                        </td>
                        <td className="py-4 px-6">
                            <Link to={`/admin/item/delete/${item.id}`} className="focus:outline-none text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Удалить</Link>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    </div>
    )
}

export default ItemPage;
import {Link, useLoaderData} from "@remix-run/react";
import {json, LoaderFunction} from "@remix-run/node";
import { getMethodsAdmin } from "~/models/method.server";

export const loader: LoaderFunction = async ({ request }) => {
    const methods = await getMethodsAdmin();
    return json({ methods });
}


const ItemPage = () => {
    const methods = useLoaderData().methods;
    return(
        <div className="overflow-x-auto relative shadow-md">
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
                        <span className="sr-only">Редактировать</span>
                    </th>
                </tr>
            </thead>
            <tbody>
            {
                methods.map((method, index:number) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="py-4 px-6">
                            {method.id}
                        </td>
                        <td className="py-4 px-6">
                            {method.name}
                        </td>
                        <td className="py-4 px-6">
                            <Link to={`/admin/method/${method.id}`} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Редактировать</Link>
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
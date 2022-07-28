import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getOrders, Order } from "~/models/order.server";

export const loader:LoaderFunction = async ({
    request,
    }) => {
    const orders = await getOrders();
    return {
        orders,
    };

}


const AdminPage = () => {
    const data = useLoaderData();
    const orders = data.orders;
    return (
        <div className="overflow-x-auto relative shadow-md">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                           Номер заказа
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Имя игрока
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Статус
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Товар
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Сумма
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Способ оплаты
                        </th>
                    </tr>
                </thead>
                <tbody>
                {
                orders.map((order:Order, index:number) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="py-4 px-6">
                            {order.Id}
                        </td>
                        <td className="py-4 px-6">
                            {order.username}
                        </td>
                        <td className="py-4 px-6">
                            {order.status}
                        </td>
                        <td className="py-4 px-6">
                            {order.Item.name}
                        </td>
                        <td className="py-4 px-6">
                            {order.summa}
                        </td>
                        <td className="py-4 px-6">
                            {order.method}
                        </td>
                    </tr>
                ))
            }
                </tbody>
            </table>
        </div>
    )
}

export default AdminPage;

const AdminPage = () => {
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

                </tbody>
            </table>
        </div>
    )
}

export default AdminPage;
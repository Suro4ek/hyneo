import { Link } from "@remix-run/react";

const SettingsPage = () => {
    return (
        <div className="overflow-x-auto relative shadow-md h-screen">
            <div className="grid place-items-center">
                <ul className="mt-4 flex flex-wrap text-sm font-medium text-center">
                    <li className="mr-2">
                        <Link to={"/admin/settings/links"} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >Настройки ссылок</Link>
                        <Link to={"/admin/settings/vote/"} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >Настройки голосований</Link>
                        <Link to={"/admin/settings/1"} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >Изменить footer</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SettingsPage;
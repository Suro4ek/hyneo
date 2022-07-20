import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import InputLabel from "~/components/admin/InputLabel";
import { CreateServer, updateServer } from "~/models/servers.server";

interface ActionData {
    errors?: {
        name?: string;
        ip?: string;
        port?: string;
        password?: string;
    };
}

export const action: ActionFunction = async ({
                                                 request
                                             }) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const active = formData.get("active");
    const ip = formData.get("ip");
    const port = formData.get("port");
    const password = formData.get("password");

    if (typeof name !== "string") {
        return json<ActionData>(
            { errors: { name: "Имя не задано" } },
            { status: 400 }
        );
    }

    if(name.length < 4){
        return json<ActionData>(
            { errors: { name: "Имя слишком короткое" } },
            { status: 400 }
        );
    }
    if(typeof ip !== "string" || ip.length == 0) {
        return json<ActionData>(
            { errors: { ip: "Айпи не задан" } },
            { status: 400 }
        );
    }
    if(typeof port !== "string" || port.length == 0) {
        return json<ActionData>(
            { errors: { port: "Порт не задан" } },
            { status: 400 }
        );
    }
    if(typeof password !== "string" || password.length == 0) {
        return json<ActionData>(
            { errors: { port: "Пароль не задан" } },
            { status: 400 }
        );
    }
    await CreateServer(name, ip, port, password, active === "on");

    return redirect("/admin/server");
};

const ServerAdd = () => {
    const actionData = useActionData() as ActionData;

    return (
        <Form method="post">
            <div className="container mx-auto">
                <h1 className="text-gray-900 dark:text-gray-300 text-center">Добавление сервера</h1>
                <InputLabel actionData={actionData} defaultvalue={""} value={'name'} name={"Название"} type="text"/>
                <InputLabel actionData={actionData} defaultvalue={""} value={'ip'} name={"IP"} type="text"/>
                <InputLabel actionData={actionData} defaultvalue={""} value={'port'} name={"PORT"} type="text"/>
                <InputLabel actionData={actionData} defaultvalue={""} value={'password'} name={"Пароль"} type="password"/>
                <div className="flex items-center justify-center mt-8">
                    <div className="flex items-center ml-4">
                        <input
                            id="active"
                            name="active"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="active"
                            className="ml-2 block text-sm text-white"
                        >
                            Активный
                        </label>
                    </div>
                </div>
                <div className="grid place-items-center mt-4">
                    <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Создать</button>
                </div>

            </div>
        </Form>
    )
}

export default ServerAdd;
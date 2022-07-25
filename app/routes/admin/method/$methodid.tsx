import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import InputLabel from "~/components/admin/InputLabel";
import { getMethod, updateMethod } from "~/models/method.server";

export const loader :LoaderFunction = async ({request, params}) => {
    const methodId = params.methodid;
    //sting to int
    const methodIdInt = parseInt(methodId || "0");
    const method = await getMethod(methodIdInt);
    if (!method) {
        return {
            status: 404,
            body: "Method not found",
        };
    }
    return {
        status: 200,
        body: method,
    };
}

interface ActionData {
    errors?: {
        name?: string;
        public?: string;
        secret?: string;
    };
}

export const action: ActionFunction = async ({
    request, params
}) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const public_key = formData.get("public");
    const secret_key = formData.get("secret");
    const active = formData.get("active");
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
    if (typeof public_key !== "string") {
        return json<ActionData>(
            { errors: { public: "Публичный ключ не задан" } },
            { status: 400 }
        );
    }
    if (typeof secret_key !== "string") {
        return json<ActionData>(
            { errors: { secret: "Секректный ключ не задан" } },
            { status: 400 }
        );
    }
    const methodId = params.methodid;
    const methodIdInt = parseInt(methodId || "0");

    const method = await updateMethod(methodIdInt, name, public_key, secret_key, active === "on" ? true : false);
    if(!method){
        return json<ActionData>(
            { errors: { name: "Метод с таким именем не существует" } },
            { status: 400 }
        );
    }
    
    return redirect("/admin/method");
};

const MethodEdit = () => {
    const method = useLoaderData().body;
    const actionData = useActionData() as ActionData;
    return (
        <Form method="post">
            <div className="container mx-auto">
                <h1 className="text-gray-900 dark:text-gray-300 text-center">Редактирование метода оплаты</h1>
                <InputLabel actionData={actionData} defaultvalue={method.title} value={'name'} name={"Название"} type="text"/>
                <InputLabel actionData={actionData} defaultvalue={method.methodkey.PUBLIC_KEY} value={'public'} name={"Публичный ключ или ID магазина"} type="text"/>
                <InputLabel actionData={actionData} defaultvalue={method.methodkey.SECRET_KEY} value={'secret'} name={"Секретный ключ"} type="password"/>
                <div className="flex items-center justify-center">
                    <div className="flex items-center">
                        <input
                            id="active"
                            name="active"
                            type="checkbox"
                            defaultChecked={method.isActive}
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
                    <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Редактировать</button>
                </div>

            </div>
        </Form>
    )
}

export default MethodEdit;
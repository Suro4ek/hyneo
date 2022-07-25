import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import {getCategoriesActive} from "~/models/category.server";
import ListBox from "~/components/admin/ListBox";
import {getItemById, updateItem} from "~/models/item.server";
import InputLabel from "~/components/admin/InputLabel";
import {getServersActive} from "~/models/servers.server";
import RichTextEditorClient from "~/components/admin/RichTextEditor.client";
import React from "react";

export const loader :LoaderFunction = async ({request, params}) => {
    const itemId = params.itemid;
    const categories = await getCategoriesActive();
    const servers = await getServersActive();

    //sting to int
    const itemIdInt = parseInt(itemId || "0");
    const item = await getItemById(itemIdInt);
    if (!item) {
        return {
            status: 404,
            body: "Item not found",
        };
    }
    return {
        status: 200,
        body: item,
        categories: categories,
        servers: servers,
    };
}

interface ActionData {
    errors?: {
        name?: string;
        price?: string;
        fake_price?: string;
        description?: string;
        category_id?: string;
        server_id?: string;
        command?: string;
        image?: string;
    };
}

export const action: ActionFunction = async ({
                                                 request,
                                                 params
                                             }) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const active = formData.get("active");
    const description = formData.get("description");
    const price = formData.get("price");
    const command = formData.get("command");
    const fake_price = formData.get("fake_price");
    const categoryId = formData.get("category_id");
    const serverId = formData.get("server_id");
    const doplata = formData.get("doplata");
    if (typeof name !== "string") {
        return json<ActionData>(
            { errors: { name: "Имя не задано" } },
            { status: 400 }
        );
    }
    if (typeof command != "string") {
        return json<ActionData>(
            { errors: { command: "Команда не задана" } },
            { status: 400 }
        );
    }
    if(typeof price !== "string"){
        return json<ActionData>(
            { errors: { price: "Цена не задана" } },
            { status: 400 }
        );
    }
    if(typeof fake_price !== "string"){
        return json<ActionData>(
            { errors: { fake_price: "Цена не задана" } },
            { status: 400 }
        );
    }
    if(typeof description !== "string"){
        return json<ActionData>(
            { errors: { description: "Описание не задано" } },
            { status: 400 }
        );
    }
    if(typeof categoryId !== "string"){
        return json<ActionData>(
            { errors: { category_id: "Категория не задана" } },
            { status: 400 }
        );
    }
    if(typeof serverId !== "string"){
        return json<ActionData>(
            { errors: { server_id: "Сервер не задан" } },
            { status: 400 }
        );
    }
    const priceInt = parseInt(price || "0");
    const fake_priceInt = parseInt(fake_price || "0");
    const categoryIdInt = parseInt(categoryId || "0");
    const serverIdInt = parseInt(serverId || "0");
    if (name.length < 4) {
        return json<ActionData>(
            { errors: { name: "Имя слишком короткое" } },
            { status: 400 }
        );
    }
    if (priceInt === 0 || isNaN(priceInt)) {
        return json<ActionData>(
            { errors: { price: "Цена не задана" } },
            { status: 400 }
        );
    }
    if (fake_priceInt === 0 || isNaN(fake_priceInt)) {
        return json<ActionData>(
            { errors: { fake_price: "Цена не задана" } },
            { status: 400 }
        );
    }
    if (categoryIdInt == 0 || isNaN(categoryIdInt)) {
        return json<ActionData>(
            { errors: { category_id: "Категория не задана" } },
            { status: 400 }
        );
    }
    if (serverIdInt == 0 || isNaN(serverIdInt)) {
        return json<ActionData>(
            { errors: { server_id: "Сервер не задан" } },
            { status: 400 }
        );
    }
    const itemId = params.itemid;
    //sting to int
    const itemIdInt = parseInt(itemId || "0");
    await updateItem(itemIdInt, name, description, command, priceInt, fake_priceInt, categoryIdInt,serverIdInt, active === "on", doplata === "on");


    return redirect("/admin/item");
};

const ItemEdit = () => {
    const data = useLoaderData();

    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);
    const item = data.body;
    const categories = data.categories;
    const servers = data.servers;
    const actionData = useActionData() as ActionData;
    return (
        <Form method="post">
            <div className="container mx-auto">
                <h1 className="text-gray-900 dark:text-gray-300 text-center">Редактирование товара</h1>
                <InputLabel actionData={actionData} defaultvalue={item.name} value={'name'} name={"Название"} type="text"/>
                <div className="mt-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Описание</label>
                    {mounted ?    <RichTextEditorClient value={item.description}/>: null}
                    {actionData?.errors?.description && (
                        <div className="pt-1 text-red-700" id="username-error">
                            {actionData?.errors.description}
                        </div>
                    )}
                </div>
                <InputLabel actionData={actionData} defaultvalue={item.price} value={'price'} name={"Стоимость"} type="text"/>
                <InputLabel actionData={actionData} defaultvalue={item.fake_price} value={'fake_price'} name={"Cтоимость без скидки"} type="text"/>
                <InputLabel actionData={actionData} defaultvalue={item.command} value={'command'} name={"Команда"} type="text" />
                <InputLabel actionData={actionData} defaultvalue={item.imageSrc} value={'image'} name={"Ссылка на картинку"} type="text" />
                <div className="mt-6">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Категория</label>
                    <ListBox lists={categories} def={item.category !== null ? categories.filter((category) => category.id === item.category.id)[0] : null} name_value="category_id" />
                    {actionData?.errors?.category_id && (
                        <div className="pt-1 text-red-700" id="username-error">
                            {actionData?.errors.category_id}
                        </div>
                    )}
                </div>
                <div className="mt-6">
                    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Сервер</label>
                    <ListBox lists={servers} def={item.Server !== null ? servers.filter((server) => server.id === item.Server.id)[0] : null} name_value="server_id" />
                    {actionData?.errors?.server_id && (
                        <div className="pt-1 text-red-700" id="username-error">
                            {actionData?.errors.server_id}
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-center mt-8">
                    <div className="flex items-center">
                        <input
                            id="doplata"
                            name="doplata"
                            type="checkbox"
                            defaultChecked={item.doplata}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="doplata"
                            className="ml-2 block text-sm text-white"
                        >
                            Доплата
                        </label>
                    </div>
                    <div className="flex items-center ml-4">
                        <input
                            id="active"
                            name="active"
                            type="checkbox"
                            defaultChecked={item.active}
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

export default ItemEdit;
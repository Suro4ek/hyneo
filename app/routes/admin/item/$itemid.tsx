import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import {getCategories} from "~/models/category.server";
import ListBox from "~/components/admin/ListBox";
import {getItemById, updateItem} from "~/models/item.server";
import InputLabel from "~/components/admin/InputLabel";

export const loader :LoaderFunction = async ({request, params}) => {
    const itemId = params.itemid;
    const categories = await getCategories();
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
    };
}

interface ActionData {
    errors?: {
        name?: string;
        price?: string;
        fake_price?: string;
        description?: string;
    };
}

export const action: ActionFunction = async ({
                                                 request,
                                                 params
                                             }) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const active = formData.get("active");
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string);
    const fake_price = parseInt(formData.get("fake_price") as string);
    const categoryId = parseInt(formData.get("category_id") as string);
    const doplata = formData.get("doplata");
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
    if(price === 0) {
        return json<ActionData>(
            { errors: { price: "Цена не задана" } },
            { status: 400 }
        );
    }
    if(fake_price === 0) {
        return json<ActionData>(
            { errors: { fake_price: "Цена не задана" } },
            { status: 400 }
        );
    }
    const itemId = params.itemid;
    //sting to int
    const itemIdInt = parseInt(itemId || "0");
    if(!categoryId){
        await updateItem(itemIdInt,name, description, price, fake_price, 0, active === "on", doplata === "on");
    }else{
        await updateItem(itemIdInt,name, description, price, fake_price, categoryId, active === "on", doplata === "on");
    }

    return redirect("/admin/item");
};

const ItemEdit = () => {
    const data = useLoaderData();
    const item = data.body;
    const categories = data.categories;
    const actionData = useActionData() as ActionData;


    return (
        <Form method="post">
            <div className="container mx-auto">
                <h1 className="text-gray-900 dark:text-gray-300 text-center">Добавление товара</h1>
                <InputLabel actionData={actionData} defaultvalue={item.name} value={'name'} name={"Название"} type="text"/>
                <InputLabel actionData={actionData} defaultvalue={item.description} value={'description'} name={"Описание"} type="text"/>
                <InputLabel actionData={actionData} defaultvalue={item.price} value={'price'} name={"Стоимость"} type="text"/>
                <InputLabel actionData={actionData} defaultvalue={item.fake_price} value={'fake_price'} name={"Cтоимость без скидки"} type="text"/>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Категория</label>
                <ListBox lists={categories} def={item.category !== null ? categories.filter((category) => category.id === item.category.id)[0] : null} name_value="category_id"/>
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
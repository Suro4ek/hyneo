import {Form, useActionData, useLoaderData} from "@remix-run/react";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import React from "react";
import {createCategory, getCategories, getCategoryByName} from "~/models/category.server";
import ListBox from "~/components/admin/ListBox";
import {createItem} from "~/models/item.server";

interface ActionData {
    errors?: {
        name?: string;
        price?: string;
        fake_price?: string;
        description?: string;
    };
}

export const loader : LoaderFunction = async ({
    request,
}) => {
    const categories = await getCategories();
    return json(categories)
}

export const action: ActionFunction = async ({
    request,
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
    if(!categoryId){
        await createItem(name, description, price, fake_price, 0, active === "on", doplata === "on");
    }else{
        await createItem(name, description, price, fake_price, categoryId, active === "on", doplata === "on");
    }

    return redirect("/admin/item");
};

const AddItem = () => {
    const categories = useLoaderData();
    const actionData = useActionData() as ActionData;
    const nameRef = React.useRef<HTMLInputElement>(null);
    const priceRef = React.useRef<HTMLInputElement>(null);
    const fakePriceReft = React.useRef<HTMLInputElement>(null);
    const descriptionRef = React.useRef<HTMLInputElement>(null);


    React.useEffect(() => {
        if (actionData?.errors?.name) {
            nameRef.current?.focus();
        }else if(actionData?.errors?.price){
            priceRef.current?.focus();
        }else if(actionData?.errors?.fake_price){
            fakePriceReft.current?.focus();
        }else if(actionData?.errors?.description){
            descriptionRef.current?.focus();
        }
    }, [actionData]);

    return (
        <Form method="post">
            <div className="container mx-auto">
                <h1 className="text-gray-900 dark:text-gray-300 text-center">Добавление товара</h1>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Название</label>
                    <input
                        ref={nameRef}
                        id="name"
                        required
                        autoFocus={true}
                        name="name"
                        type="text"
                        autoComplete="name"
                        aria-invalid={actionData?.errors?.name ? true : undefined}
                        aria-describedby="name-error"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {actionData?.errors?.name && (
                        <div className="pt-1 text-red-700" id="username-error">
                            {actionData.errors.name}
                        </div>
                    )}

                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Описание</label>
                    <input
                        ref={descriptionRef}
                        id="description"
                        required
                        autoFocus={true}
                        name="description"
                        type="text"
                        autoComplete="description"
                        aria-invalid={actionData?.errors?.name ? true : undefined}
                        aria-describedby="description-error"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {actionData?.errors?.description && (
                        <div className="pt-1 text-red-700" id="username-error">
                            {actionData.errors.description}
                        </div>
                    )}

                </div>
                <div className="mb-6">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Стоимость</label>
                    <input
                        ref={priceRef}
                        id="price"
                        required
                        autoFocus={true}
                        name="price"
                        type="text"
                        autoComplete="price"
                        aria-invalid={actionData?.errors?.name ? true : undefined}
                        aria-describedby="price-error"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {actionData?.errors?.price && (
                        <div className="pt-1 text-red-700" id="username-error">
                            {actionData.errors.price}
                        </div>
                    )}

                </div>
                <div className="mb-6">
                    <label htmlFor="fake_price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cтоимость без скидки</label>
                    <input
                        ref={fakePriceReft}
                        id="fake_price"
                        required
                        autoFocus={true}
                        name="fake_price"
                        type="text"
                        autoComplete="fake_price"
                        aria-invalid={actionData?.errors?.name ? true : undefined}
                        aria-describedby="fake_price-error"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {actionData?.errors?.fake_price && (
                        <div className="pt-1 text-red-700" id="username-error">
                            {actionData.errors.fake_price}
                        </div>
                    )}

                </div>
                <label htmlFor="fake_price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Категория</label>
                <ListBox lists={categories} def={null} name_value="category_id"/>
                <div className="flex items-center justify-center mt-8">
                    <div className="flex items-center">
                        <input
                            id="doplata"
                            name="doplata"
                            type="checkbox"
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

export default AddItem;
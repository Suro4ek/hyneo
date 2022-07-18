import { Form, useActionData } from "@remix-run/react";
import { ActionFunction, json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import React from "react";
import { createCategory, getCategoryByName } from "~/models/category.server";

interface ActionData {
    errors?: {
        name?: string;
    };
}

export const action: ActionFunction = async ({
    request,
}) => {
    const formData = await request.formData();
    const name = formData.get("name");
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

    const category = await getCategoryByName(name);
    if(category){
        return json<ActionData>(
            { errors: { name: "Категория с таким именем уже существует" } },
            { status: 400 }
        );
    }
    await createCategory(name, active === "on" ? true : false);
    return redirect("/admin/category");
};

const AddCategory = () => {
    const actionData = useActionData() as ActionData;
    const nameRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (actionData?.errors?.name) {
            nameRef.current?.focus();
        }
    }, [actionData]);

    return (
        <Form method="post">
            <div className="container mx-auto">
                <h1 className="text-gray-900 dark:text-gray-300 text-center">Добавление категории</h1>
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
                <div className="flex items-center justify-center">
                    <div className="flex items-center">
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

export default AddCategory;
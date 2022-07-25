import { Form, useActionData } from "@remix-run/react";
import { ActionFunction, json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import InputLabel from "~/components/admin/InputLabel";
import { createPromo } from "~/models/promo.server";

interface ActionData {
    errors?: {
        name?: string;
        count?: string;
        discount?: string;
    };
}

export const action: ActionFunction = async ({
    request,
}) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const count = formData.get("count");
    const discount = formData.get("discount");
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
    if (typeof count !== "string") {
        return json<ActionData>(
            { errors: { count: "Количество не задано" } },
            { status: 400 }
        );
    }
    if (typeof discount !== "string") {
        return json<ActionData>(
            { errors: { discount: "Скидка не задана" } },
            { status: 400 }
        );
    }
    const countInt = parseInt(count || "0");
    const discountInt = parseInt(discount || "0");
    if(countInt === 0 || isNaN(countInt)){
        return json<ActionData>(
            { errors: { count: "Количество не задано" } },
            { status: 400 }
        );
    }
    if(discountInt === 0 || isNaN(discountInt) || discountInt > 100 || discountInt < 0){
        return json<ActionData>(
            { errors: { discount: "Скидка не задана" } },
            { status: 400 }
        );
    }
    await createPromo(name, countInt, discountInt, active === "on" ? true : false);
    return redirect("/admin/promo");
};

const AddPromo = () => {
    const actionData = useActionData() as ActionData;

    return (
        <Form method="post">
            <div className="container mx-auto">
                <h1 className="text-gray-900 dark:text-gray-300 text-center">Добавление промокода</h1>
                <InputLabel actionData={actionData} defaultvalue={""} value={'name'} name={"Название"} type="text"/>
                <InputLabel actionData={actionData} defaultvalue={""} value={'count'} name={"Количество (-1 бесконечный)"} type="text"/>
                <InputLabel actionData={actionData} defaultvalue={""} value={'discount'} name={"Скидка"} type="text"/>
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

export default AddPromo;
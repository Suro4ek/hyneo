import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import InputLabel from "~/components/admin/InputLabel";
import { getPromo, updatePromo } from "~/models/promo.server";

export const loader: LoaderFunction = async({
    request, params
}) => {
    const promoId = params.promoid;
    //string to int
    const promoIdInt = parseInt(promoId || "0");
    const promo = await getPromo(promoIdInt);
    if (!promo) {
        return {
            status: 404,
            body: "Promo not found",
        };
    }
    return {
        status: 200,
        body: promo,
    };
}

interface ActionData {
    errors?: {
        name?: string;
        count?: string;
        discount?: string;
    };
}

export const action: ActionFunction = async ({
    request, params
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
    const promoId = params.promoid;
    const promoIdInt = parseInt(promoId || "0");
    await updatePromo(promoIdInt, name, countInt, discountInt, active === "on" ? true : false);
    return redirect("/admin/promo");
};

const EditPromo = () => {
    const promo = useLoaderData().body;
    const actionData = useActionData() as ActionData;

    return (
        <Form method="post">
            <div className="container mx-auto">
                <h1 className="text-gray-900 dark:text-gray-300 text-center">Редактирование промокода</h1>
                <InputLabel actionData={actionData} defaultvalue={promo.name} value={'name'} name={"Название"} type="text"/>
                <InputLabel actionData={actionData} defaultvalue={promo.count} value={'count'} name={"Количество (-1 бесконечный)"} type="text"/>
                <InputLabel actionData={actionData} defaultvalue={promo.discount} value={'discount'} name={"Скидка"} type="text"/>
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
                    <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Сохранить</button>
                </div>

            </div>
        </Form>
    )
}

export default EditPromo;
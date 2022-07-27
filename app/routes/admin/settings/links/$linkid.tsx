import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import InputLabel from "~/components/admin/InputLabel";
import {getVoteById, updateVote, Vote } from "~/models/vote.server";
import { getLinkByID, Links, updateLink } from "~/models/link.server";

export const loader: LoaderFunction = async ({
    request, params
}) => {
    const voteId = params.linkid;
    const voteInt = parseInt(voteId || "0");
    const link = await getLinkByID(voteInt);
    if (!link) {
        return json({ error: "Ссылка не найдено" }, { status: 404 });
    }
    return { link };
}

interface ActionData {
    errors?: {
        name?: string;
        title?: string;
        url?: string;
    };
}

export const action: ActionFunction = async ({
    request, params
}) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const active = formData.get("active");
    const title = formData.get("title");
    const url = formData.get("url");
    if (typeof name !== "string") {
        return json<ActionData>(
            { errors: { name: "Имя не задано" } },
            { status: 400 }
        );
    }
    if (typeof title !== "string") {
        return json<ActionData>(
            { errors: { title: "Название не задана" } },
            { status: 400 }
        );
    }
    if (typeof url !== "string") {
        return json<ActionData>(
            { errors: { url: "Ссылка не задана" } },
            { status: 400 }
        );
    }


    if(name.length < 4){
        return json<ActionData>(
            { errors: { name: "Имя слишком короткое" } },
            { status: 400 }
        );
    }
    const voteId = params.linkid;
    const voteInt = parseInt(voteId || "0");
    await updateLink(voteInt, name, title, url, active === "on" ? true : false);
    return redirect("/admin/settings/links/");
};

const Edit = () => {
    const data = useLoaderData();
    const vote:Links = data.link;
    const actionData = useActionData() as ActionData;

    return (
        <Form method="post">
            <div className="container mx-auto">
                <h1 className="text-gray-900 dark:text-gray-300 text-center">Редактирование ссылки</h1>
                <InputLabel actionData={actionData} defaultvalue={vote.name} value={'name'} name={"Название"} type="text"/>
                <InputLabel actionData={actionData} defaultvalue={vote.title} value={'title'} name={"Название на сайте"} type="text"/>
                <InputLabel actionData={actionData} defaultvalue={vote.url} value={'url'} name={"Ссылка"} type="text"/>
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

export default Edit;
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import React from "react";
import RichTextEditorClient from "~/components/admin/RichTextEditor.client";
import { getSettings, Settings, updateSettings } from "~/models/settings.server";

interface ActionData {
    errors?: {
        description?: string;
    };
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const settings = await getSettings(1);
    return {settings};
}

export const action: ActionFunction = async ({ request, params }) => {
    const formdata = await request.formData();
    const footer = formdata.get("description");
    if (typeof footer != "string") {
        return json<ActionData>(
            { errors: { description: "Футер не задан" } },
            { status: 400 }
        );
    }
    await updateSettings(1, footer);
    return redirect("/admin/settings/");
}

const SettingsPage = () => {
    const data = useLoaderData();
    const [mounted, setMounted] = React.useState(false);
    const actionData = useActionData() as ActionData;
    React.useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <Form method="post">
            <div className="container mx-auto">
                <h1 className="text-gray-900 dark:text-gray-300 text-center">Редактирование футера</h1>
                <div className="mt-6">
                    {mounted ?    <RichTextEditorClient value={data.settings.footer}/>: null}
                    {actionData?.errors?.description && (
                        <div className="pt-1 text-red-700" id="username-error">
                            {actionData?.errors.description}
                        </div>
                    )}
                </div>
                <div className="grid place-items-center mt-4">
                    <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Сохранить</button>
                </div>

            </div>
        </Form>
    )
}

export default SettingsPage;
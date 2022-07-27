import {Form} from "@remix-run/react";
import type {ActionFunction} from "@remix-run/node";
import { redirect} from "@remix-run/node";
import { deleteVote } from "~/models/vote.server";

export const action: ActionFunction = async ({params}) => {
    const promoId = params.voteid;
    const promoIdInt = parseInt(promoId || "0");
    await deleteVote(promoIdInt);
    return redirect("/admin/settings/vote/");
};

const DeleteItm = () => {
    return(
        <Form method="post">
            <div className="container mx-auto mt-12">
                <h1 className="text-gray-900 dark:text-gray-300 text-center">Вы точно хотите удалить?</h1>
                <div className="grid place-items-center mt-4">
                    <button type="submit" className="focus:outline-none text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Удалить</button>
                </div>
            </div>
        </Form>
    )
}

export default DeleteItm;
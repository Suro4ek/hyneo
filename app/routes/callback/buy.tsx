import { ActionFunction, json } from "@remix-run/node";
import { findPromo } from "~/models/promo.server";

export const action: ActionFunction = async ({
    request,
  }) => {
    const formData = await request.formData();
    const promo = formData.get("promo");
    const name = formData.get("name");
    const method_id = formData.get("method_id");
    const item_id = formData.get("item_id");

    if(typeof promo !== "string"){
        return json(
            { errors: { promo: "Промо не задано" } },
            { status: 400 }
        );
    }

    if(typeof name !== "string"){
        return json(
            { errors: { name: "Никнейм не задан" } },
            { status: 400 }
        );
    }
    if(typeof method_id !== "string"){
        return json(
            { errors: { method_id: "Метод не задан" } },
            { status: 400 }
        );
    }
    if(typeof item_id !== "string"){
        return json(
            { errors: { item_id: "Привелегия не задана" } },
            { status: 400 }
        );
    }
    
    const promoDB = await findPromo(promo);
    if(promoDB === null){
        return json(
            { errors: { promo: "Прококод не найден" } },
            { status: 400 }
        );
    }else{
        return json(
            { discount:  promoDB.discount },
            { status: 200 }
        )
    }
  };
import { ActionFunction, json } from "@remix-run/node";
import { findPromo } from "~/models/promo.server";

export const action: ActionFunction = async ({
    request,
  }) => {
    const formData = await request.formData();
    const promo = formData.get("promo");
    if(typeof promo !== "string"){
        return json(
            { errors: { promo: "Промо не задано" } },
            { status: 400 }
        );
    }
    if(promo.length === 0){
        return json(
            { discount:  0 },
            { status: 200 }
        )
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
import {ActionFunction, json, LoaderFunction} from "@remix-run/node";
import { findPromo } from "~/models/promo.server";

export const loader: LoaderFunction = async ({
    request,
  }) => {
    const url = new URL(request.url);
    const promo = url.searchParams.get("promo");
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
            { promocode:  promoDB.name, discount: promoDB.discount },
            { status: 200 }
        )
    }
  };
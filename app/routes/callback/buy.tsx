import type { ActionFunction} from "@remix-run/node";
import { json } from "@remix-run/node";

export const action: ActionFunction = async ({
    request,
  }) => {
    const formData = await request.formData();
    const promo = formData.get("promo");
    const name = formData.get("name");
    const method_id = formData.get("method_id");
    const item_id = formData.get("item_id");

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

  };
import { ActionFunction, redirect} from "@remix-run/node";
import { json } from "@remix-run/node";
import { getMethod } from "~/models/method.server";

export const action: ActionFunction = async ({
    request,
  }) => {
    const formData = await request.formData();
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
    const methodInt = parseInt(method_id || "0");
    if(isNaN(methodInt) || methodInt == 0){
        return json(
            { errors: { method_id: "Метод не задан" } },
            { status: 400 }
        );
    }
    const method = await getMethod(methodInt);
    if(!method){
        return json(
            { errors: { method_id: "Метод не найден" } },
            { status: 400 }
        );
    }
    let apiUrl = process.env.API_URL || "http://localhost:8080/";
    if(method.name === "Qiwi"){
        let res = await fetch(apiUrl+"bill/qiwi", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.API_TOKEN}`,
            },
            body: formData
          });
          let data = await res.json();
          if(data.error !== null){
            return json(
                { errors: { method_id: data.error } },
                { status: 400 }
            );
          }
          return redirect(data.payUrl)
    }else if(method.name === "FreeKassa"){
        let res = await fetch(apiUrl+"bill/free_kassa", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.API_TOKEN}`,
            },
            body: formData
          });
          let data = await res.json();
          if(data.error !== null){
            return json(
                { errors: { method_id: data.error } },
                { status: 400 }
            );
          }
          return redirect(data.payUrl)
    }else if(method.name === "GetPay"){
        let res = await fetch(apiUrl+"bill/getpay", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.API_TOKEN}`,
            },
            body: formData
          });
          let data = await res.json();
          if(data.error !== null){
            return json(
                { errors: { method_id: data.error } },
                { status: 400 }
            );
          }
          return redirect(data.payUrl)
    }else{
        return json(
            { errors: { method_id: "Метод не найден" } },
            { status: 400 }
        );
    }
  };
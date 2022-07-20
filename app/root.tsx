import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { RecoilRoot } from "recoil";
import styles from "./styles/app.css"


export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "HyNeo - Топовые сервер майнкрафт",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "icon", href: "/favicon.ico" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Fira+Sans+Extra+Condensed:400,700" },
  ]
}

export default function App() {
  return (
    <html lang="en" >
      <head>
        <Meta />
        <Links />
      </head>
      <body style={{ fontFamily: "'Fira Sans Extra Condensed', sans-serif", backgroundImage: "radial-gradient(circle, #0f0c29, #302b63, #24243e)", fontSize: "16px" }}>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

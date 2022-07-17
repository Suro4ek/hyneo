import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

// @ts-ignore
import intercept from 'intercept-stdout';

// Silence Recoil duplicate atom errors (stdout/server)
function muteStdout(log:any) {
  if (log.includes('Expectation Violation:')) {
    return '';
  }
  return log;
}

intercept(muteStdout, muteStdout);

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  let markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );


  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}

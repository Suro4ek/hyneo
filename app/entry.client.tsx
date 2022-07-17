import { RemixBrowser } from "@remix-run/react";
import { hydrate } from "react-dom";

const memoize = (fn:any) => {
    let cache = {};
    return (...args:any) => {
        let n = args[0];
        if (n in cache) {
            return cache[n];
        }
        else {
            let result = fn(n);
            cache[n] = result;
            return result;
        }
    }
}

// Silence Recoil duplicate atom errors (client/browser)
const mutedConsole = memoize((console:any) => ({
    ...console,
    error: (...args:any) => {
        return args[0]?.name === 'Expectation Violation'
            ? null
            : console.error(...args)
    }
}))

// Overload before hydrate
window.console = mutedConsole(window.console)

hydrate(<RemixBrowser />, document);

import * as React from "react";
import * as ReactDOM from "react-dom";

function notifyDomLoaded(): void {
    console.log(`Finished: ${performance.now().toFixed(1)}ms`);
}

// Wait until DOM fully ready.
document.addEventListener("DOMContentLoaded", (domEvent: any) => {
    notifyDomLoaded();
});

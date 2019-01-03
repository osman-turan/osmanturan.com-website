import { h, render, Component } from "preact";
import { ComponentService } from "./component-service";

function notifyDomLoaded(): void {
  ComponentService.initializeComponents();
  console.log(`Finished: ${performance.now().toFixed(1)}ms`);
}

// Wait until DOM fully ready.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", notifyDomLoaded);
} else {
  notifyDomLoaded();
}

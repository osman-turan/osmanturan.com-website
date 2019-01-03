import { h, render, Component } from "preact";
import { ComponentFactory } from "./component-factory";
import { Dictionary } from "./core/collections";
import { $ } from "./dom-query";

export class ComponentService {
  static initializeComponents() {
    $("[data-component]").each((i: number, container: HTMLElement) => {
      const typeName = container.dataset.component;
      if (typeName) {
        const type = ComponentFactory.getType(typeName);
        if (type) {
          const innerHtml = this.extractComponentTemplate(container.innerHTML);
          const propMap = this.extractComponentProps(container);

          const props = Object.assign({}, propMap, { innerHtml });
          const element = h(type, props);
          render(element, container);
        }
      }
    });
  }

  private static extractComponentTemplate(html: string): string {
    const match = /^\s*<!--\s*((.|[\s\S])*?)\s*-->\s*$/.exec(html);
    if (match) {
      return match[1];
    }

    return html;
  }

  private static extractComponentProps(
    container: HTMLElement
  ): Dictionary<string> {
    const result: Dictionary<string> = {};
    for (const key in container.dataset) {
      if (key === "component") {
        continue;
      }

      result[key] = container.dataset[key]!;
    }
    return result;
  }
}

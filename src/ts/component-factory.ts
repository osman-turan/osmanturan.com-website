import { Component } from "preact";
import { Dictionary } from "./core/collections";

const COMPONENT_TYPES: Dictionary<any> = {};

export class ComponentFactory {
  static getType(typeName: string): any {
    const type = COMPONENT_TYPES[typeName];
    if (type) {
      return type;
    }

    return undefined;
  }

  static create(typeName: string): Component<any, any> | undefined {
    const type = ComponentFactory.getType(typeName);
    if (type) {
      return new type();
    }

    return undefined;
  }
}

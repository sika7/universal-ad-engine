import { RequestType } from "../api";
import { IUniversalAdTemplate } from "./main";

export interface Plugin {
  api: IUniversalAdApi;
  template: () => IUniversalAdTemplate;
}

export interface IUniversalAdApi {
  url: string;
  type: RequestType;
  validation: Record<string, string>;
}

class TemplateManager {
  private data: Record<string, Plugin> = {};

  constructor() {}

  freezed() {
    Object.freeze(this.data);
    Object.freeze(this);
  }

  add(name: string, data: Plugin) {
    try {
      this.data[name] = data;
    } catch (error) {
      throw new Error("Adding templates is currently freezed.");
    }
  }

  find(name: string) {
    return this.data[name];
  }
}

export const templateManager = new TemplateManager();

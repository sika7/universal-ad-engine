import { RequestType } from "./api";
import { IUniversalAdTemplate } from "./template/universal-ad-template";

export interface IPluginTemplate {
  name: string;
  api: IUniversalAdApi;
  template: () => IUniversalAdTemplate;
}

export interface IUniversalAdApi {
  url: string;
  type: RequestType;
  validation: Record<string, string>;
}

class TemplateManager {
  private data: IPluginTemplate[] = [];

  constructor() {}

  freezed() {
    Object.freeze(this.data);
    Object.freeze(this);
  }

  add(data: IPluginTemplate) {
    try {
      this.data.push(data);
    } catch (error) {
      throw new Error("Adding templates is currently freezed.");
    }
  }

  find(name: string) {
    return this.data.find((data) => data.name === name);
  }
}

export const templateManager = new TemplateManager();

import { RequestType } from "./api";
import { IUniversalAdTemplate } from "./universal-ad-template";

export interface IPluginTemplate {
  name: string;
  api: IUniversalAdApi;
  template: () => IUniversalAdTemplate;
}

export interface IUniversalAdApi {
  url: string;
  type: RequestType;
}

class TemplateManager {
  private freeze = false;
  private data: IPluginTemplate[] = [];

  constructor() {}

  freezed() {
    this.freeze = true;
  }

  add(data: IPluginTemplate) {
    if (this.freeze) return;
    this.data.push(data);
  }

  find(name: string) {
    return this.data.find((data) => data.name === name);
  }
}

export const templateManager = new TemplateManager();

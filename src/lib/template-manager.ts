import { IUniversalAdTemplate } from "./universal-ad-template";

export interface IPluginTemplate {
  name: string;
  template: () => IUniversalAdTemplate;
}

export type TPluginTemplate = () => IPluginTemplate;

interface ITemplateData {
  [name: string]: () => IUniversalAdTemplate;
}

class TemplateManager {
  private data: ITemplateData = {};

  constructor() {}

  add(plugin: TPluginTemplate) {
    const data = plugin();
    this.data[data.name] = data.template;
  }

  createInstance(name: string) {
    return this.data[name];
  }
}

export const templateManager = new TemplateManager();

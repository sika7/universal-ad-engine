import { IUniversalAdTemplate } from "./universal-ad-template";

interface ITemplateData {
  [name: string]: () => IUniversalAdTemplate;
}

export interface IPluginTemplate {
  name: string;
  template: () => IUniversalAdTemplate;
}

export type importPluginTemplate = () => IPluginTemplate;

class TemplateManager {
  private templateData: ITemplateData = {};

  constructor() {}

  addConfig(templates: importPluginTemplate[]) {
    templates.map((item) => {
      const data = item();
      this.templateData[data.name] = data.template;
    });
  }

  createInstance(name: string) {
    return this.templateData[name];
  }
}

export const templateManager = new TemplateManager();

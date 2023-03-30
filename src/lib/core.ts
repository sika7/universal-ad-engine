import { IPluginTemplate, templateManager } from "./template-manager";
import { WebComponentWrapper } from "./web-components-wrapper";

function attach(setting: IUniversalAdSetting | undefined) {
  if (!setting) return;
  const data = templateManager.find(setting.template);
  if (!data) throw new Error("No template registration found.");
  return new WebComponentWrapper(setting.id, data.template(), data.api);
}

export interface IUniversalAdSetting {
  id: string;
  template: string;
  parameter?: Record<string, any>;
}

class Core {
  constructor() {
    customElements.define("universal-ad-unit", WebComponentWrapper);
  }

  use(template: IPluginTemplate) {
    templateManager.add(template);
  }

  freezed() {
    templateManager.freezed();
  }

  show(data: IUniversalAdSetting) {
    try {
      const elm = attach(data);
      if (!elm) return;
      elm.render();
      if (data?.parameter) {
        elm.pull();
      }
      new Error("no setting");
    } catch (error) {
      throw new Error("An error has occurred.");
    }
  }
}

export const UniversalAd = new Core();
